/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
// import * as fs from 'fs';
import Path from './path';
import * as Types from './types';
import codeGen, {IUserDefinedOptions} from './solCodeGen';
import {flatten} from './solFlatten';

/*
https://solc-bin.ethereum.org/bin/list.json
https://ethereum.github.io/solc-bin/bin/list.json
*/

// let _libMap: {[soource:string]:string|string[]|undefined};
// let _sourceDir: string;

interface Input {
    language:string, 
    sources: Types.ISource, 
    settings:{optimizer?:{enabled:boolean, runs:number}, 
    outputSelection:{[contract:string]:{[contract:string]:string[]}}}
};

async function importFile(storage: Types.IStorage, fileName: string, sources: Types.ISource): Promise<string[]>{
    let content = await storage.readFile("node_modules/" + fileName);
    let dependencies: string[] = [];
    sources[fileName] = {content: content};
    let importRegex = /^\s*import\s+(?:"([^"]+)"|'([^']+)')./gm;
    let importMatch;
    let dir = Path.dirname(fileName);
    while ((importMatch = importRegex.exec(content))) {
        let importPath = importMatch[1] || importMatch[2];
        if (importPath.startsWith(".")) {
            importPath = Path.resolve(dir, importPath);
            if (!dependencies.includes(importPath)) 
                dependencies.push(importPath);
            if (!sources[importPath]) {
                await importFile(storage, importPath, sources);
            }
        } else if (importPath.startsWith("@")) {
            if (!sources[importPath]) {
                await importFile(storage, importPath, sources);
            }
        };
    };
    return dependencies;
};
async function recursiveAdd(storage: Types.IStorage, root: string, srcPath: string, sources: Types.ISource, exclude: string[]): Promise<Types.ISource | undefined> {
    let currPath = Path.resolve(root, srcPath);
    // signle file
    if (await storage.isFile(currPath)) {
        let content = await storage.readFile(currPath);
        sources[currPath.replace(new RegExp(`^${root}`),'contracts/')] = { content: content };
        let importRegex = /^\s*import\s+(?:"([^"]+)"|'([^']+)')./gm;
        let importMatch;
        let dependencies: string[] = [];
        while ((importMatch = importRegex.exec(content))) {
            const importPath = importMatch[1] || importMatch[2];
            if (!dependencies.includes(importPath))
                dependencies.push(importPath);
            if (!sources[importPath]) {
                if (importPath.startsWith(".")) {
                    let path = Path.resolve(root, Path.dirname(srcPath)+'/'+importPath).replace(new RegExp(`^${root}`),'contracts/');
                    if (!sources[path])
                        await recursiveAdd(storage, root, Path.dirname(srcPath)+'/'+importPath, sources, exclude);
                } else {
                    await importFile(storage, importPath, sources);
                }
            }
        }
        return sources;
    }
    else if (await storage.isFileExists(Path.join(currPath, '.ignoreAll')))
        return;

    let files = await storage.readDir(currPath);
    for (let i = 0; i < files.length; i++) {
        let _path = Path.join(root, srcPath, files[i]).replace(/\\/g, "/").replace(/^([A-Za-z]):/, "/$1");
        if (files[i].endsWith(".sol") && await storage.isFile(_path)) {
            if (!sources[files[i]]) {
                if ((!exclude || !exclude.includes(_path))){
                    let content = await storage.readFile(Path.resolve(currPath, files[i]));
                    sources[_path.replace(new RegExp(`^${root}`),'contracts/')] = { content: content };
                    let importRegex = /^\s*import\s+(?:"([^"]+)"|'([^']+)')./gm;
                    let importMatch;
                    let dependencies: string[] = [];
                    while ((importMatch = importRegex.exec(content))) {
                        const importPath = importMatch[1] || importMatch[2];
                        if (!dependencies.includes(importPath))
                            dependencies.push(importPath);
                        if (!sources[importPath] && !importPath.startsWith(".")) {
                            await importFile(storage, importPath, sources);
                        };
                    }
                }
            }
        }
    };
    for (let i = 0; i < files.length; i++) {
        let _path = Path.join(root, srcPath, files[i]).replace(/\\/g, "/").replace(/^([A-Za-z]):/, "/$1");
        if (await storage.isDirectory(_path)) {
            await recursiveAdd(storage, root, Path.join(srcPath, files[i]), sources, exclude);
        }
    }
    return sources;
}
async function buildInput(storage: Types.IStorage, root: string, source: string[], optimizerRuns: number, viaIR:boolean, exclude: string[]): Promise<Input> {
    let input = {
        language: "Solidity",
        sources: {},
        settings:
        {
            // remappings: [ ":g=./contracts" ],
            optimizer: optimizerRuns ? {
                enabled: true,
                runs: optimizerRuns || 999999
            } : undefined,
            viaIR: viaIR,
            // evmVersion: "istanbul",//"constantinople",//"byzantium",
            outputSelection: {
                "*": {
                    "*": ["abi", "evm", "evm.bytecode", "evm.bytecode.object"]
                }
            }
        },
    };
    if (source && Array.isArray(source) && source.length){
        await Promise.all(source.map((e)=> recursiveAdd(storage, root, e, input.sources, exclude)));
    } else {
        await recursiveAdd(storage, root, "", input.sources, exclude);
    }
    return input;
}

