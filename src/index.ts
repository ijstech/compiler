/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import Lib from './lib';
import * as Parser from './parser';
import TS from "./lib/typescript";
import Path from './path';
export {Parser, Path};
import * as Sol from './solCompile';
import * as Types from './types';
export {Types};

let isNode = false;    
if (typeof process === 'object') {
  if (typeof process.versions === 'object') {
    if (typeof process.versions.node !== 'undefined') {
      isNode = true;
    }
  }
};
const indexHtmlTemplate = `
<!DOCTYPE html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
{{meta}}
  <script src="{{rootDir}}libs/@ijstech/components/index.js"></script>
</head>
<html>

<body>
  <script>
    async function init() {
      application.LibHost = "";
      let config = await application.getContent('scconfig.json');
      let module = await application.newModule("{{main}}", JSON.parse(config));
      document.body.append(module);
    };
    init();
  </script>
</body>

</html>`;

export enum EPackageType{
    contract = 'contract',
    dapp = 'dapp',  
    plugin = 'plugin',
    worker = 'worker'
}
// export async function bundle(storage: IStorage, RootPath: string, packageType?: EPackageType){
//     let scconfig = await storage.getSCConfig();
//     if (packageType || scconfig?.type){
//         switch(packageType || scconfig?.type){
//             case 'dapp':
//                 await bundleDapp(storage, RootPath);
//                 break;
//             case 'contract':
//                 await bundleContract(storage, RootPath);
//                 break;
//             default:
//                 await bundleDapp(storage, RootPath);
//                 break;
//         }
//     }
//     else
//         await bundleContractDist(storage, RootPath);
// };
export async function bundleContract(solc: Types.ISolc, storage: Types.IStorage, RootPath?: string){
    RootPath = RootPath || storage.rootPath;
    let scconfig = await storage.getSCConfig();
    let options = scconfig?.solidity;
    if (!options){
        let solconfig = await storage.readFile('solconfig.json');
        if (solconfig)
            options = JSON.parse(solconfig);
    };
    await Sol.bundle(solc, storage, options || {
        "version": "0.8.19",
        "optimizerRuns": 999999,
        "sourceDir": "contracts",
        "outputDir": "src/contracts",
        "outputObjects": "bytecode"
    }, RootPath);
    await bundleContractDist(storage, RootPath);
    await bundleContractLib(storage, RootPath);
};
export async function bundleContractLib(storage: Types.IStorage, RootPath?: string){
    RootPath = RootPath || storage.rootPath;
    let packageConfig = await storage.getPackageConfig();
    if (packageConfig){
        let packageManager = new PackageManager({
            packageImporter: async (packName: string) => {
                let pack = await storage.getPackageTypes(packName);
                return pack;
            },
            tsconfig: {
                allowJs: false,
                alwaysStrict: true,
                declaration: true,   
                esModuleInterop: true,
                removeComments: true,
                moduleResolution: TS.ModuleResolutionKind.Classic,
                resolveJsonModule: false,
                skipLibCheck: true,
                noEmitOnError: true,
                module: TS.ModuleKind.CommonJS,
                target: TS.ScriptTarget.ES2017
            }
        });
        packageManager.addPackage('@ijstech/eth-contract', await storage.getPackageTypes('@ijstech/eth-contract'));            
        let pack:Types.IPackage = { files: await storage.getFiles(Path.join(RootPath, 'src'))};
        packageManager.addPackage(packageConfig.name, pack);
        await packageManager.buildAll();

        pack = packageManager.packages(packageConfig.name);

        if (pack.errors && pack.errors.length > 0) {
            console.error('Package compilation error: ' + packageConfig.name);
            console.error(JSON.stringify(pack.errors, null, 4));
            return;
        };

        let libDir = Path.join(RootPath, 'lib');
        let typesDir = Path.join(RootPath, 'types');
        for (let fileName in pack.script){
            let content = pack.script[fileName];
            await storage.writeFile(Path.join(libDir, fileName), content);
        }
        for (let fileName in pack.dts){
            let content = pack.dts[fileName];
            await storage.writeFile(Path.join(typesDir, fileName), content);
        };
    };
};
export async function bundleContractDist(storage: Types.IStorage, RootPath?: string){
    RootPath = RootPath || storage.rootPath;
    let packageConfig = await storage.getPackageConfig();
    if (packageConfig){
        let packageManager = new PackageManager({
            packageImporter: async (packName: string) => {
                let pack = await storage.getPackageTypes(packName);
                return pack;
            }
        });       
        let pack:Types.IPackage = { files: await storage.getFiles(Path.join(RootPath, 'src'))};
        for (let n in pack.files){
            if (n == 'index.ts' || n == 'index.tsx')
                pack.files[n] = `///<amd-module name='${packageConfig.name}'/> \n` + pack.files[n];
            else
                pack.files[n] = `///<amd-module name='${packageConfig.name}/${n}'/> \n` + pack.files[n];
        };
        packageManager.addPackage(packageConfig.name, pack);
        await packageManager.buildAll();

        pack = packageManager.packages(packageConfig.name);
        if (pack.errors && pack.errors.length > 0) {
            console.error('Package compilation error: ' + packageConfig.name);
            console.error(JSON.stringify(pack.errors, null, 4));
            return;
        };

        let distDir = Path.join(RootPath, 'dist');
        let typesDir = Path.join(RootPath, 'pluginTypes');
        let script = '';
        let dts = '';
        if (pack.script && pack.script['index.js'])
            script = pack.script['index.js'];
        if (pack.dts && pack.dts['index.d.ts'])
            dts = pack.dts['index.d.ts'];    
        await storage.writeFile(Path.join(distDir, 'index.js'), script);
        await storage.writeFile(Path.join(typesDir, 'index.d.ts'), dts);
    };
};
export async function bundlePlugin(storage: Types.IStorage, RootPath?: string){
    RootPath = RootPath || storage.rootPath;
    let scRootDir = RootPath;
    let packageConfig = await storage.getPackageConfig();
    if (packageConfig){
        let packageManager = new PackageManager({
            packageImporter: async (packName: string) => {
                let pack = await storage.getPackageTypes(packName);
                return pack;
            }
        });
        // packageManager.addPackage('@ijstech/components', await getLocalPackageTypes('@ijstech/components'));            
        let pack:Types.IPackage = { files: await storage.getFiles(Path.join(scRootDir, 'src'))};
        for (let n in pack.files){
            if (n == 'index.ts' || n == 'index.tsx')
                pack.files[n] = `///<amd-module name='${packageConfig.name}'/> \n` + pack.files[n];
            else
                pack.files[n] = `///<amd-module name='${packageConfig.name}/${n}'/> \n` + pack.files[n];
        };
            // if (pack.files['index.ts']){
            //     pack.files['index.ts'] = `///<amd-module name='${packageConfig.name}'/> \n` + pack.files['index.ts']
            // }
            // else if (pack.files['index.tsx'])
            //     pack.files['index.tsx'] = `///<amd-module name='${packageConfig.name}'/> \n` + pack.files['index.tsx']
        packageManager.addPackage(packageConfig.name, pack);
        await packageManager.buildAll();

        pack = packageManager.packages(packageConfig.name);
        if (pack.errors && pack.errors.length > 0) {
            console.error('Package compilation error: ' + packageConfig.name);
            console.error(JSON.stringify(pack.errors, null, 4));
            return;
        };

        let distDir = Path.join(scRootDir, 'dist');
        let typesDir = Path.join(scRootDir, 'pluginTypes');
        let script = '';
        let dts = '';
        if (pack.script && pack.script['index.js'])
            script = pack.script['index.js'];
        if (pack.script && pack.script['index.d.ts'])
            dts = pack.script['index.d.ts'];
        await storage.copyAssets(Path.join(scRootDir, 'src'), distDir);            
        await storage.writeFile(Path.join(distDir, 'index.js'), script);
        await storage.writeFile(Path.join(typesDir, 'index.d.ts'), dts);
    };
};
export async function bundleDapp(storage: Types.IStorage, RootPath?: string){
    RootPath = RootPath || storage.rootPath;
    let scRootDir = RootPath;
    let bundleLibs: {[fileName: string]: string} = {};
    let scconfig = await storage.getSCConfig();    
    if (scconfig) {        
        let moduleSourceDir = scRootDir;
        if (scconfig.moduleDir)
            moduleSourceDir = Path.join(scRootDir, scconfig.moduleDir);

        let packages: {[name: string]: string} = {};
        for (let name in scconfig.modules) {
            packages[name] = Path.join(moduleSourceDir, scconfig.modules[name].path);
        };
        let packageManager = new PackageManager({
            packageImporter: async (packName: string) => {
                let pack = await storage.getPackageTypes(packName);
                return pack;
            }
        });
        packageManager.addPackage('@ijstech/components', await storage.getPackageTypes('@ijstech/components'));
        if (scconfig.networks){
            packageManager.addPackage('bignumber.js', await storage.getPackageTypes('bignumber.js'));
            packageManager.addPackage('@ijstech/eth-wallet', await storage.getPackageTypes('@ijstech/eth-wallet'));
            packageManager.addPackage('@ijstech/eth-contract', await storage.getPackageTypes('@ijstech/eth-contract'));
        };
        for (let n in scconfig.dependencies){
            if (!packageManager.packages(n))
                packageManager.addPackage(n, await storage.getPackageTypes(n));  
        };
        
        for (let name in packages){
            let pack = { files: await storage.getFiles(packages[name]) };
            for (let n in pack.files){
                if (n == 'index.ts' || n == 'index.tsx')
                    pack.files[n] = `///<amd-module name='${name}'/> \n` + pack.files[n];
                else
                    pack.files[n] = `///<amd-module name='${name}/${n}'/> \n` + pack.files[n];
            };
            packageManager.addPackage(name, pack);
        };

        await packageManager.buildAll();

        for (let name in packages) {
            let pack = packageManager.packages(name);
            if (pack.errors && pack.errors.length > 0) {
                console.error('Package compilation error: ' + name);
                console.error(JSON.stringify(pack.errors, null, 4));
                return;
            }
        };
        //copy compiled modules to dist directory
        let distDir = Path.join(scRootDir, scconfig.distDir || 'dist');
        let distLibDir = Path.join(distDir, scconfig.rootDir || '', scconfig.libDir || 'libs');
        let distModuleDir = Path.join(distDir, scconfig.rootDir || '', 'modules');
        // let distModuleDir = Path.join(distDir, 'libs/' + packageConfig.name);//'modules');
                
        for (let name in scconfig.modules) {
            let pack = packageManager.packages(name);
            let module = scconfig.modules[name];
            module.dependencies = [];
            pack.dependencies?.forEach((item: string) => {
                if (item != '@ijstech/components' && !item.startsWith('@ijstech/components/')){
                    module.dependencies.push(item);
                    if (!scconfig.modules[item] && !scconfig.dependencies[item])
                        scconfig.dependencies[item] = '*';
                };
            });
            let distModulePath = Path.join(distModuleDir, module.path);
            let script = '';
            if (pack.script && pack.script['index.js'])
                script = pack.script['index.js'];
            await storage.copyAssets(Path.join(scRootDir, scconfig.moduleDir || 'modules', module.path), distModulePath);
            // await storage.mkdir(distModulePath);
            await storage.writeFile(Path.join(distModulePath, 'index.js'), script);
        };        
        let checkDeps = true;
        while (checkDeps) {
            checkDeps = false;
            for (let name in scconfig.modules) {
                let module = scconfig.modules[name];
                for (let i = 0; i < module.dependencies.length; i++){
                    let depModule = scconfig.modules[module.dependencies[i]];
                    if (depModule){
                        for (let k = 0; k < depModule.dependencies.length; k++){
                            if (module.dependencies.indexOf(depModule.dependencies[k]) < 0){
                                module.dependencies.splice(i, 0, depModule.dependencies[k]);
                                checkDeps = true;
                            };
                        };
                    };
                };
            };
        };
        //copy dependencies        
        let deps = ['@ijstech/components'];
        await storage.copyPackage('@ijstech/components', Path.join(distLibDir, '@ijstech/components'));
        
        async function copyDependencies(dependencies: any, all?: boolean){
            dependencies = dependencies || {};
            for (let name in dependencies){
                if (name.startsWith('@ijstech/components/'))
                    name = '@ijstech/components';
                if ((all || name.startsWith('@ijstech/') || name.startsWith('@scom/'))){                    
                    let pack = await storage.copyPackage(name, Path.join(distLibDir, name));
                    if (pack){                     
                        deps.unshift(name);
                        let dependencies = pack.dependencies || {};
                        if (name == '@ijstech/eth-contract')
                            dependencies['@ijstech/eth-wallet'] = '*';
                        await copyDependencies(dependencies);                    
                    }
                };
            };            
        };
        async function bundleDependencies(dependencies: any){
            dependencies = dependencies || {};
            for (let name in dependencies){
                let content = '';
                if (scconfig.modules[name]){
                    content = await storage.readFile(Path.join(distModuleDir, `${scconfig.modules[name].path}/index.js`))}
                else
                    content = await storage.readFile(Path.join(distLibDir, name, 'index.js'))
                if (content)
                    bundleLibs[name] = content;
            };
        };
        scconfig.dependencies = scconfig.dependencies || {};
        if (scconfig.main && !scconfig.modules[scconfig.main] && !scconfig.dependencies[scconfig.main])
            scconfig.dependencies[scconfig.main] = '*';
        if (scconfig.bundle){
            await copyDependencies(scconfig.dependencies, true);
            await bundleDependencies(scconfig.dependencies);
            if (scconfig.main && scconfig.modules[scconfig.main] && scconfig.modules[scconfig.main].dependencies){
                let deps: {[name: string]: string} = {};
                for (let i = 0; i < scconfig.modules[scconfig.main].dependencies.length; i++)
                    deps[scconfig.modules[scconfig.main].dependencies[i]] = '*';
                deps[scconfig.main] = '*';
                await bundleDependencies(deps);
            };
            await storage.writeFile(Path.join(distDir, scconfig.rootDir || '', 'bundle.json'), JSON.stringify(bundleLibs));
        }
        else
            await copyDependencies(scconfig.dependencies, true);
        scconfig.dependencies = {};
        deps.forEach((name)=>{
            if (name != '@ijstech/components' && !name.startsWith('@ijstech/components/'))
                scconfig.dependencies[name] = '*'
        });

        delete scconfig['distDir'];
        scconfig.moduleDir = 'modules';
        // scconfig.moduleDir = 'libs/' + packageConfig.name;//'modules';

        await storage.writeFile(Path.join(distDir, 'scconfig.json'), JSON.stringify(scconfig, null, 4))

        //generate index.html
        let indexHtml = indexHtmlTemplate;
        let meta = '';
        if (scconfig.meta){
            for (let n in scconfig.meta){
                if (n == 'favicon'){
                    let value = scconfig.meta[n];
                    if (scconfig.rootDir && value.startsWith('modules/'))
                        value = `${scconfig.rootDir}/${value}`;
                    meta += `  <link rel="icon" href="${value}">\n`
                }
                else if (n == 'title')
                    meta += `  <title>${scconfig.meta[n]}</title>\n`
                else if (n == 'chartset')
                    meta += `  <meta charset="${scconfig.meta[n]}">\n`
                else if (n.indexOf(':') < 0)
                    meta += `  <meta name="${n}" content="${scconfig.meta[n]}">\n`
                else
                    meta += `  <meta property="${n}" content="${scconfig.meta[n]}">\n`
            };
        };
        indexHtml = indexHtml.replace('{{meta}}', meta);
        indexHtml = indexHtml.replaceAll('{{rootDir}}', scconfig.rootDir?scconfig.rootDir+'/':'');
        indexHtml = indexHtml.replace('{{main}}', `${scconfig.main || '@scom/dapp'}`);
        // indexHtml = indexHtml.replace('{{scconfig}}', JSON.stringify(scconfig, null, 4));
        await storage.writeFile(Path.join(scRootDir, scconfig.distDir || 'dist', 'index.html'), indexHtml);
        if (scconfig.ipfs == true){
            // let cid = await hashDir(distDir);
            // scconfig.ipfs = cid.cid;
            // await Fs.writeFile(Path.join(distDir, 'scconfig.json'), JSON.stringify(scconfig, null, 4), 'utf8');
            // await Fs.mkdir(Path.join(distDir, 'ipfs'), { recursive: true });
            // await writeIpfs(Path.join(distDir, 'ipfs'), cid);
        };
    };
};
// let Path: any;
// let Fs: any;
const PackageWhiteList = ['bignumber.js'];

