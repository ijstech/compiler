/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import Lib from './lib';
import TS from "typescript";

let isNode = false;    
if (typeof process === 'object') {
  if (typeof process.versions === 'object') {
    if (typeof process.versions.node !== 'undefined') {
      isNode = true;
    }
  }
};

export interface ICompilerError {
    file: string;
    start: number;
    length: number;
    message: string | TS.DiagnosticMessageChain;
    category: number;
    code: number;
};
export interface ICompilerResult {
    errors: ICompilerError[];
    script: {[file: string]: string};
    dts: {[file: string]: string};
};
export type IPackageFiles = {[filePath: string]: string};
export interface IPackage{
    files?:IPackageFiles;
    path?: string;
    errors?: ICompilerError[];
    script?: string;
    dts?: string;
    dependencies?: string[];
};
let Path: any;
let Fs: any;
const PackageWhiteList = ['bignumber.js'];
export async function getLocalPackageTypes(name: string): Promise<IPackage> {
    let path = await getLocalPackagePath(name);
    if (path){
        try{
            let pack = JSON.parse(await Fs.readFile(Path.join(path, 'package.json'), 'utf8'))
            let dts = await Fs.readFile(Path.join(path, pack.pluginTypes || pack.types || pack.typings || 'index.d.ts'), 'utf8');
            let dependencies: string[] = [];
            for (let n in pack.dependencies){
                if (PackageWhiteList.indexOf(n) > -1 || n.startsWith('@scom/') || n.startsWith('@ijstech/'))
                    dependencies.push(n)
            }
            return {
                dts: dts,
                dependencies: dependencies
            };
        }
        catch(err){}
        
    }
    return {};
};
export async function getLocalPackagePath(name: string): Promise<string>{
    if (isNode){
        try{
            if (!Path){
                Path = require('path');
                Fs = require('fs').promises;
            };
            let path = '';
            if (name[0] != '/')
                path = Path.dirname(require.resolve(name + '/package.json'))
            else
                path = Path.dirname(name);
            if (path && path != '/') {
                try {
                    let stat = await Fs.stat(Path.join(path, 'package.json'))
                    if (stat.isFile())
                        return path
                    else
                        return getLocalPackagePath(path);
                }
                catch (err) {
                    return getLocalPackagePath(path);
                };
            };
        }
        catch(err){
            console.dir(err)
            return ''
        };
    };
    return '';
};
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
}
export type FileImporter = (fileName: string, isPackage?: boolean) => Promise<{fileName: string, content: string}|null>;
export type PakageFileImporter = (packName: string, fileName: string) => Promise<string>;
export class PackageManager{
    private fileImporter: PakageFileImporter;
    private _packages: {[name: string]: IPackage}={};

    addPackage(name: string, pack: IPackage){        
        if (!this._packages[name])
            this._packages[name] = pack
    };
    async buildAll(): Promise<boolean>{
        for (let name in this._packages){
            let result = await this.buildPackage(name);
            if (result.errors && result.errors.length > 0)
                return false;
        };
        return true;
    };
    async buildPackage(name: string): Promise<IPackage>{
        let pack = this._packages[name];        
        if (!pack.dts && pack.files){
            let indexFile: string = '';
            if (pack.files['index.ts'])
                indexFile = 'index.ts'
            else if (pack.files['index.tsx'])
                indexFile = 'index.tsx';
            if (indexFile){
                let compiler = new Compiler();
                await compiler.addFile(indexFile, pack.files[indexFile], async (fileName: string, isPackage?: boolean): Promise<{fileName: string, content: string}|null>=>{                    
                    if (isPackage){         
                        if (this._packages[fileName]){    
                            if (!this._packages[fileName].dts){
                                let p = await this.buildPackage(fileName);    
                            };
                            compiler.addPackage(fileName, this._packages[fileName]);
                            return {
                                fileName: 'index.d.ts',
                                content: this._packages[fileName].dts || ''
                            }
                        }
                        let result = await compiler.addPackage(fileName);
                        if (result)
                            return result;
                        // let pack = await getLocalPackageTypes(fileName);
                        // if (pack.dts){
                        //     compiler.addPackage(fileName, pack)
                        //     return {
                        //         fileName: 'index.d.ts',
                        //         content: pack.dts
                        //     }
                        // };
                        console.dir('Package not found: ' + fileName)
                        return null
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
                                }
                        }
                        return null;
                    }
                });
                let result = await compiler.compile(true);
                pack.dts = result.dts['index.d.ts'];
                pack.script = result.script['index.js'];
                pack.dependencies = compiler.dependencies;
                pack.errors = result.errors;
            };
        };
        return pack;
    };
    packages(name: string): IPackage{
        return this._packages[name];
    };
};
export class Compiler {
    private scriptOptions: TS.CompilerOptions;
    private dtsOptions: TS.CompilerOptions;
    private files: { [name: string]: string };
    private packageFiles: {[name: string]: string};
    private packages: {[index: string]: IPackage} = {};
    private libs: {[index: string]: string};
    private fileNotExists: string;
    public dependencies: string[] = [];
    constructor() {
        this.scriptOptions = {
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
                                let pack: IPackage = {
                                    dts: file.content
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
    async addPackage(packName: string, pack?: IPackage){       
        if (!pack){
            if (!this.packages[packName]){
                let pack = await getLocalPackageTypes(packName);
                if (pack.dts){                    
                    if (pack.dependencies){
                        for (let i = 0; i < pack.dependencies.length; i ++)
                            await this.addPackage(pack.dependencies[i]);
                    };
                    this.addPackage(packName, pack);
                    return {
                        fileName: 'index.d.ts',
                        content: pack.dts
                    };
                };
            };
        } 
        else{
            this.packages[packName] = pack;
            if (pack.dts)
                this.packageFiles[packName] = pack.dts;
        };
    };
    async compile(emitDeclaration?: boolean): Promise<ICompilerResult> {
        let result: ICompilerResult = {
            errors: [],
            script: {},
            dts: {},
        }
        const host = {
            getSourceFile: this.getSourceFile.bind(this),
            getDefaultLibFileName: () => "lib.d.ts",
            writeFile: (fileName: string, content: string) => {
                if (fileName.endsWith('d.ts'))
                    result.dts[fileName] = content
                else{                    
                    result.script[fileName] = content.replace(new RegExp(/\global.\$JSX\(/, 'g'), 'this.$render(');
                }
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
        
        try{
            let program = TS.createProgram(fileNames, this.scriptOptions, host);
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
                console.trace(err)
        }
        return result;
    };
    fileExists(fileName: string): boolean {
        let result = this.files[fileName] != undefined || this.packageFiles[fileName] != undefined;
        if (!result && fileName.endsWith('/index.d.ts')){
            let packName = fileName.split('/').slice(0, -1).join('/');
            result = this.packages[packName] != undefined;
        };        
        if (!result && fileName.endsWith('.ts'))
            result = this.packages[fileName.slice(0, -3)] != undefined;
        if (!result)        
            this.fileNotExists = fileName
        else
            this.fileNotExists = '';
        return result
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
            if (this.packages[packName])
                content = this.packages[packName].dts || '';
        }
        if (!content){
            console.dir('File not exists: ' + fileName);        }

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
                if (!moduleName.startsWith('./')){
                    resolvedModules.push(<any>{
                        resolvedFileName: moduleName + '/index.d.ts',
                        extension: '.ts',
                        isExternalLibraryImport: true
                    });
                }
                else
                    resolvedModules.push(result.resolvedModule);
            };
        };
        return resolvedModules;
    };
};
