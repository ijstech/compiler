import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./WETH9.json";
export interface IApproveParams {guy:string;wad:number|BigNumber}
export interface ITransferFromParams {src:string;dst:string;wad:number|BigNumber}
export interface ITransferParams {dst:string;wad:number|BigNumber}
export interface IAllowanceParams {param1:string;param2:string}
export class WETH9 extends _Contract{
    static _abi: any = Bin.abi;
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(options?: TransactionOptions): Promise<string>{
        return this.__deploy([], options);
    }
    parseApprovalEvent(receipt: TransactionReceipt): WETH9.ApprovalEvent[]{
        return this.parseEvents(receipt, "Approval").map(e=>this.decodeApprovalEvent(e));
    }
    decodeApprovalEvent(event: Event): WETH9.ApprovalEvent{
        let result = event.data;
        return {
            src: result.src,
            guy: result.guy,
            wad: new BigNumber(result.wad),
            _event: event
        };
    }
    parseTransferEvent(receipt: TransactionReceipt): WETH9.TransferEvent[]{
        return this.parseEvents(receipt, "Transfer").map(e=>this.decodeTransferEvent(e));
    }
    decodeTransferEvent(event: Event): WETH9.TransferEvent{
        let result = event.data;
        return {
            src: result.src,
            dst: result.dst,
            wad: new BigNumber(result.wad),
            _event: event
        };
    }
    parseDepositEvent(receipt: TransactionReceipt): WETH9.DepositEvent[]{
        return this.parseEvents(receipt, "Deposit").map(e=>this.decodeDepositEvent(e));
    }
    decodeDepositEvent(event: Event): WETH9.DepositEvent{
        let result = event.data;
        return {
            dst: result.dst,
            wad: new BigNumber(result.wad),
            _event: event
        };
    }
    parseWithdrawalEvent(receipt: TransactionReceipt): WETH9.WithdrawalEvent[]{
        return this.parseEvents(receipt, "Withdrawal").map(e=>this.decodeWithdrawalEvent(e));
    }
    decodeWithdrawalEvent(event: Event): WETH9.WithdrawalEvent{
        let result = event.data;
        return {
            src: result.src,
            wad: new BigNumber(result.wad),
            _event: event
        };
    }
    name: {
        (options?: TransactionOptions): Promise<string>;
    }
    approve: {
        (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IApproveParams, options?: TransactionOptions) => Promise<boolean>;
    }
    totalSupply: {
        (options?: TransactionOptions): Promise<BigNumber>;
    }
    transferFrom: {
        (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<boolean>;
    }
    withdraw: {
        (wad:number|BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (wad:number|BigNumber, options?: TransactionOptions) => Promise<void>;
    }
    decimals: {
        (options?: TransactionOptions): Promise<BigNumber>;
    }
    balanceOf: {
        (param1:string, options?: TransactionOptions): Promise<BigNumber>;
    }
    symbol: {
        (options?: TransactionOptions): Promise<string>;
    }
    transfer: {
        (params: ITransferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ITransferParams, options?: TransactionOptions) => Promise<boolean>;
    }
    deposit: {
        (options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (options?: number|BigNumber|TransactionOptions) => Promise<void>;
    }
    allowance: {
        (params: IAllowanceParams, options?: TransactionOptions): Promise<BigNumber>;
    }
    private assign(){
        let name_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('name',[],options);
            return result;
        }
        this.name = name_call
        let totalSupply_call = async (options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('totalSupply',[],options);
            return new BigNumber(result);
        }
        this.totalSupply = totalSupply_call
        let decimals_call = async (options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('decimals',[],options);
            return new BigNumber(result);
        }
        this.decimals = decimals_call
        let balanceOf_call = async (param1:string, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('balanceOf',[param1],options);
            return new BigNumber(result);
        }
        this.balanceOf = balanceOf_call
        let symbol_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('symbol',[],options);
            return result;
        }
        this.symbol = symbol_call
        let allowanceParams = (params: IAllowanceParams) => [params.param1,params.param2];
        let allowance_call = async (params: IAllowanceParams, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('allowance',allowanceParams(params),options);
            return new BigNumber(result);
        }
        this.allowance = allowance_call
        let approveParams = (params: IApproveParams) => [params.guy,this.wallet.utils.toString(params.wad)];
        let approve_send = async (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('approve',approveParams(params),options);
            return result;
        }
        let approve_call = async (params: IApproveParams, options?: TransactionOptions): Promise<boolean> => {
            let result = await this.call('approve',approveParams(params),options);
            return result;
        }
        this.approve = Object.assign(approve_send, {
            call:approve_call
        });
        let transferFromParams = (params: ITransferFromParams) => [params.src,params.dst,this.wallet.utils.toString(params.wad)];
        let transferFrom_send = async (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('transferFrom',transferFromParams(params),options);
            return result;
        }
        let transferFrom_call = async (params: ITransferFromParams, options?: TransactionOptions): Promise<boolean> => {
            let result = await this.call('transferFrom',transferFromParams(params),options);
            return result;
        }
        this.transferFrom = Object.assign(transferFrom_send, {
            call:transferFrom_call
        });
        let withdraw_send = async (wad:number|BigNumber, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('withdraw',[this.wallet.utils.toString(wad)],options);
            return result;
        }
        let withdraw_call = async (wad:number|BigNumber, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('withdraw',[this.wallet.utils.toString(wad)],options);
            return;
        }
        this.withdraw = Object.assign(withdraw_send, {
            call:withdraw_call
        });
        let transferParams = (params: ITransferParams) => [params.dst,this.wallet.utils.toString(params.wad)];
        let transfer_send = async (params: ITransferParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('transfer',transferParams(params),options);
            return result;
        }
        let transfer_call = async (params: ITransferParams, options?: TransactionOptions): Promise<boolean> => {
            let result = await this.call('transfer',transferParams(params),options);
            return result;
        }
        this.transfer = Object.assign(transfer_send, {
            call:transfer_call
        });
        let deposit_send = async (options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('deposit',[],options);
            return result;
        }
        let deposit_call = async (options?: number|BigNumber|TransactionOptions): Promise<void> => {
            let result = await this.call('deposit',[],options);
            return;
        }
        this.deposit = Object.assign(deposit_send, {
            call:deposit_call
        });
    }
}
export module WETH9{
    export interface ApprovalEvent {src:string,guy:string,wad:BigNumber,_event:Event}
    export interface TransferEvent {src:string,dst:string,wad:BigNumber,_event:Event}
    export interface DepositEvent {dst:string,wad:BigNumber,_event:Event}
    export interface WithdrawalEvent {src:string,wad:BigNumber,_event:Event}
}