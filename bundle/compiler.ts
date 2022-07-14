
///<amd-module name='@ijstech/compiler'/>
import Lib from './lib';
import TS from "typescript";

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
interface IPackage{
    path?: string;
    dts: {[file: string]: string},
    version: string,
};
export class Compiler {
    private scriptOptions: TS.CompilerOptions;
    private dtsOptions: TS.CompilerOptions;
    private files: { [name: string]: string };
    private packageFiles: {[name: string]: string};
    private fileNames: string[];
    private packages: {[index: string]: IPackage} = {};
    private libs: {[index: string]: string};

    constructor() {
        this.scriptOptions = {
            allowJs: false,
            alwaysStrict: true,
            declaration: false,      
            experimentalDecorators: true,      
            resolveJsonModule: false,
            noEmitOnError: true,

            module: TS.ModuleKind.AMD,
            outFile: 'index.js',

            // module: TS.ModuleKind.CommonJS,

            target: TS.ScriptTarget.ES2017,
            "jsx": 2,      
            "jsxFactory": "$JSX"
        };
        this.dtsOptions = {            
            allowJs: false,
            alwaysStrict: true,
            declaration: true,       
            emitDeclarationOnly: true,
            experimentalDecorators: true,     
            resolveJsonModule: false,            
            module: TS.ModuleKind.CommonJS,
            noEmitOnError: true,
            target: TS.ScriptTarget.ES2017
        };
        this.files = {};
        this.packageFiles = {};
        this.fileNames = [];
    };
    addContent(fileName: string, content: string) {
        this.files[fileName] = content;
        this.fileNames.push(fileName);
    };   
    addPackage(packName: string, pack: IPackage){        
        this.packages[packName] = pack;        
        for (let n in pack.dts){
            this.packageFiles[packName + '/' + n] = pack.dts[n];
        }
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
                    result.script[fileName] = content.replace(new RegExp(/\$JSX\(/, 'g'), 'this.$render(');
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
        let program = TS.createProgram(this.fileNames, this.scriptOptions, host);
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
        if (emitDeclaration){
            program = TS.createProgram(this.fileNames, this.dtsOptions, host);
            program.emit();
        };
        return result;
    };
    fileExists(fileName: string): boolean {                
        // return true;
        let result = this.fileNames.indexOf(fileName) > -1 || this.packageFiles[fileName] != undefined;
        if (!result && fileName.endsWith('.ts'))
            result = this.packages[fileName.slice(0, -3)] != undefined;
        if (!result)        
            console.dir('File not exists: ' + fileName);
        return result
    };
    getSourceFile(fileName: string, languageVersion: TS.ScriptTarget, onError?: (message: string) => void) {
        if (fileName == 'lib.d.ts') {            
            return TS.createSourceFile(fileName, Lib, languageVersion);
        };
        let content = this.packageFiles[fileName] || this.files[fileName];
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
