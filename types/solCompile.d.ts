/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import * as Types from './types';
interface OutputOptions {
    abi?: boolean;
    bytecode?: boolean;
    batchCall?: boolean;
    txData?: boolean;
}
interface CompileOptions {
    version?: string;
    optimizerRuns?: number;
    viaIR?: boolean;
    outputOptions?: OutputOptions;
}
interface Override extends CompileOptions {
    root?: string;
    sources: string[];
}
interface Config extends CompileOptions {
    sourceDir?: string;
    sources?: string[];
    artifactsDir?: string;
    outputDir?: string;
    output?: string;
    overrides?: Override[];
    libMap?: {
        [soource: string]: string;
    };
    flattenFiles?: string[];
}
export declare function bundle(solc: Types.ISolc, storage: Types.IStorage, config: Config, RootPath: string): Promise<void>;
export {};