export function resolveAbsolutePath(baseFilePath: string, relativeFilePath: string): string{    
    let basePath = baseFilePath.split('/').slice(0,-1).join('/');    
    if (basePath)
        basePath += '/';
    let fullPath = basePath + relativeFilePath;    
    return fullPath.split('/')
        .reduce((result: string[], value: string) => {
            if (value === '.'){}
            else if (value === '..') 
                result.pop()
            else
                result.push(value);
            return result;
        }, [])
        .join('/');
};
export type FileImporter = (fileName: string, isPackage?: boolean) => Promise<{fileName: string, content: string}|null>;
export type PackageImporter = (packName: string) => Promise<Types.IPackage>;
export class PackageManager{
    private packageImporter: PackageImporter | undefined;
    private tsconfig: any;
    private _packages: {[name: string]: Types.IPackage}={};

    constructor(options?: {packageImporter?: PackageImporter, tsconfig?: any}){
        this.packageImporter = options?.packageImporter;
        this.tsconfig = options?.tsconfig;
    };
    addPackage(name: string, pack: Types.IPackage){        
        if (!this._packages[name])
            this._packages[name] = pack
    };
    async buildAll(): Promise<boolean>{
        for (let name in this._packages){
            let result = await this.buildPackage(name);
            if (result.errors && result.errors.length > 0){
                console.dir('Failed to build package: ' + name)
                console.dir(result.errors);
                throw new Error('Failed to build package: ' + name);
            }
        };
        return true;
    };
    async buildPackage(name: string): Promise<Types.IPackage>{        
        let pack = this._packages[name];        
        if (!pack.dts && pack.files){
            // console.dir('#Build package: ' + name);
            let indexFile: string = '';
            if (pack.files['index.ts'])
                indexFile = 'index.ts'
            else if (pack.files['index.tsx'])
                indexFile = 'index.tsx';
            if (indexFile){
                let compiler = new Compiler({packageImporter: this.packageImporter, tsconfig: this.tsconfig});
                for (let n in this._packages){
                    if (this._packages[n].dts)
                        compiler.addPackage(n, this._packages[n])
                };
                await compiler.addFile(indexFile, pack.files[indexFile], async (fileName: string, isPackage?: boolean): Promise<{fileName: string, content: string}|null>=>{                    
                    if (isPackage){        
                        if (fileName && fileName.startsWith('@ijstech/components/'))
                            fileName = '@ijstech/components'; 
                        if (this._packages[fileName]){    
                            if (!this._packages[fileName].dts){
                                // console.dir('Add dependence: ' + fileName)
                                let p = await this.buildPackage(fileName);    
                                if (p.errors && p.errors.length > 0){
                                    console.dir(p.errors)
                                    throw new Error('Failed to build package: ' + fileName); 
                                };
                            };
                            compiler.addPackage(fileName, this._packages[fileName]);
                            let dts = '';
                            let pack = this._packages[fileName];
                            if (pack.dts && pack.dts['index.d.ts'])
                                dts = pack.dts['index.d.ts'];
                            return {
                                fileName: 'index.d.ts',
                                content: dts
                            }
                        }
                        // console.dir('Add dependence: ' + fileName)
                        if (fileName == '@ijstech/eth-contract' || fileName == '@ijstech/eth-wallet')
                            await compiler.addPackage('bignumber.js');
                        let result = await compiler.addPackage(fileName);
                        if (result)
                            return result;
                        throw new Error('Package not found: ' + fileName)
                    }
                    else{
                        let name = '';
                        if (pack.files){
                            if (pack.files[fileName])
                                name = fileName
                            else if (pack.files[fileName + '.ts'])
                                name = fileName + '.ts'
                            else if (pack.files[fileName + '.tsx'])
                                name = fileName + '.tsx'
                            else if (pack.files[fileName + '.d.ts'])
                                name = fileName + '.d.ts';
                            if (name)
                                return {
                                    fileName: name,
                                    content: pack.files[name]
                                };
                        };
                        return null;
                    }
                });
                let result = await compiler.compile(true);
                pack.dts = result.dts;
                pack.script = result.script;
                pack.dependencies = compiler.dependencies;
                pack.errors = result.errors;
            };
        };
        return pack;
    };
    packages(name: string): Types.IPackage{
        return this._packages[name];
    };
};
export class Compiler {
    private scriptOptions: TS.CompilerOptions;
    private dtsOptions: TS.CompilerOptions;
    private files: { [name: string]: string };
    private packageFiles: {[name: string]: string};
    private packages: {[index: string]: Types.IPackage} = {};
    private libs: {[index: string]: string};
    private fileNotExists: string;
    private resolvedFileName: string;
    public dependencies: string[] = [];
    private host: TS.CompilerHost;

