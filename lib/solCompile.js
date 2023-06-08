"use strict";
/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundle = void 0;
const path_1 = __importDefault(require("./path"));
const solCodeGen_1 = __importDefault(require("./solCodeGen"));
const solFlatten_1 = require("./solFlatten");
;
async function importFile(storage, fileName, sources) {
    let content = await storage.readFile(fileName);
    let dependencies = [];
    sources[fileName] = { content: content };
    let importRegex = /^\s*import\s+(?:"([^"]+)"|'([^']+)')./gm;
    let importMatch;
    let dir = path_1.default.dirname(fileName);
    while ((importMatch = importRegex.exec(content))) {
        let importPath = importMatch[1] || importMatch[2];
        if (importPath.startsWith(".")) {
            importPath = path_1.default.resolve(dir, importPath);
            if (!dependencies.includes(importPath))
                dependencies.push(importPath);
            await importFile(storage, importPath, sources);
        }
        ;
    }
    ;
    return dependencies;
}
;
async function recursiveAdd(storage, root, srcPath, sources, exclude) {
    let currPath = path_1.default.join(root, srcPath);
    if (await storage.isFile(currPath)) {
        let content = await storage.readFile(currPath);
        sources[currPath.replace(new RegExp(`^${root}`), 'contracts/')] = { content: content };
        return sources;
    }
    else if (await storage.isFileExists(path_1.default.join(currPath, '.ignoreAll')))
        return;
    let files = await storage.readDir(currPath);
    for (let i = 0; i < files.length; i++) {
        let _path = path_1.default.join(root, srcPath, files[i]).replace(/\\/g, "/").replace(/^([A-Za-z]):/, "/$1");
        if (files[i].endsWith(".sol") && await storage.isFile(_path)) {
            if (!sources[files[i]]) {
                if ((!exclude || !exclude.includes(_path))) {
                    let content = await storage.readFile(path_1.default.resolve(currPath, files[i]));
                    let importRegex = /^\s*import\s+(?:"([^"]+)"|'([^']+)')./gm;
                    let importMatch;
                    let dependencies = [];
                    while ((importMatch = importRegex.exec(content))) {
                        const importPath = importMatch[1] || importMatch[2];
                        if (!dependencies.includes(importPath))
                            dependencies.push(importPath);
                        if (!sources[importPath] && !importPath.startsWith(".")) {
                            await importFile(storage, importPath, sources);
                        }
                        ;
                    }
                    sources[_path.replace(new RegExp(`^${root}`), 'contracts/')] = { content: content };
                }
            }
        }
    }
    ;
    for (let i = 0; i < files.length; i++) {
        let _path = path_1.default.join(root, srcPath, files[i]).replace(/\\/g, "/").replace(/^([A-Za-z]):/, "/$1");
        if (await storage.isDirectory(_path)) {
            await recursiveAdd(storage, root, path_1.default.join(srcPath, files[i]), sources, exclude);
        }
    }
    return sources;
}
async function buildInput(storage, root, source, optimizerRuns, viaIR, exclude) {
    let input = {
        language: "Solidity",
        sources: {},
        settings: {
            optimizer: optimizerRuns ? {
                enabled: true,
                runs: optimizerRuns || 999999
            } : undefined,
            viaIR: viaIR,
            outputSelection: {
                "*": {
                    "*": ["abi", "evm", "evm.bytecode", "evm.bytecode.object"]
                }
            }
        },
    };
    if (source && Array.isArray(source) && source.length) {
        await Promise.all(source.map((e) => recursiveAdd(storage, root, e, input.sources, exclude)));
    }
    else {
        await recursiveAdd(storage, root, "", input.sources, exclude);
    }
    return input;
}
function prettyPrint(s) {
    let j = 0;
    return s.split('').map(e => {
        if (e == '{')
            j++;
        else if (e == '}')
            j--;
        if (j == 1) {
            if (e == '{')
                return '{\n';
            else if (e == '[')
                return '[\n';
            else if (e == ',')
                return ',\n';
            else if (e == ']')
                return '\n]';
            else
                return e;
        }
        else if (j == 0) {
            if (e == '}')
                return '\n}';
            else
                return e;
        }
        else {
            return e;
        }
    }).join('');
}
async function processOutput(storage, sourceDir, output, outputDir, outputOptions, exclude, include) {
    let index = '';
    if (output.contracts) {
        for (let i in output.contracts) {
            if (i.startsWith('@'))
                continue;
            if (include && !include.includes(sourceDir + i.replace(/^contracts\//, '')))
                continue;
            if (exclude && exclude.includes(sourceDir + i.replace(/^contracts\//, '')))
                continue;
            let p = path_1.default.dirname(i.replace(/^contracts\//, ''));
            p = p == '.' ? '' : (p + '/');
            outputOptions = outputOptions || {};
            for (let j in output.contracts[i]) {
                let abi = output.contracts[i][j].abi;
                let bytecode = output.contracts[i][j].evm?.bytecode?.object;
                let outputBytecode = (outputOptions.bytecode === undefined) ? (!!(bytecode && abi && abi.length)) : (outputOptions.bytecode && bytecode);
                let outputAbi = (outputOptions.abi === undefined) ? (!!(bytecode && abi && abi.length)) : (outputOptions.abi && abi && abi.length);
                if (outputBytecode || outputAbi) {
                    let file = {};
                    if (outputAbi) {
                        file["abi"] = abi;
                    }
                    if (outputBytecode) {
                        file["bytecode"] = bytecode;
                    }
                    await storage.writeFile(outputDir + '/' + p + j + '.json.ts', "export default " + prettyPrint(JSON.stringify(file)));
                    let relPath = './';
                    let hasBatchCall = outputOptions.batchCall;
                    let hasTxData = outputOptions.txData;
                    let options = {
                        outputAbi,
                        outputBytecode,
                        hasBatchCall,
                        hasTxData
                    };
                    let code = (0, solCodeGen_1.default)(j, relPath, abi, options);
                    await storage.writeFile(outputDir + '/' + p + j + '.ts', code);
                    index += `export { ${j} } from \'./${p + j}\';\n`;
                }
            }
        }
    }
    return index;
}
;
async function bundle(solc, storage, config, RootPath) {
    let { version, optimizerRuns, viaIR, outputOptions, overrides, libMap, flattenFiles } = config;
    let sourceDir = config.sourceDir || "contracts/";
    let outputDir = config.outputDir || "src/contracts/";
    optimizerRuns = optimizerRuns || 200;
    viaIR = viaIR || false;
    outputOptions = outputOptions || {};
    if (outputDir == undefined)
        outputDir = '';
    sourceDir = path_1.default.join(RootPath, sourceDir);
    if (!sourceDir.endsWith('/') && !sourceDir.endsWith('.sol'))
        sourceDir = sourceDir + '/';
    outputDir = path_1.default.join(RootPath, outputDir);
    try {
        let root = sourceDir;
        let _sourceDir = sourceDir;
        let customSources = overrides && overrides.map(e => e.sources.map(f => (e.root || root) + f)).reduce((a, b) => a.concat(b), []);
        customSources = customSources || [];
        let sources = {};
        let input = await buildInput(storage, sourceDir, [], optimizerRuns, viaIR, customSources);
        for (let n in input.sources) {
            if (!sources[n])
                sources[n] = input.sources[n];
        }
        ;
        let output = JSON.parse(await solc.compile(JSON.stringify(input), version));
        let index = await processOutput(storage, sourceDir, output, outputDir, outputOptions, customSources);
        if (output.errors) {
            output.errors.forEach((e) => console.log(e.formattedMessage));
        }
        if (overrides) {
            for (let s in overrides) {
                if (overrides[s].version && overrides[s].version != version) {
                }
                _sourceDir = overrides[s].root || root;
                input = await buildInput(storage, _sourceDir, overrides[s].sources, overrides[s].optimizerRuns || optimizerRuns, viaIR, []);
                for (let n in input.sources) {
                    if (!sources[n])
                        sources[n] = input.sources[n];
                }
                ;
                output = JSON.parse(await solc.compile(JSON.stringify(input), overrides[s].version || version));
                index = index + (await processOutput(storage, sourceDir, output, outputDir, overrides[s].outputOptions || outputOptions, [], overrides[s].sources.map(f => _sourceDir + f)));
                if (output.errors) {
                    output.errors.forEach((e) => console.log(e.formattedMessage));
                }
            }
        }
        await storage.writeFile(outputDir + '/index.ts', index);
        if (flattenFiles) {
            const flattenedDestDir = path_1.default.join(RootPath, 'flattened/');
            for (let file of flattenFiles) {
                const sourceFile = path_1.default.join(RootPath, file);
                const destFile = flattenedDestDir + path_1.default.basename(sourceFile);
                let code = await (0, solFlatten_1.flatten)(sources, file);
                storage.writeFile(destFile, code);
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}
exports.bundle = bundle;
;
