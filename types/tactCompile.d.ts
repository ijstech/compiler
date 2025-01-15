/// <reference types="node" />
import * as Types from './types';
declare function compileTactContract(storage: Types.IStorage, config: any): Promise<Map<string, Buffer> | undefined>;
export { compileTactContract };
