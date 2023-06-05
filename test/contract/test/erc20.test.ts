import 'mocha';
import Ganache from "ganache";
import {Wallet} from "@ijstech/eth-wallet";
import {Contracts, deploy} from "../src/index";
import assert from "assert";

describe('##Contracts', function() {
    let accounts: string[];
    let wallet: Wallet;
    before(async ()=>{
        let provider = Ganache.provider({
            logging: {
                logger: {
                    log: () => { }
                }
            }
        });
        wallet = new Wallet(provider);
        accounts = await wallet.accounts;
        wallet.defaultAccount = accounts[0];
    })
    it('erc20', async function() {
        let result = await deploy(wallet, {initSupply: '1000'}, (msg: string)=>{
            console.dir(msg)
        });
        let erc20 = new Contracts.Demo(wallet, result.erc20);
        console.dir('#deployed ERC20 address: ' + result.erc20);
        await erc20.transfer({
            to: accounts[1],
            amount: 100
        });
        let balance0 = (await erc20.balanceOf(accounts[0])).toNumber()
        let balance1 = (await erc20.balanceOf(accounts[1])).toNumber()
        assert.strictEqual(balance0, 900)
        assert.strictEqual(balance1, 100)
    });
});