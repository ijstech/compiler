import * as Contracts from './contracts/index';
export { Contracts };
import { IWallet } from '@ijstech/eth-wallet';
export interface IDeployOptions {
    initSupply?: string;
}
export interface IDeployResult {
    erc20: string;
}
export declare var DefaultDeployOptions: IDeployOptions;
export declare function deploy(wallet: IWallet, options: IDeployOptions, onProgress: (msg: string) => void): Promise<IDeployResult>;
declare const _default: {
    Contracts: typeof Contracts;
    deploy: typeof deploy;
    DefaultDeployOptions: IDeployOptions;
};
export default _default;
