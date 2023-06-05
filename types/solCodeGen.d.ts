/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
interface Type {
    name: string;
    type: string;
    components?: Type[];
    internalType?: string;
}
interface Item {
    name: string;
    type: string;
    stateMutability: string;
    inputs?: Type[];
    outputs?: Type[];
}
export interface IUserDefinedOptions {
    outputAbi: boolean;
    outputBytecode: boolean;
    hasBatchCall?: boolean;
    hasTxData?: boolean;
}
export default function (name: string, abiPath: string, abi: Item[], options: IUserDefinedOptions): string;
export {};
