import TS from "typescript";
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
interface IPackage {
    path?: string;
    dts: {
        [file: string]: string;
    };
    version: string;
}
export declare class Compiler {
    private scriptOptions;
    private dtsOptions;
    private files;
    private packageFiles;
    private fileNames;
    private packages;
    private libs;
    constructor();
    addContent(fileName: string, content: string): void;
    addPackage(packName: string, pack: IPackage): void;
    compile(emitDeclaration?: boolean): Promise<ICompilerResult>;
    fileExists(fileName: string): boolean;
    getSourceFile(fileName: string, languageVersion: TS.ScriptTarget, onError?: (message: string) => void): TS.SourceFile;
    readFile(fileName: string): string | undefined;
    resolveModuleNames(moduleNames: string[], containingFile: string): TS.ResolvedModule[];
}
export {};
