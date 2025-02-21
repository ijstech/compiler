import * as Types from './types';
import { Config, ConfigProject } from './lib/tact-compiler';
declare function buildTact(storage: Types.IStorage, projectConfig: ConfigProject): Promise<Record<string, string> | null>;
declare function compileTactContract(storage: Types.IStorage, config: Config): Promise<Record<string, string>>;
export { compileTactContract, buildTact, Config, ConfigProject };
