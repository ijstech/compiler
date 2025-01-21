import TS from "./lib/typescript";
export interface ICidInfo {
    cid: string;
    links?: ICidInfo[];
    name?: string;
    size: number;
    type?: 'dir' | 'file';
}
export interface IStorage {
    rootPath: string;
    cidToSri(value: string): Promise<string>;
    copyAssets(sourceDir: string, targetDir: string): Promise<void>;
    copyPackage(packName: string, targetDir: string, packages?: string[]): Promise<any>;
    getSCConfig(): Promise<any>;
    getPackage(packName: string): Promise<any>;
    getPackageConfig(): Promise<any>;
    getPackageTypes(packName: string): Promise<IPackage>;
    getFiles(dir: string): Promise<{
        [filePath: string]: string;
    }>;
    hashContent(dir: string): Promise<string>;
    hashDir(dir: string): Promise<ICidInfo>;
    isDirectory(dir: string): Promise<boolean>;
    isFile(filePath: string): Promise<boolean>;
    isFileExists(filePath: string): Promise<boolean>;
    readDir(dir: string): Promise<string[]>;
    readFile(fileName: string): Promise<string>;
    rename(oldPath: string, newPath: string): Promise<void>;
    writeFile(fileName: string, content: string): Promise<void>;
    onCompile?(fileName: string): Promise<void>;
}
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
export type IPackageFiles = {
    [filePath: string]: string;
};
export interface IPackage {
    indexFile?: string;
    files?: IPackageFiles;
    path?: string;
    errors?: ICompilerError[];
    script?: {
        [file: string]: string;
    };
    dts?: {
        [file: string]: string;
    };
    dependencies?: string[];
}
export interface ISolc {
    compile(source: string, version?: string): any;
}
export interface ISource {
    [contract: string]: {
        content: string;
    };
}
export type NetworkEnvironment = 'TESTNET' | 'MAINNET' | 'SANDBOX';
