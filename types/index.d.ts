import * as Parser from './parser';
import TS from "./lib/typescript";
import Path from './path';
export { Parser, Path };
export interface IStorage {
    copyAssets(sourceDir: string, targetDir: string): Promise<void>;
    copyPackage(packName: string, targetDir: string): Promise<any>;
    getSCConfig(): Promise<any>;
    getPackage(packName: string): Promise<any>;
    getPackageConfig(): Promise<any>;
    getPackageTypes(packName: string): Promise<IPackage>;
    getFiles(dir: string): Promise<{
        [filePath: string]: string;
    }>;
    mkdir(dir: string): Promise<void>;
    readFile(fileName: string): Promise<string>;
    writeFile(fileName: string, content: string): Promise<void>;
}
export declare function bundle(storage: IStorage, RootPath: string, SourcePath: string): Promise<void>;
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
export declare function resolveAbsolutePath(baseFilePath: string, relativeFilePath: string): string;
export declare type FileImporter = (fileName: string, isPackage?: boolean) => Promise<{
    fileName: string;
    content: string;
} | null>;
export declare type PackageImporter = (packName: string) => Promise<IPackage>;
export declare class PackageManager {
    private packageImporter;
    private _packages;
    constructor(options?: {
        packageImporter?: PackageImporter;
    });
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
    private host;
    private packageImporter;
    constructor(options?: {
        packageImporter?: PackageImporter;
    });
    private importDependencies;
    addFile(fileName: string, content: string, dependenciesImporter?: FileImporter): Promise<string[]>;
    updateFile(fileName: string, content: string): void;
    private getProgram;
    addPackage(packName: string, pack?: IPackage): Promise<{
        fileName: string;
        content: string;
    } | undefined>;
    compile(emitDeclaration?: boolean): Promise<ICompilerResult>;
    getSource(fileName: string): TS.SourceFile | undefined;
    addComponentProp(fileName: string, className: string, id: string): string | undefined;
    addEventHandler(fileName: string, classNames: string[], func: string, params?: string): {
        code?: string;
        lineNumber?: number;
        columnNumber?: number;
    };
    locateMethod(fileName: string, funcName: string): {
        lineNumber?: number;
        columnNumber?: number;
    };
    renameMethod(fileName: string, fromFuncName: string, toFuncName: string): string | undefined;
    renameComponent(fileName: string, className: string, fromId: string, toId: string): string | undefined;
    parseUI(fileName: string, funcName?: string): Parser.IComponent | undefined;
    renderUI(fileName: string, funcName?: string, component?: Parser.IComponent): string | undefined;
    fileExists(fileName: string): boolean;
    getDependencies(fileName: string, content: string, fileImporter?: FileImporter, result?: string[]): Promise<string[]>;
    getSourceFile(fileName: string, languageVersion: TS.ScriptTarget, onError?: (message: string) => void): TS.SourceFile;
    readFile(fileName: string): string | undefined;
    resolveModuleNames(moduleNames: string[], containingFile: string): TS.ResolvedModule[];
}
