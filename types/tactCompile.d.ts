/// <reference types="node" />
import * as Types from './types';
import { Config } from '@ijstech/tact';
declare function compileTactContract(storage: Types.IStorage, config: Config): Promise<Map<string, Buffer> | undefined>;
export { compileTactContract };
