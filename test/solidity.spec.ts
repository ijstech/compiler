import 'mocha'
import * as assert from 'assert'
import * as Utils from './utils';
import * as Sol from '../src/solCompile';
import * as Types from '../src/types';
import {Storage} from '../cli/src/storage';
import {Solc} from '../cli/src/solc';

const RootPath = process.cwd();

describe('Solidity', async function () {
    this.timeout(600000);
    let solc: Types.ISolc
    let storage: Types.IStorage;
    before(() => {
        solc = new Solc();
        storage = new Storage(RootPath);        
    });
    it('old', async () => {
        await Sol.bundle(solc, storage, <any>{
            "version": "0.8.17",
            "optimizerRuns": 999999,
            "sourceDir": "test/solidity/contracts",
            "outputDir": "test/solidity/src/contracts",
            "outputObjects": "bytecode"
        }, RootPath);
    });
    it('default', async () => {
        await Sol.bundle(solc, storage, {
            "version": "0.8.17",
            "optimizerRuns": 999999,
            "sourceDir": "test/solidity/contracts",
            "outputDir": "test/solidity/src/default"
        }, RootPath);
    });
    it('both', async () => {
        await Sol.bundle(solc, storage, {
            "version": "0.8.17",
            "optimizerRuns": 999999,
            "sourceDir": "test/solidity/contracts",
            "outputDir": "test/solidity/src/both",
            "outputOptions": {"bytecode": true, "abi": true}
        }, RootPath);
    });
    it('abi', async () => {
        await Sol.bundle(solc, storage, {
            "version": "0.8.17",
            "optimizerRuns": 999999,
            "sourceDir": "test/solidity/contracts",
            "outputDir": "test/solidity/src/abi",
            "outputOptions": {"abi": true}
        }, RootPath);
    });
    it('abi_only', async () => {
        await Sol.bundle(solc, storage, {
            "version": "0.8.17",
            "optimizerRuns": 999999,
            "sourceDir": "test/solidity/contracts",
            "outputDir": "test/solidity/src/abi_only",
            "outputOptions": {"abi": true, "bytecode": false}
        }, RootPath);
    });
    it('bytecode', async () => {
        await Sol.bundle(solc, storage, {
            "version": "0.8.17",
            "optimizerRuns": 999999,
            "sourceDir": "test/solidity/contracts",
            "outputDir": "test/solidity/src/bytecode",
            "outputOptions": {"bytecode": true}
        }, RootPath);
    });
    it('bytecode_only', async () => {
        await Sol.bundle(solc, storage, {
            "version": "0.8.17",
            "optimizerRuns": 999999,
            "sourceDir": "test/solidity/contracts",
            "outputDir": "test/solidity/src/bytecode_only",
            "outputOptions": {"bytecode": true, "abi": false}
        }, RootPath);
    });
    it('no_abi', async () => {
        await Sol.bundle(solc, storage, {
            "version": "0.8.17",
            "optimizerRuns": 999999,
            "sourceDir": "test/solidity/contracts",
            "outputDir": "test/solidity/src/no_abi",
            "outputOptions": {"abi": false}
        }, RootPath);
    });
    it('no_bytecode', async () => {
        await Sol.bundle(solc, storage, {
            "version": "0.8.17",
            "optimizerRuns": 999999,
            "sourceDir": "test/solidity/contracts",
            "outputDir": "test/solidity/src/no_bytecode",
            "outputOptions": {"bytecode": false}
        }, RootPath);
    });
    it('no_no', async () => {
        await Sol.bundle(solc, storage, {
            "version": "0.8.17",
            "optimizerRuns": 999999,
            "sourceDir": "test/solidity/contracts",
            "outputDir": "test/solidity/src/no_no",
            "outputOptions": {"abi": false, "bytecode": false}
        }, RootPath);
    });
    it('txData', async () => {
        await Sol.bundle(solc, storage, {
            "version": "0.8.17",
            "optimizerRuns": 999999,
            "sourceDir": "test/solidity/contracts",
            "outputDir": "test/solidity/src/txData",
            "outputOptions": {"txData": true}
        }, RootPath);
    });
    it('batchCall', async () => {
        await Sol.bundle(solc, storage, {
            "version": "0.8.17",
            "optimizerRuns": 999999,
            "sourceDir": "test/solidity/contracts",
            "outputDir": "test/solidity/src/batchCall",
            "outputOptions": {"batchCall": true}
        }, RootPath);
    });
    it('overrides', async () => {
        await Sol.bundle(solc, storage, {
            "version": "0.8.17",
            "optimizerRuns": 999999,
            "sourceDir": "test/solidity/contracts2",
            "outputDir": "test/solidity/src/overrides",
            "overrides": [{
                "sources":["WETH9.sol"],
                "version": "0.4.26",
                "optimizerRuns": 1000,
            }]
        }, RootPath);
    });
});
