/// <reference types="node" />
import * as Types from './types';
import { Config } from './lib/tact-compiler';
declare function compileTactContract(storage: Types.IStorage, config: Config): Promise<Map<string, Buffer> | undefined>;
export { compileTactContract };
