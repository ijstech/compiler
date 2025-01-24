/// <reference types="node" />
import * as Types from './types';
import { Config, ConfigProject } from './lib/tact-compiler';
declare function buildTact(storage: Types.IStorage, projectConfig: ConfigProject): Promise<Map<string, Buffer> | null>;
declare function compileTactContract(storage: Types.IStorage, config: Config): Promise<Map<string, Buffer> | undefined>;
export { compileTactContract, buildTact, Config, ConfigProject };
