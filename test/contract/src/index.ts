import * as Contracts from './contracts/index';
export {Contracts};
import {IWallet, BigNumber} from '@ijstech/eth-wallet';

export interface IDeployOptions {
    initSupply?: string;
};
export interface IDeployResult {
    erc20: string;
};
var progressHandler: any;
export var DefaultDeployOptions: IDeployOptions = {
    initSupply: '10000'
};
export async function deploy(wallet: IWallet, options: IDeployOptions, onProgress:(msg:string)=>void): Promise<IDeployResult>{
    let erc20 = new Contracts.Demo(wallet);
    onProgress('Deploy ERC20');
    let address = await erc20.deploy();
    onProgress('ERC20 deployed ' + address)
    if (options && options.initSupply){
        onProgress('Mint initial supply ' + options.initSupply)
        let value = new BigNumber(options.initSupply);
        let result = await erc20.mint(value);
        onProgress('Transaction # ' + result.transactionHash);
    };
    return {
        erc20: address
    };
};
export default {
    Contracts,
    deploy,
    DefaultDeployOptions
};