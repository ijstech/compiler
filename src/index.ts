/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import Lib from './lib';
import * as Parser from './parser';
import TS from "./lib/typescript";
export {Parser};

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
export type PackageImporter = (packName: string) => Promise<IPackage>;
export class PackageManager{
    private packageImporter: PackageImporter | undefined;
    private _packages: {[name: string]: IPackage}={};

    constructor(options?: {packageImporter?: PackageImporter}){
        this.packageImporter = options?.packageImporter
    };
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
            console.dir('#Build package: ' + name);
            let indexFile: string = '';
            if (pack.files['index.ts'])
                indexFile = 'index.ts'
            else if (pack.files['index.tsx'])
                indexFile = 'index.tsx';
            if (indexFile){
                let compiler = new Compiler({packageImporter: this.packageImporter});
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
                                console.dir('Add dependence: ' + fileName)
                                let p = await this.buildPackage(fileName);    
                                if (p.errors && p.errors.length > 0){
                                    console.dir(p.errors)
                                    throw new Error('Failed to build package: ' + fileName); 
                                };
                            };
                            compiler.addPackage(fileName, this._packages[fileName]);
                            return {
                                fileName: 'index.d.ts',
                                content: this._packages[fileName].dts || ''
                            }
                        }
                        console.dir('Add dependence: ' + fileName)
                        if (fileName == '@ijstech/eth-contract' || fileName == '@ijstech/eth-wallet')
                            await compiler.addPackage('bignumber.js');
                        let result = await compiler.addPackage(fileName);
                        if (result)
                            return result;

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
                                };
                        };
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
    private resolvedFileName: string;
    public dependencies: string[] = [];
    private host: TS.CompilerHost;

    private packageImporter: PackageImporter | undefined;
    constructor(options?: {packageImporter?: PackageImporter}) {
        this.packageImporter = options?.packageImporter;
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
    updateFile(fileName: string, content: string){
        this.files[fileName] = content;
    };
    private getProgram(result?: ICompilerResult): TS.Program{
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
    async addPackage(packName: string, pack?: IPackage){       
        if (!pack){
            if (!this.packages[packName]){
                if (this.packageImporter){
                    // let pack = await getLocalPackageTypes(packName);
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
                        return {
                            fileName: 'index.d.ts',
                            content: pack.dts
                        };
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
            if (this.packages[packName]){
                content = this.packages[packName].dts || ''
            }
            else {
                for (let n in this.packages){
                    if (packName.endsWith('/' + n)){
                        content = this.packages[n].dts || '';
                        break;
                    };
                };
            };
        };
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
