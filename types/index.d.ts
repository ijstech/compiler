import * as Parser from './parser';
import TS from "./lib/typescript";
export { Parser };
export interface ICompilerError {
    file: string;
    start: number;
    length: number;
    message: string | TS.DiagnosticMessageChain;
    category: number;
    code: number;
}
export interface ICompilerResult {
    errors: ICompilerError[];
    script: {
        [file: string]: string;
    };
    dts: {
        [file: string]: string;
    };
}
export declare type IPackageFiles = {
    [filePath: string]: string;
};
export interface IPackage {
    files?: IPackageFiles;
    path?: string;
    errors?: ICompilerError[];
    script?: string;
    dts?: string;
    dependencies?: string[];
}
export declare function getLocalPackageTypes(name: string): Promise<IPackage>;
export declare function getLocalPackagePath(name: string): Promise<string>;
export declare function resolveAbsolutePath(baseFilePath: string, relativeFilePath: string): string;
export declare type FileImporter = (fileName: string, isPackage?: boolean) => Promise<{
    fileName: string;
    content: string;
} | null>;
export declare type PakageFileImporter = (packName: string, fileName: string) => Promise<string>;
export declare class PackageManager {
    private fileImporter;
    private _packages;
    addPackage(name: string, pack: IPackage): void;
    buildAll(): Promise<boolean>;
    buildPackage(name: string): Promise<IPackage>;
    packages(name: string): IPackage;
}
export declare class Compiler {
    private scriptOptions;
    private dtsOptions;
    private files;
    private packageFiles;
    private packages;
    private libs;
    private fileNotExists;
    private resolvedFileName;
    dependencies: string[];
    constructor();
    private importDependencies;
    addFile(fileName: string, content: string, dependenciesImporter?: FileImporter): Promise<string[]>;
    updateFile(fileName: string, content: string): void;
    addPackage(packName: string, pack?: IPackage): Promise<{
        fileName: string;
        content: string;
    } | undefined>;
    compile(emitDeclaration?: boolean): Promise<ICompilerResult>;
    parseUI(fileName: string, funcName?: string): Parser.IComponent | undefined;
    renderUI(fileName: string, funcName?: string, component?: Parser.IComponent): string | undefined;
    fileExists(fileName: string): boolean;
    getDependencies(fileName: string, content: string, fileImporter?: FileImporter, result?: string[]): Promise<string[]>;
    getSourceFile(fileName: string, languageVersion: TS.ScriptTarget, onError?: (message: string) => void): TS.SourceFile;
    readFile(fileName: string): string | undefined;
    resolveModuleNames(moduleNames: string[], containingFile: string): TS.ResolvedModule[];
}
