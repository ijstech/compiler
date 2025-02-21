/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import * as Parser from './parser';
import TS from "./lib/typescript";
import Path from './path';
export { Parser, Path };
import * as Types from './types';
import { ICompilerError } from './types';
export { Types };
export declare enum EPackageType {
    contract = "contract",
    dapp = "dapp",
    widget = "widget",
    worker = "worker"
}
export declare function bundleContract(storage: Types.IStorage, solc: Types.ISolc, RootPath?: string): Promise<void>;
export declare function bundleTactContract(storage: Types.IStorage, RootPath?: string, config?: any): Promise<Record<string, string>>;
export declare function bundleSdk(storage: Types.IStorage, RootPath?: string): Promise<void>;
export declare function bundleLib(storage: Types.IStorage, RootPath?: string): Promise<void>;
export declare function bundleDist(bundleType: string, storage: Types.IStorage, RootPath?: string): Promise<void>;
export declare function bundleWorker(storage: Types.IStorage, RootPath?: string): Promise<void>;
export declare function bundleWidget(storage: Types.IStorage, RootPath?: string): Promise<void>;
export declare function bundleDapp(storage: Types.IStorage, RootPath?: string): Promise<void>;
export declare function resolveAbsolutePath(baseFilePath: string, relativeFilePath: string): string;
export type FileImporter = (fileName: string, isPackage?: boolean) => Promise<{
    fileName: string;
    content: string;
} | null>;
export type PackageImporter = (packName: string) => Promise<Types.IPackage>;
export declare class PackageManager {
    private packageImporter;
    private tsconfig;
    private _packages;
    private _importedPackages;
    constructor(options?: {
        packageImporter?: PackageImporter;
        tsconfig?: any;
    });
    getImportedPackage(name: string): Types.IPackage;
    setImportedPackage(name: string, pack: Types.IPackage): void;
    addPackage(name: string, pack: Types.IPackage): void;
    buildAll(storage?: Types.IStorage): Promise<boolean>;
    buildPackage(name: string, storage?: Types.IStorage): Promise<Types.IPackage>;
    packages(name: string): Types.IPackage;
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
    private packageManager;
    private packageImporter;
    constructor(options?: {
        packageManager?: PackageManager;
        packageImporter?: PackageImporter;
        tsconfig?: any;
    });
    private importDependencies;
    addFile(fileName: string, content: string, dependenciesImporter?: FileImporter): Promise<string[]>;
    updateFile(fileName: string, content: string): void;
    private getProgram;
    addPackage(packName: string, pack?: Types.IPackage): Promise<{
        fileName: string;
        content: string;
    } | undefined>;
    compile(emitDeclaration?: boolean): Promise<Types.ICompilerResult>;
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
    locateError(error: ICompilerError): {
        lineNumber?: number;
        columnNumber?: number;
    };
    locateControl(fileName: string, control: Parser.IComponent): {
        lineNumber?: number;
        columnNumber?: number;
    };
    renameMethod(fileName: string, fromFuncName: string, toFuncName: string): string | undefined;
    renameComponent(fileName: string, className: string, fromId: string, toId: string): string | undefined;
    parseUI(fileName: string, funcName?: string): Parser.IComponent | undefined;
    renderUI(fileName: string, funcName?: string, component?: Parser.IComponent): string | undefined;
    fileExists(fileName: string): boolean;
    getDependencies(fileName: string, content: string, fileImporter?: FileImporter, result?: string[]): Promise<string[]>;
    getSourceFile(fileName: string, languageVersion: TS.ScriptTarget, onError?: (message: string) => void): TS.SourceFile | undefined;
    readFile(fileName: string): string | undefined;
    resolveModuleNames(moduleNames: string[], containingFile: string): TS.ResolvedModule[];
}