    private packageImporter: PackageImporter | undefined;
    constructor(options?: {packageImporter?: PackageImporter, tsconfig?: any}) {
        this.packageImporter = options?.packageImporter;
        this.scriptOptions = options?.tsconfig || {
            allowJs: false,
            alwaysStrict: true,
            declaration: true,      
            experimentalDecorators: true,      
            resolveJsonModule: false,
            skipLibCheck: true,
            noEmitOnError: true,
            module: TS.ModuleKind.AMD,
            outFile: 'index.js',
            // module: TS.ModuleKind.CommonJS,
            target: TS.ScriptTarget.ES2017,
            "jsx": 2,      
            "jsxFactory": "global.$JSX"
        };
        this.dtsOptions = {            
            allowJs: false,
            alwaysStrict: true,
            declaration: true,       
            emitDeclarationOnly: true,
            experimentalDecorators: true,     
            resolveJsonModule: false,     
            skipLibCheck: true,       
            module: TS.ModuleKind.CommonJS,
            noEmitOnError: true,
            target: TS.ScriptTarget.ES2017
        };
        this.files = {};
        this.packageFiles = {};
    };
    private async importDependencies(fileName: string, content: string, fileImporter: FileImporter, result?: string[]): Promise<string[]>{
        let ast = TS.createSourceFile(
            fileName,
            content,
            TS.ScriptTarget.ES2017,
            true
        );
        result = result || [];
        for (let i = 0; i < ast.statements.length; i ++){
            let node = ast.statements[i];                        
            if (node.kind == TS.SyntaxKind.ImportDeclaration || node.kind == TS.SyntaxKind.ExportDeclaration){
                if ((node as any).moduleSpecifier){
                    let module = (<TS.LiteralLikeNode>(node as any).moduleSpecifier).text;
                    
                    if (module.startsWith('.')){                    
                        let filePath = resolveAbsolutePath(fileName, module)                    
                        if (this.files[filePath] == undefined && this.files[filePath + '.ts'] == undefined && this.files[filePath + '.tsx'] == undefined){                        
                            let file = await fileImporter(filePath);
                            if (file){
                                result.push('./' + file.fileName);
                                this.addFile(file.fileName, file.content);
                                await this.importDependencies(filePath, file.content, fileImporter, result);
                            }                        
                        }
                    }
                    else{
                        if (this.dependencies.indexOf(module) < 0)
                            this.dependencies.push(module);
                        if (!this.packages[module]){
                            let file = await fileImporter(module, true);
                            if (file){
                                result.push(module);
                                let pack: Types.IPackage = {
                                    dts: {'index.d.ts': file.content}
                                };
                                this.addPackage(module, pack);
    
                            };
                        };   
                    };
                } 
            }            
        };
        return result;
    }
    async addFile(fileName: string, content: string, dependenciesImporter?: FileImporter): Promise<string[]> {
        this.files[fileName] = content;
        if (dependenciesImporter){            
            let result = await this.importDependencies(fileName, content, dependenciesImporter);
            return result;
        }
        else
            return [];
    };
    updateFile(fileName: string, content: string){
        this.files[fileName] = content;
    };
    private getProgram(result?: Types.ICompilerResult): TS.Program{
        const host = {
            getSourceFile: this.getSourceFile.bind(this),
            getDefaultLibFileName: () => "lib.d.ts",
            writeFile: (fileName: string, content: string) => {
                if (result){
                    if (fileName.endsWith('d.ts'))
                        result.dts[fileName] = content
                    else{                    
                        result.script[fileName] = content.replace(new RegExp(/\global.\$JSX\(/, 'g'), 'this.$render(');
                    }
                };                
            },
            getCurrentDirectory: () => "",
            getDirectories: (path: string) => {
                return TS.sys.getDirectories(path)
            },
            getCanonicalFileName: (fileName: string) =>
                TS.sys && TS.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
            getNewLine: () => TS.sys && TS.sys.newLine?TS.sys.newLine:'\n',
            useCaseSensitiveFileNames: () => TS.sys && TS.sys.useCaseSensitiveFileNames?TS.sys.useCaseSensitiveFileNames:false,
            fileExists: () => true,
            readFile: this.readFile.bind(this),
            resolveModuleNames: this.resolveModuleNames.bind(this)
        };
        let fileNames = [];
        
        for (let f in this.files)
            fileNames.push(f);
        

        let program:TS.Program = TS.createProgram(fileNames, this.scriptOptions, host);
        return program;
    };
    async addPackage(packName: string, pack?: Types.IPackage): Promise<{fileName: string, content: string} | undefined>{       
        if (!pack){
            if (!this.packages[packName]){
                if (this.packageImporter){
                    // let pack = await storage.getPackageTypes(packName);
                    let pack = await this.packageImporter(packName);
                    if (pack?.dts){     
                        this.addPackage(packName, pack);               
                        if (pack.dependencies){
                            for (let i = 0; i < pack.dependencies.length; i ++){
                                let n = pack.dependencies[i];
                                if (PackageWhiteList.indexOf(n) > -1 || n.startsWith('@scom/') || n.startsWith('@ijstech/'))
                                    await this.addPackage(n);
                            };
                        };
                        let dts = '';
                        if (pack.dts && pack.dts['index.d.ts'])
                            dts = pack.dts['index.d.ts'];
                        return {
                            fileName: 'index.d.ts',
                            content: dts
                        };
                    };
                };
            };
        } 
        else{
            this.packages[packName] = pack;
            if (pack.dts && pack.dts['index.d.ts'])
                this.packageFiles[packName] = pack.dts['index.d.ts'];
        };
    };
    async compile(emitDeclaration?: boolean): Promise<Types.ICompilerResult> {
        let result: Types.ICompilerResult = {
            errors: [],
            script: {},
            dts: {},
        };        
        try{
            let program = this.getProgram(result);
            const emitResult = program.emit();
            emitResult.diagnostics.forEach(item => {
                result.errors.push({
                    category: item.category,
                    code: item.code,
                    file: item.file?item.file.fileName:'',
                    length: item.length?item.length:0,
                    message: item.messageText,
                    start: item.start?item.start:0
                });
            });
            // if (emitDeclaration){
            //     program = TS.createProgram(fileNames, this.dtsOptions, host);
            //     program.emit();
            // };
        }
        catch(err){
            if (this.fileNotExists)
                console.dir('File not exists: ' + this.fileNotExists)
            else
                console.trace(err);
        };
        return result;
    };
    getSource(fileName: string): TS.SourceFile | undefined{
        let program = this.getProgram();
        program.getTypeChecker();
        const source = program.getSourceFile(fileName);
        return source;
    };
    addComponentProp(fileName: string, className: string, id: string){        
        const source = this.getSource(fileName);
        if (source){
            let result = Parser.addComponentProp(source, className, id);
            return result;
        };
    };
    addEventHandler(fileName: string, classNames: string[], func:string, params?: string): {code?: string, lineNumber?: number, columnNumber?: number,}{
        const source = this.getSource(fileName);
        if (source){
            let result = Parser.addEventHandler(source, classNames, func, params);
            return result;
        }
        else   
            return {};
    };
    locateMethod(fileName: string, funcName:string): {lineNumber?: number, columnNumber?: number,}{
        const source = this.getSource(fileName);
        if (source){
            let result = Parser.locateMethod(source, funcName);
            return result;
        }
        else   
            return {};
    };
    renameMethod(fileName: string, fromFuncName:string, toFuncName:string): string | undefined{
        const source = this.getSource(fileName);
        if (source){
            let result = Parser.renameMethod(source, fromFuncName, toFuncName);
            return result;
        };
    };
    renameComponent(fileName: string, className: string, fromId: string, toId: string){
        const source = this.getSource(fileName);
        if (source){
            let result = Parser.renameProperty(source, className, fromId, toId);
            return result;
        }
    };
    parseUI(fileName: string, funcName?: string): Parser.IComponent | undefined{
        funcName = funcName || 'render';        
        
        let program = this.getProgram();
        program.getTypeChecker();
        const source = program.getSourceFile(fileName);
        // https://ts-ast-viewer.com/
        if (source){
            let component = Parser.parseUI(source, funcName);
            return component;
        };
        return;
    };
    renderUI(fileName: string, funcName?: string, component?: Parser.IComponent): string | undefined{
        funcName = funcName || 'render';        
        let program = this.getProgram();
        program.getTypeChecker();
        const source = program.getSourceFile(fileName);
        if (source){
            return Parser.renderUI(source, funcName, component);
        };
    };
    fileExists(fileName: string): boolean {
        let result = this.files[fileName] != undefined || this.packageFiles[fileName] != undefined;
        if (!result && fileName.endsWith('/index.d.ts')){
            let packName = fileName.split('/').slice(0, -1).join('/');
            result = this.packages[packName] != undefined;
        };        
        if (!result && fileName.endsWith('.ts'))
            result = this.packages[fileName.slice(0, -3)] != undefined;
        if (!result && this.files[fileName.slice(0, -3) + '/index.ts'] != undefined){
            result = true;
            this.resolvedFileName = fileName.slice(0, -3) + '/index.ts';
        };
        if (!result)        
            this.fileNotExists = fileName
        else
            this.fileNotExists = '';
        return result;
    };
    async getDependencies(fileName: string, content: string, fileImporter?: FileImporter, result?: string[]): Promise<string[]>{
        let ast = TS.createSourceFile(
            fileName,
            content,
            TS.ScriptTarget.ES2017,
            true
        );
        result = result || [];
        for (let i = 0; i < ast.statements.length; i ++){
            let node = ast.statements[i];                        
            if (node.kind == TS.SyntaxKind.ImportDeclaration){                
                let module = (<TS.LiteralLikeNode>(node as any).moduleSpecifier).text;   
                if (module.startsWith('@ijstech/components/'))        
                    module = '@ijstech/components';     
                if (module.startsWith('.')){
                    let filePath = resolveAbsolutePath(fileName, module)
                    if (result.indexOf(filePath) < 0 && result.indexOf(filePath + '.ts') < 0 && result.indexOf(filePath + '.tsx') < 0){
                        if (fileImporter){
                            let file = await fileImporter(filePath);
                            if (file){
                                result.push(file.fileName);
                                await this.getDependencies(filePath, file.content, fileImporter, result);
                            }
                        }
                        else
                            result.push(filePath);
                    }
                }
                else if (result.indexOf(module) < 0){
                    if (fileImporter)
                        await fileImporter(module, true);
                    result.push(module);
                }
            }
        }        
        return result;
    };
    getSourceFile(fileName: string, languageVersion: TS.ScriptTarget, onError?: (message: string) => void) {
        if (fileName == 'lib.d.ts') {            
            return TS.createSourceFile(fileName, Lib, languageVersion);
        };
        let content = this.packageFiles[fileName] || this.files[fileName];
        if (!content && fileName.endsWith('/index.d.ts')){
            let packName = fileName.split('/').slice(0, -1).join('/');
            let dts = '';
            let pack = this.packages[packName];
            if (pack && pack.dts && pack.dts['index.d.ts'])
                dts = pack.dts['index.d.ts'];
            if (this.packages[packName]){
                content = dts
            }
            else {
                for (let n in this.packages){
                    if (packName.endsWith('/' + n)){
                        let pack = this.packages[n];
                        let dts = '';
                        if (pack && pack.dts && pack.dts['index.d.ts'])
                            dts = pack.dts['index.d.ts'];
                        content = dts;
                        break;
                    };
                };
            };
        };
        if (!content){
            throw new Error('File not exists: ' + fileName);        }

        return TS.createSourceFile(fileName, content, languageVersion);
    };
    readFile(fileName: string): string | undefined {
        return;
    };
    resolveModuleNames(moduleNames: string[], containingFile: string): TS.ResolvedModule[] {
        let resolvedModules: TS.ResolvedModule[] = [];
        for (const moduleName of moduleNames) {
            let result = TS.resolveModuleName(moduleName, containingFile, this.scriptOptions, {
                fileExists: this.fileExists.bind(this),
                readFile: this.readFile.bind(this)
            });
            if (result.resolvedModule) {
                if (!moduleName.startsWith('./') && !moduleName.startsWith('../')){
                    resolvedModules.push(<any>{
                        resolvedFileName: moduleName + '/index.d.ts',
                        extension: '.ts',
                        isExternalLibraryImport: true
                    });
                }
                else if (this.resolvedFileName){
                    resolvedModules.push(<any>{
                        resolvedFileName: this.resolvedFileName,
                        extension: '.ts',
                        isExternalLibraryImport: false
                    });
                }
                else
                    resolvedModules.push(result.resolvedModule);
            };
        };
        return resolvedModules;
    };
};