function prettyPrint(s: string): string {
    let j = 0;
    return s.split('').map(e => {
        if (e == '{') j++; else if (e == '}') j--;
        if (j == 1) {
            if (e == '{') return '{\n';
            else if (e == '[') return '[\n';
            else if (e == ',') return ',\n';
            else if (e == ']') return '\n]';
            else return e;
        } else if (j == 0) {
            if (e == '}') return '\n}';
            else return e;
        } else {
            return e;
        }
    }).join('');
}

interface Type { name: string; type: string; components?: Type[]; internalType?: string; }
interface Item { name: string; type: string; stateMutability: string; inputs?: Type[]; outputs?: Type[];}
interface Output {[sourceFile:string]:{[contract:string]:{evm:{bytecode:{object:string}},abi:Item[]}}}
interface LinkReferences {[file:string]:{[contract:string]:{length:number; start:number;}[]}}

// the compiled results of normal contracts have both abi and bytecode;
// the compiled results of abstract contracts and interfaces have abi only and without any bytecode;
// the compiled results of library contracts have bytecode and no abi
interface OutputOptions {
    abi?: boolean; // default = compiled result has both abi and bytecode
    bytecode?: boolean; // default = compiled result has both abi and bytecode
    batchCall?: boolean; //default false
    txData?: boolean; //default false
}
async function processOutput(storage: Types.IStorage, sourceDir: string, output:Output, outputDir: string, outputOptions: OutputOptions, exclude?: string[], include?: string[]): Promise<string[]> {
    let exports:string[] = [];
    if (output.contracts) {
        for (let i in output.contracts) {
            if (i.startsWith('@'))
                continue;
            if (include && !include.includes(sourceDir+i.replace(/^contracts\//,'')))
                continue;
            if (exclude && exclude.includes(sourceDir+i.replace(/^contracts\//,'')))
                continue;

            let p = Path.dirname(i.replace(/^contracts\//,''));
            p = p=='.' ? '' : (p + '/');

            outputOptions = outputOptions || {};

            for (let j in output.contracts[i]) {
                let abi = (<any>output.contracts[i])[j].abi;
                let bytecode = (<any>output.contracts[i])[j].evm?.bytecode?.object;
                let linkReferences = (<any>output.contracts[i])[j].evm?.bytecode?.linkReferences;

                let _export = await callCodeGen(storage, outputDir, p, j, abi, bytecode, linkReferences, outputOptions);
                if (_export) {
                    exports.push(_export);
                }
            }
        }
    }
    return exports;
}

async function recursiveAddArtifacts(storage: Types.IStorage, root: string, srcPath: string, outputDir: string, outputOptions: OutputOptions, exports:string[]): Promise<string[]> {
    let currPath = Path.join(root, srcPath);
    // signle file
    if (await storage.isFile(currPath)) {
        let content = await storage.readFile(currPath);
        let file = JSON.parse(content);
        if (file.bytecode=="0x") 
            file.bytecode=undefined;
        // TODO: fix currPath
        let _export = await callCodeGen(storage, outputDir, '', currPath.replace('.json',''), file.abi, file.bytecode, file.linkReferences, outputOptions)
        if (_export) {
            exports.push(_export);
        }
        return exports;
    }
    else if (await storage.isFileExists(Path.join(currPath, '.ignoreAll')))
        return exports;

    let files = await storage.readDir(currPath);
    for (let i = 0; i < files.length; i++) {
        let _path = Path.join(root, srcPath, files[i]).replace(/\\/g, "/").replace(/^([A-Za-z]):/, "/$1");
        if (files[i].endsWith(".json") && await storage.isFile(_path)) {
            let content = await storage.readFile(Path.resolve(currPath, files[i]));
            let file = JSON.parse(content);
            if (file.bytecode=="0x") 
                file.bytecode=undefined;
            let _export = await callCodeGen(storage, outputDir, '', files[i].replace('.json',''), file.abi, file.bytecode, file.linkReferences, outputOptions)
            if (_export) {
                exports.push(_export);
            }
        }
    };
    for (let i = 0; i < files.length; i++) {
        let _path = Path.join(root, srcPath, files[i]).replace(/\\/g, "/").replace(/^([A-Za-z]):/, "/$1");
        if (await storage.isDirectory(_path)) {
            await recursiveAddArtifacts(storage, root, Path.join(srcPath, files[i]), outputDir, outputOptions, exports);
        }
    }
    return exports;
}

async function callCodeGen(storage: Types.IStorage, outputDir: string, path: string, name:string, abi: Item[], bytecode: string, linkReferences: LinkReferences, outputOptions: OutputOptions) {
    let outputBytecode = (outputOptions.bytecode === undefined) ? (!!(bytecode && abi && abi.length)) : (outputOptions.bytecode && !!bytecode);
    let outputAbi = (outputOptions.abi === undefined) ? (!!(bytecode && abi && abi.length)) : (outputOptions.abi && abi && !!abi.length);

    if (outputBytecode || outputAbi) {
        let file:any = {};
        if (outputAbi) {
            file["abi"] = abi;
        }
        if (outputBytecode) {
            file["bytecode"] = bytecode;
            if (Object.keys(linkReferences).length)
                file["linkReferences"] = linkReferences;
        }
        await storage.writeFile(outputDir + '/' + path + name +  '.json.ts', "export default " + prettyPrint(JSON.stringify(file)));

        let relPath = './';         
        let hasBatchCall = outputOptions.batchCall;       
        let hasTxData = outputOptions.txData;       
        let options: IUserDefinedOptions = {
            outputAbi,
            outputBytecode,
            hasBatchCall,
            hasTxData
        }
        let code = codeGen(name, relPath, abi, linkReferences, options);
        await storage.writeFile(outputDir + '/' + path + name +  '.ts', code);

        return `export { ${name} } from \'./${path + name}\';\n`;
    }    
}
interface CompileOptions { version?: string; optimizerRuns?: number; viaIR?:boolean, outputOptions?: OutputOptions }
interface Override extends CompileOptions { root?:string, sources:string[]; };
interface Config extends CompileOptions {
    sourceDir?: string;
    artifactsDir?: string;
    outputDir?: string;
    output?: string;
    overrides?: Override[];
    libMap?: {[soource:string]:string};
    flattenFiles?: string[];
}

export async function bundle(solc: Types.ISolc, storage: Types.IStorage, config:Config, RootPath: string) {
    let {version, optimizerRuns, viaIR, outputOptions, overrides, libMap, flattenFiles} = config;

    let sourceDir = config.sourceDir || "contracts/";
    let outputDir = config.outputDir || "src/contracts/";
    optimizerRuns = optimizerRuns || 200;
    viaIR = viaIR || false;
    outputOptions = outputOptions || {};
    if (outputDir == undefined)
        outputDir = '';
    
    sourceDir = Path.join(RootPath, sourceDir);
    if (!sourceDir.endsWith('/') && !sourceDir.endsWith('.sol'))
        sourceDir = sourceDir + '/';
    outputDir = Path.join(RootPath, outputDir);
    // fs.mkdirSync(outputDir, { recursive: true });

    // _libMap = libMap || {};

    try {
        // let solc = await getSolc(version);
        let root = sourceDir;
        let _sourceDir = sourceDir;
        let customSources = overrides && overrides.map(e=>e.sources.map(f=>(e.root||root)+f)).reduce((a,b)=>a.concat(b),[]);
        customSources = customSources || [];
        let sources: Types.ISource = {};
        let input = await buildInput(storage, sourceDir, [], optimizerRuns, viaIR, customSources);
        for (let n in input.sources){
            if (!sources[n])
                sources[n] = input.sources[n];
        };
        let output = JSON.parse(await solc.compile(JSON.stringify(input), version));
        let exports = await processOutput(storage, sourceDir, output, outputDir, outputOptions, customSources);
        if (output.errors) {
            output.errors/*.filter(e=>e.severity!='warning')*/.forEach((e: any) => console.log(e.formattedMessage));
        }

        if (overrides) {
            for (let s in overrides) {
                if (overrides[s].version && overrides[s].version!=version) {
                    // solc = await getSolc(overrides[s].version);
                }
                _sourceDir = overrides[s].root || root;
                input = await buildInput(storage, _sourceDir, overrides[s].sources, overrides[s].optimizerRuns||optimizerRuns, viaIR, [])
                for (let n in input.sources){
                    if (!sources[n])
                        sources[n] = input.sources[n];
                };
                output = JSON.parse(await solc.compile(JSON.stringify(input), overrides[s].version || version));
                exports = exports.concat(await processOutput(storage, sourceDir, output, outputDir, overrides[s].outputOptions || outputOptions, [], overrides[s].sources.map(f=>_sourceDir+f)));
                if (output.errors) {
                    output.errors/*.filter(e=>e.severity!='warning')*/.forEach((e:any)=>console.log(e.formattedMessage));
                }
            }
        }
        if (config.artifactsDir) {
            exports = exports.concat(await recursiveAddArtifacts(storage, config.artifactsDir, '', outputDir, outputOptions, []));
        }
        await storage.writeFile(outputDir + '/index.ts', exports.join(''));

        if (flattenFiles) {
            const flattenedDestDir = Path.join(RootPath, 'flattened/');
            for (let file of flattenFiles) {
                const sourceFile = Path.join(RootPath, file);
                const destFile = flattenedDestDir + Path.basename(sourceFile);
                let code = await flatten(sources, file);
                storage.writeFile(destFile, code);
            }
        }
    } catch (e) { console.log(e); }
};