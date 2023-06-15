import {IWorkerPlugin, ISession} from '@ijstech/plugin';
// import {Contracts} from '@scom/scom-domain-contract';
import wallet from '@ijstech/wallet';
import {hello} from './hello';

export default class Worker implements IWorkerPlugin {    
    async process(session: ISession, data?: any): Promise<any> {
        // let contract: Contracts.Domain;
        // contract = new Contracts.Domain(wallet)
        let chainId = await wallet.getChainId();
        hello('chainId: ' + chainId);
        console.dir('### data ###')
        console.dir(data)
        console.dir('### session.params ###')
        console.dir(session.params);
        session.params.updated = new Date();
    };
};