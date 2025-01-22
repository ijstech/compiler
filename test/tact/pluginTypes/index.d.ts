/// <amd-module name="@scom/scom-tact/contracts/sample_SampleTactContract.ts" />
declare module "@scom/scom-tact/contracts/sample_SampleTactContract.ts" {
    import { Cell, Slice, Address, Builder, ContractProvider, Sender, Contract, ContractABI } from '@scom/ton-core';
    export type StateInit = {
        $$type: 'StateInit';
        code: Cell;
        data: Cell;
    };
    export function storeStateInit(src: StateInit): (builder: Builder) => void;
    export function loadStateInit(slice: Slice): {
        $$type: "StateInit";
        code: Cell;
        data: Cell;
    };
    export type StdAddress = {
        $$type: 'StdAddress';
        workchain: bigint;
        address: bigint;
    };
    export function storeStdAddress(src: StdAddress): (builder: Builder) => void;
    export function loadStdAddress(slice: Slice): {
        $$type: "StdAddress";
        workchain: bigint;
        address: bigint;
    };
    export type VarAddress = {
        $$type: 'VarAddress';
        workchain: bigint;
        address: Slice;
    };
    export function storeVarAddress(src: VarAddress): (builder: Builder) => void;
    export function loadVarAddress(slice: Slice): {
        $$type: "VarAddress";
        workchain: bigint;
        address: Slice;
    };
    export type Context = {
        $$type: 'Context';
        bounced: boolean;
        sender: Address;
        value: bigint;
        raw: Slice;
    };
    export function storeContext(src: Context): (builder: Builder) => void;
    export function loadContext(slice: Slice): {
        $$type: "Context";
        bounced: boolean;
        sender: any;
        value: bigint;
        raw: Slice;
    };
    export type SendParameters = {
        $$type: 'SendParameters';
        bounce: boolean;
        to: Address;
        value: bigint;
        mode: bigint;
        body: Cell | null;
        code: Cell | null;
        data: Cell | null;
    };
    export function storeSendParameters(src: SendParameters): (builder: Builder) => void;
    export function loadSendParameters(slice: Slice): {
        $$type: "SendParameters";
        bounce: boolean;
        to: any;
        value: bigint;
        mode: bigint;
        body: Cell;
        code: Cell;
        data: Cell;
    };
    export type Deploy = {
        $$type: 'Deploy';
        queryId: bigint;
    };
    export function storeDeploy(src: Deploy): (builder: Builder) => void;
    export function loadDeploy(slice: Slice): {
        $$type: "Deploy";
        queryId: bigint;
    };
    export type DeployOk = {
        $$type: 'DeployOk';
        queryId: bigint;
    };
    export function storeDeployOk(src: DeployOk): (builder: Builder) => void;
    export function loadDeployOk(slice: Slice): {
        $$type: "DeployOk";
        queryId: bigint;
    };
    export type FactoryDeploy = {
        $$type: 'FactoryDeploy';
        queryId: bigint;
        cashback: Address;
    };
    export function storeFactoryDeploy(src: FactoryDeploy): (builder: Builder) => void;
    export function loadFactoryDeploy(slice: Slice): {
        $$type: "FactoryDeploy";
        queryId: bigint;
        cashback: any;
    };
    export type Add = {
        $$type: 'Add';
        amount: bigint;
    };
    export function storeAdd(src: Add): (builder: Builder) => void;
    export function loadAdd(slice: Slice): {
        $$type: "Add";
        amount: bigint;
    };
    export type SampleTactContract$Data = {
        $$type: 'SampleTactContract$Data';
        owner: Address;
        counter: bigint;
    };
    export function storeSampleTactContract$Data(src: SampleTactContract$Data): (builder: Builder) => void;
    export function loadSampleTactContract$Data(slice: Slice): {
        $$type: "SampleTactContract$Data";
        owner: any;
        counter: bigint;
    };
    export const SampleTactContract_getterMapping: {
        [key: string]: string;
    };
    export class SampleTactContract implements Contract {
        static init(owner: Address): Promise<{
            code: Cell;
            data: Cell;
        }>;
        static fromInit(owner: Address): Promise<SampleTactContract>;
        static fromAddress(address: Address): SampleTactContract;
        readonly address: Address;
        readonly init?: {
            code: Cell;
            data: Cell;
        };
        readonly abi: ContractABI;
        private constructor();
        send(provider: ContractProvider, via: Sender, args: {
            value: bigint;
            bounce?: boolean | null | undefined;
        }, message: Add | "increment" | Deploy): Promise<void>;
        getCounter(provider: ContractProvider): Promise<bigint>;
    }
}
/// <amd-module name="@scom/scom-tact" />
declare module "@scom/scom-tact" {
    import * as Contracts from "@scom/scom-tact/contracts/sample_SampleTactContract.ts";
    export { Contracts };
}
