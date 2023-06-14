define("@scom/scom-domain-contract/contracts/@openzeppelin/contracts/token/ERC20/ERC20.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-domain-contract/contracts/@openzeppelin/contracts/token/ERC20/ERC20.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }
        ],
        "bytecode": "60806040523480156200001157600080fd5b5060405162000e0f38038062000e0f83398101604081905262000034916200011f565b600362000042838262000218565b50600462000051828262000218565b505050620002e4565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200008257600080fd5b81516001600160401b03808211156200009f576200009f6200005a565b604051601f8301601f19908116603f01168101908282118183101715620000ca57620000ca6200005a565b81604052838152602092508683858801011115620000e757600080fd5b600091505b838210156200010b5785820183015181830184015290820190620000ec565b600093810190920192909252949350505050565b600080604083850312156200013357600080fd5b82516001600160401b03808211156200014b57600080fd5b620001598683870162000070565b935060208501519150808211156200017057600080fd5b506200017f8582860162000070565b9150509250929050565b600181811c908216806200019e57607f821691505b602082108103620001bf57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200021357600081815260208120601f850160051c81016020861015620001ee5750805b601f850160051c820191505b818110156200020f57828155600101620001fa565b5050505b505050565b81516001600160401b038111156200023457620002346200005a565b6200024c8162000245845462000189565b84620001c5565b602080601f8311600181146200028457600084156200026b5750858301515b600019600386901b1c1916600185901b1785556200020f565b600085815260208120601f198616915b82811015620002b55788860151825594840194600190910190840162000294565b5085821015620002d45787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610b1b80620002f46000396000f3fe608060405234801561001057600080fd5b50600436106100c95760003560e01c80633950935111610081578063a457c2d71161005b578063a457c2d714610194578063a9059cbb146101a7578063dd62ed3e146101ba57600080fd5b8063395093511461014357806370a082311461015657806395d89b411461018c57600080fd5b806318160ddd116100b257806318160ddd1461010f57806323b872dd14610121578063313ce5671461013457600080fd5b806306fdde03146100ce578063095ea7b3146100ec575b600080fd5b6100d6610200565b6040516100e39190610908565b60405180910390f35b6100ff6100fa36600461099d565b610292565b60405190151581526020016100e3565b6002545b6040519081526020016100e3565b6100ff61012f3660046109c7565b6102ac565b604051601281526020016100e3565b6100ff61015136600461099d565b6102d0565b610113610164366004610a03565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b6100d661031c565b6100ff6101a236600461099d565b61032b565b6100ff6101b536600461099d565b610401565b6101136101c8366004610a25565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b60606003805461020f90610a58565b80601f016020809104026020016040519081016040528092919081815260200182805461023b90610a58565b80156102885780601f1061025d57610100808354040283529160200191610288565b820191906000526020600020905b81548152906001019060200180831161026b57829003601f168201915b5050505050905090565b6000336102a081858561040f565b60019150505b92915050565b6000336102ba8582856105c2565b6102c5858585610699565b506001949350505050565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff871684529091528120549091906102a09082908690610317908790610aab565b61040f565b60606004805461020f90610a58565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168452909152812054909190838110156103f4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6102c5828686840361040f565b6000336102a0818585610699565b73ffffffffffffffffffffffffffffffffffffffff83166104b1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f726573730000000000000000000000000000000000000000000000000000000060648201526084016103eb565b73ffffffffffffffffffffffffffffffffffffffff8216610554576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f737300000000000000000000000000000000000000000000000000000000000060648201526084016103eb565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff8381166000908152600160209081526040808320938616835292905220547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146106935781811015610686576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016103eb565b610693848484840361040f565b50505050565b73ffffffffffffffffffffffffffffffffffffffff831661073c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f647265737300000000000000000000000000000000000000000000000000000060648201526084016103eb565b73ffffffffffffffffffffffffffffffffffffffff82166107df576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f657373000000000000000000000000000000000000000000000000000000000060648201526084016103eb565b73ffffffffffffffffffffffffffffffffffffffff831660009081526020819052604090205481811015610895576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e6365000000000000000000000000000000000000000000000000000060648201526084016103eb565b73ffffffffffffffffffffffffffffffffffffffff848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a3610693565b600060208083528351808285015260005b8181101561093557858101830151858201604001528201610919565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461099857600080fd5b919050565b600080604083850312156109b057600080fd5b6109b983610974565b946020939093013593505050565b6000806000606084860312156109dc57600080fd5b6109e584610974565b92506109f360208501610974565b9150604084013590509250925092565b600060208284031215610a1557600080fd5b610a1e82610974565b9392505050565b60008060408385031215610a3857600080fd5b610a4183610974565b9150610a4f60208401610974565b90509250929050565b600181811c90821680610a6c57607f821691505b602082108103610aa5577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b808201808211156102a6577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea26469706673582212200b1c8209991f9f505c1b93652182a21c393f29b72d5b8e98cb86249fd9872e6664736f6c63430008110033"
    };
});
define("@scom/scom-domain-contract/contracts/@openzeppelin/contracts/token/ERC20/ERC20.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-domain-contract/contracts/@openzeppelin/contracts/token/ERC20/ERC20.json.ts"], function (require, exports, eth_contract_1, ERC20_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ERC20 = void 0;
    class ERC20 extends eth_contract_1.Contract {
        constructor(wallet, address) {
            super(wallet, address, ERC20_json_1.default.abi, ERC20_json_1.default.bytecode);
            this.assign();
        }
        deploy(params, options) {
            return this.__deploy([params.name, params.symbol], options);
        }
        parseApprovalEvent(receipt) {
            return this.parseEvents(receipt, "Approval").map(e => this.decodeApprovalEvent(e));
        }
        decodeApprovalEvent(event) {
            let result = event.data;
            return {
                owner: result.owner,
                spender: result.spender,
                value: new eth_contract_1.BigNumber(result.value),
                _event: event
            };
        }
        parseTransferEvent(receipt) {
            return this.parseEvents(receipt, "Transfer").map(e => this.decodeTransferEvent(e));
        }
        decodeTransferEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                to: result.to,
                value: new eth_contract_1.BigNumber(result.value),
                _event: event
            };
        }
        assign() {
            let allowanceParams = (params) => [params.owner, params.spender];
            let allowance_call = async (params, options) => {
                let result = await this.call('allowance', allowanceParams(params), options);
                return new eth_contract_1.BigNumber(result);
            };
            this.allowance = allowance_call;
            let balanceOf_call = async (account, options) => {
                let result = await this.call('balanceOf', [account], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.balanceOf = balanceOf_call;
            let decimals_call = async (options) => {
                let result = await this.call('decimals', [], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.decimals = decimals_call;
            let name_call = async (options) => {
                let result = await this.call('name', [], options);
                return result;
            };
            this.name = name_call;
            let symbol_call = async (options) => {
                let result = await this.call('symbol', [], options);
                return result;
            };
            this.symbol = symbol_call;
            let totalSupply_call = async (options) => {
                let result = await this.call('totalSupply', [], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.totalSupply = totalSupply_call;
            let approveParams = (params) => [params.spender, this.wallet.utils.toString(params.amount)];
            let approve_send = async (params, options) => {
                let result = await this.send('approve', approveParams(params), options);
                return result;
            };
            let approve_call = async (params, options) => {
                let result = await this.call('approve', approveParams(params), options);
                return result;
            };
            this.approve = Object.assign(approve_send, {
                call: approve_call
            });
            let decreaseAllowanceParams = (params) => [params.spender, this.wallet.utils.toString(params.subtractedValue)];
            let decreaseAllowance_send = async (params, options) => {
                let result = await this.send('decreaseAllowance', decreaseAllowanceParams(params), options);
                return result;
            };
            let decreaseAllowance_call = async (params, options) => {
                let result = await this.call('decreaseAllowance', decreaseAllowanceParams(params), options);
                return result;
            };
            this.decreaseAllowance = Object.assign(decreaseAllowance_send, {
                call: decreaseAllowance_call
            });
            let increaseAllowanceParams = (params) => [params.spender, this.wallet.utils.toString(params.addedValue)];
            let increaseAllowance_send = async (params, options) => {
                let result = await this.send('increaseAllowance', increaseAllowanceParams(params), options);
                return result;
            };
            let increaseAllowance_call = async (params, options) => {
                let result = await this.call('increaseAllowance', increaseAllowanceParams(params), options);
                return result;
            };
            this.increaseAllowance = Object.assign(increaseAllowance_send, {
                call: increaseAllowance_call
            });
            let transferParams = (params) => [params.to, this.wallet.utils.toString(params.amount)];
            let transfer_send = async (params, options) => {
                let result = await this.send('transfer', transferParams(params), options);
                return result;
            };
            let transfer_call = async (params, options) => {
                let result = await this.call('transfer', transferParams(params), options);
                return result;
            };
            this.transfer = Object.assign(transfer_send, {
                call: transfer_call
            });
            let transferFromParams = (params) => [params.from, params.to, this.wallet.utils.toString(params.amount)];
            let transferFrom_send = async (params, options) => {
                let result = await this.send('transferFrom', transferFromParams(params), options);
                return result;
            };
            let transferFrom_call = async (params, options) => {
                let result = await this.call('transferFrom', transferFromParams(params), options);
                return result;
            };
            this.transferFrom = Object.assign(transferFrom_send, {
                call: transferFrom_call
            });
        }
    }
    exports.ERC20 = ERC20;
    ERC20._abi = ERC20_json_1.default.abi;
});
define("@scom/scom-domain-contract/contracts/@openzeppelin/contracts/token/ERC721/ERC721.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-domain-contract/contracts/@openzeppelin/contracts/token/ERC721/ERC721.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" },
            { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
        ],
        "bytecode": "60806040523480156200001157600080fd5b5060405162001bac38038062001bac83398101604081905262000034916200011f565b600062000042838262000218565b50600162000051828262000218565b505050620002e4565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200008257600080fd5b81516001600160401b03808211156200009f576200009f6200005a565b604051601f8301601f19908116603f01168101908282118183101715620000ca57620000ca6200005a565b81604052838152602092508683858801011115620000e757600080fd5b600091505b838210156200010b5785820183015181830184015290820190620000ec565b600093810190920192909252949350505050565b600080604083850312156200013357600080fd5b82516001600160401b03808211156200014b57600080fd5b620001598683870162000070565b935060208501519150808211156200017057600080fd5b506200017f8582860162000070565b9150509250929050565b600181811c908216806200019e57607f821691505b602082108103620001bf57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200021357600081815260208120601f850160051c81016020861015620001ee5750805b601f850160051c820191505b818110156200020f57828155600101620001fa565b5050505b505050565b81516001600160401b038111156200023457620002346200005a565b6200024c8162000245845462000189565b84620001c5565b602080601f8311600181146200028457600084156200026b5750858301515b600019600386901b1c1916600185901b1785556200020f565b600085815260208120601f198616915b82811015620002b55788860151825594840194600190910190840162000294565b5085821015620002d45787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6118b880620002f46000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101d0578063b88d4fde146101e3578063c87b56dd146101f6578063e985e9c51461020957600080fd5b80636352211e1461019457806370a08231146101a757806395d89b41146101c857600080fd5b8063095ea7b3116100bd578063095ea7b31461015957806323b872dd1461016e57806342842e0e1461018157600080fd5b806301ffc9a7146100e457806306fdde031461010c578063081812fc14610121575b600080fd5b6100f76100f236600461144c565b610252565b60405190151581526020015b60405180910390f35b610114610337565b60405161010391906114d7565b61013461012f3660046114ea565b6103c9565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610103565b61016c61016736600461152c565b6103fd565b005b61016c61017c366004611556565b6105b9565b61016c61018f366004611556565b61065a565b6101346101a23660046114ea565b610675565b6101ba6101b5366004611592565b610701565b604051908152602001610103565b6101146107cf565b61016c6101de3660046115ad565b6107de565b61016c6101f1366004611618565b6107ed565b6101146102043660046114ea565b610895565b6100f7610217366004611712565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260056020908152604080832093909416825291909152205460ff1690565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd0000000000000000000000000000000000000000000000000000000014806102e557507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b8061033157507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60606000805461034690611745565b80601f016020809104026020016040519081016040528092919081815260200182805461037290611745565b80156103bf5780601f10610394576101008083540402835291602001916103bf565b820191906000526020600020905b8154815290600101906020018083116103a257829003601f168201915b5050505050905090565b60006103d482610909565b5060009081526004602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b600061040882610675565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036104ca576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f720000000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff8216148061051e575073ffffffffffffffffffffffffffffffffffffffff8116600090815260056020908152604080832033845290915290205460ff165b6105aa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c00000060648201526084016104c1565b6105b48383610997565b505050565b6105c33382610a37565b61064f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602d60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206f7220617070726f7665640000000000000000000000000000000000000060648201526084016104c1565b6105b4838383610af7565b6105b4838383604051806020016040528060008152506107ed565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff1680610331576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016104c1565b600073ffffffffffffffffffffffffffffffffffffffff82166107a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e6572000000000000000000000000000000000000000000000060648201526084016104c1565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205490565b60606001805461034690611745565b6107e9338383610dff565b5050565b6107f73383610a37565b610883576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602d60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206f7220617070726f7665640000000000000000000000000000000000000060648201526084016104c1565b61088f84848484610f2c565b50505050565b60606108a082610909565b60006108b760408051602081019091526000815290565b905060008151116108d75760405180602001604052806000815250610902565b806108e184610fcf565b6040516020016108f2929190611798565b6040516020818303038152906040525b9392505050565b60008181526002602052604090205473ffffffffffffffffffffffffffffffffffffffff16610994576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016104c1565b50565b600081815260046020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff841690811790915581906109f182610675565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610a4383610675565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610ab1575073ffffffffffffffffffffffffffffffffffffffff80821660009081526005602090815260408083209388168352929052205460ff165b80610aef57508373ffffffffffffffffffffffffffffffffffffffff16610ad7846103c9565b73ffffffffffffffffffffffffffffffffffffffff16145b949350505050565b8273ffffffffffffffffffffffffffffffffffffffff16610b1782610675565b73ffffffffffffffffffffffffffffffffffffffff1614610bba576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e657200000000000000000000000000000000000000000000000000000060648201526084016104c1565b73ffffffffffffffffffffffffffffffffffffffff8216610c5c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f726573730000000000000000000000000000000000000000000000000000000060648201526084016104c1565b610c69838383600161108d565b8273ffffffffffffffffffffffffffffffffffffffff16610c8982610675565b73ffffffffffffffffffffffffffffffffffffffff1614610d2c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e657200000000000000000000000000000000000000000000000000000060648201526084016104c1565b600081815260046020908152604080832080547fffffffffffffffffffffffff000000000000000000000000000000000000000090811690915573ffffffffffffffffffffffffffffffffffffffff8781168086526003855283862080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610e94576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016104c1565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526005602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610f37848484610af7565b610f4384848484611149565b61088f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016104c1565b60606000610fdc8361133c565b600101905060008167ffffffffffffffff811115610ffc57610ffc6115e9565b6040519080825280601f01601f191660200182016040528015611026576020820181803683370190505b5090508181016020015b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff017f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a850494508461103057509392505050565b600181111561088f5773ffffffffffffffffffffffffffffffffffffffff8416156110ed5773ffffffffffffffffffffffffffffffffffffffff8416600090815260036020526040812080548392906110e79084906117f6565b90915550505b73ffffffffffffffffffffffffffffffffffffffff83161561088f5773ffffffffffffffffffffffffffffffffffffffff83166000908152600360205260408120805483929061113e908490611809565b909155505050505050565b600073ffffffffffffffffffffffffffffffffffffffff84163b15611331576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063150b7a02906111c090339089908890889060040161181c565b6020604051808303816000875af1925050508015611219575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820190925261121691810190611865565b60015b6112e6573d808015611247576040519150601f19603f3d011682016040523d82523d6000602084013e61124c565b606091505b5080516000036112de576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016104c1565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050610aef565b506001949350505050565b6000807a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611385577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000830492506040015b6d04ee2d6d415b85acef810000000083106113b1576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc1000083106113cf57662386f26fc10000830492506010015b6305f5e10083106113e7576305f5e100830492506008015b61271083106113fb57612710830492506004015b6064831061140d576064830492506002015b600a83106103315760010192915050565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461099457600080fd5b60006020828403121561145e57600080fd5b81356109028161141e565b60005b8381101561148457818101518382015260200161146c565b50506000910152565b600081518084526114a5816020860160208601611469565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b602081526000610902602083018461148d565b6000602082840312156114fc57600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461152757600080fd5b919050565b6000806040838503121561153f57600080fd5b61154883611503565b946020939093013593505050565b60008060006060848603121561156b57600080fd5b61157484611503565b925061158260208501611503565b9150604084013590509250925092565b6000602082840312156115a457600080fd5b61090282611503565b600080604083850312156115c057600080fd5b6115c983611503565b9150602083013580151581146115de57600080fd5b809150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806000806080858703121561162e57600080fd5b61163785611503565b935061164560208601611503565b925060408501359150606085013567ffffffffffffffff8082111561166957600080fd5b818701915087601f83011261167d57600080fd5b81358181111561168f5761168f6115e9565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156116d5576116d56115e9565b816040528281528a60208487010111156116ee57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561172557600080fd5b61172e83611503565b915061173c60208401611503565b90509250929050565b600181811c9082168061175957607f821691505b602082108103611792577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b600083516117aa818460208801611469565b8351908301906117be818360208801611469565b01949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b81810381811115610331576103316117c7565b80820180821115610331576103316117c7565b600073ffffffffffffffffffffffffffffffffffffffff80871683528086166020840152508360408301526080606083015261185b608083018461148d565b9695505050505050565b60006020828403121561187757600080fd5b81516109028161141e56fea2646970667358221220b60ba5c27738fea8c58559eb3870b9ecf5b4f71c4f4cc826f7da7dd3772a21ec64736f6c63430008110033"
    };
});
define("@scom/scom-domain-contract/contracts/@openzeppelin/contracts/token/ERC721/ERC721.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-domain-contract/contracts/@openzeppelin/contracts/token/ERC721/ERC721.json.ts"], function (require, exports, eth_contract_2, ERC721_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ERC721 = void 0;
    class ERC721 extends eth_contract_2.Contract {
        constructor(wallet, address) {
            super(wallet, address, ERC721_json_1.default.abi, ERC721_json_1.default.bytecode);
            this.assign();
        }
        deploy(params, options) {
            return this.__deploy([params.name, params.symbol], options);
        }
        parseApprovalEvent(receipt) {
            return this.parseEvents(receipt, "Approval").map(e => this.decodeApprovalEvent(e));
        }
        decodeApprovalEvent(event) {
            let result = event.data;
            return {
                owner: result.owner,
                approved: result.approved,
                tokenId: new eth_contract_2.BigNumber(result.tokenId),
                _event: event
            };
        }
        parseApprovalForAllEvent(receipt) {
            return this.parseEvents(receipt, "ApprovalForAll").map(e => this.decodeApprovalForAllEvent(e));
        }
        decodeApprovalForAllEvent(event) {
            let result = event.data;
            return {
                owner: result.owner,
                operator: result.operator,
                approved: result.approved,
                _event: event
            };
        }
        parseTransferEvent(receipt) {
            return this.parseEvents(receipt, "Transfer").map(e => this.decodeTransferEvent(e));
        }
        decodeTransferEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                to: result.to,
                tokenId: new eth_contract_2.BigNumber(result.tokenId),
                _event: event
            };
        }
        assign() {
            let balanceOf_call = async (owner, options) => {
                let result = await this.call('balanceOf', [owner], options);
                return new eth_contract_2.BigNumber(result);
            };
            this.balanceOf = balanceOf_call;
            let getApproved_call = async (tokenId, options) => {
                let result = await this.call('getApproved', [this.wallet.utils.toString(tokenId)], options);
                return result;
            };
            this.getApproved = getApproved_call;
            let isApprovedForAllParams = (params) => [params.owner, params.operator];
            let isApprovedForAll_call = async (params, options) => {
                let result = await this.call('isApprovedForAll', isApprovedForAllParams(params), options);
                return result;
            };
            this.isApprovedForAll = isApprovedForAll_call;
            let name_call = async (options) => {
                let result = await this.call('name', [], options);
                return result;
            };
            this.name = name_call;
            let ownerOf_call = async (tokenId, options) => {
                let result = await this.call('ownerOf', [this.wallet.utils.toString(tokenId)], options);
                return result;
            };
            this.ownerOf = ownerOf_call;
            let supportsInterface_call = async (interfaceId, options) => {
                let result = await this.call('supportsInterface', [interfaceId], options);
                return result;
            };
            this.supportsInterface = supportsInterface_call;
            let symbol_call = async (options) => {
                let result = await this.call('symbol', [], options);
                return result;
            };
            this.symbol = symbol_call;
            let tokenURI_call = async (tokenId, options) => {
                let result = await this.call('tokenURI', [this.wallet.utils.toString(tokenId)], options);
                return result;
            };
            this.tokenURI = tokenURI_call;
            let approveParams = (params) => [params.to, this.wallet.utils.toString(params.tokenId)];
            let approve_send = async (params, options) => {
                let result = await this.send('approve', approveParams(params), options);
                return result;
            };
            let approve_call = async (params, options) => {
                let result = await this.call('approve', approveParams(params), options);
                return;
            };
            this.approve = Object.assign(approve_send, {
                call: approve_call
            });
            let safeTransferFromParams = (params) => [params.from, params.to, this.wallet.utils.toString(params.tokenId)];
            let safeTransferFrom_send = async (params, options) => {
                let result = await this.send('safeTransferFrom', safeTransferFromParams(params), options);
                return result;
            };
            let safeTransferFrom_call = async (params, options) => {
                let result = await this.call('safeTransferFrom', safeTransferFromParams(params), options);
                return;
            };
            this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
                call: safeTransferFrom_call
            });
            let safeTransferFrom_1Params = (params) => [params.from, params.to, this.wallet.utils.toString(params.tokenId), this.wallet.utils.stringToBytes(params.data)];
            let safeTransferFrom_1_send = async (params, options) => {
                let result = await this.send('safeTransferFrom', safeTransferFrom_1Params(params), options);
                return result;
            };
            let safeTransferFrom_1_call = async (params, options) => {
                let result = await this.call('safeTransferFrom', safeTransferFrom_1Params(params), options);
                return;
            };
            this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
                call: safeTransferFrom_1_call
            });
            let setApprovalForAllParams = (params) => [params.operator, params.approved];
            let setApprovalForAll_send = async (params, options) => {
                let result = await this.send('setApprovalForAll', setApprovalForAllParams(params), options);
                return result;
            };
            let setApprovalForAll_call = async (params, options) => {
                let result = await this.call('setApprovalForAll', setApprovalForAllParams(params), options);
                return;
            };
            this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
                call: setApprovalForAll_call
            });
            let transferFromParams = (params) => [params.from, params.to, this.wallet.utils.toString(params.tokenId)];
            let transferFrom_send = async (params, options) => {
                let result = await this.send('transferFrom', transferFromParams(params), options);
                return result;
            };
            let transferFrom_call = async (params, options) => {
                let result = await this.call('transferFrom', transferFromParams(params), options);
                return;
            };
            this.transferFrom = Object.assign(transferFrom_send, {
                call: transferFrom_call
            });
        }
    }
    exports.ERC721 = ERC721;
    ERC721._abi = ERC721_json_1.default.abi;
});
define("@scom/scom-domain-contract/contracts/Authorization.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-domain-contract/contracts/Authorization.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Authorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Deauthorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "StartOwnershipTransfer", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "TransferOwnership", "type": "event" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "deny", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isPermitted", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "newOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "takeOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "newOwner_", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
        ],
        "bytecode": "608060405234801561001057600080fd5b50600080546001600160a01b031916331790556104e6806100326000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80639c52a7f11161005b5780639c52a7f11461010b578063a2f55ae51461011e578063d4ee1d9014610131578063f2fde38b1461015157600080fd5b80633fd8cc4e1461008257806360536172146100bc5780638da5cb5b146100c6575b600080fd5b6100a5610090366004610473565b60026020526000908152604090205460ff1681565b60405160ff90911681526020015b60405180910390f35b6100c4610164565b005b6000546100e69073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100b3565b6100c4610119366004610473565b610292565b6100c461012c366004610473565b610339565b6001546100e69073ffffffffffffffffffffffffffffffffffffffff1681565b6100c461015f366004610473565b6103dc565b60015473ffffffffffffffffffffffffffffffffffffffff16331461020f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e0000000000000000000000000000000000000000000000606482015260840160405180910390fd5b600180546000805473ffffffffffffffffffffffffffffffffffffffff83167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102b657600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a788491015b60405180910390a150565b60005473ffffffffffffffffffffffffffffffffffffffff16331461035d57600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf5910161032e565b60005473ffffffffffffffffffffffffffffffffffffffff16331461040057600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b9060200161032e565b60006020828403121561048557600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146104a957600080fd5b939250505056fea264697066735822122052b55098489ef25cd3935b68cbbe527e97241d6fdd4ab3566ef898bdc423affa64736f6c63430008110033"
    };
});
define("@scom/scom-domain-contract/contracts/Authorization.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-domain-contract/contracts/Authorization.json.ts"], function (require, exports, eth_contract_3, Authorization_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Authorization = void 0;
    class Authorization extends eth_contract_3.Contract {
        constructor(wallet, address) {
            super(wallet, address, Authorization_json_1.default.abi, Authorization_json_1.default.bytecode);
            this.assign();
        }
        deploy(options) {
            return this.__deploy([], options);
        }
        parseAuthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Authorize").map(e => this.decodeAuthorizeEvent(e));
        }
        decodeAuthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseDeauthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Deauthorize").map(e => this.decodeDeauthorizeEvent(e));
        }
        decodeDeauthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseStartOwnershipTransferEvent(receipt) {
            return this.parseEvents(receipt, "StartOwnershipTransfer").map(e => this.decodeStartOwnershipTransferEvent(e));
        }
        decodeStartOwnershipTransferEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseTransferOwnershipEvent(receipt) {
            return this.parseEvents(receipt, "TransferOwnership").map(e => this.decodeTransferOwnershipEvent(e));
        }
        decodeTransferOwnershipEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        assign() {
            let isPermitted_call = async (param1, options) => {
                let result = await this.call('isPermitted', [param1], options);
                return new eth_contract_3.BigNumber(result);
            };
            this.isPermitted = isPermitted_call;
            let newOwner_call = async (options) => {
                let result = await this.call('newOwner', [], options);
                return result;
            };
            this.newOwner = newOwner_call;
            let owner_call = async (options) => {
                let result = await this.call('owner', [], options);
                return result;
            };
            this.owner = owner_call;
            let deny_send = async (user, options) => {
                let result = await this.send('deny', [user], options);
                return result;
            };
            let deny_call = async (user, options) => {
                let result = await this.call('deny', [user], options);
                return;
            };
            this.deny = Object.assign(deny_send, {
                call: deny_call
            });
            let permit_send = async (user, options) => {
                let result = await this.send('permit', [user], options);
                return result;
            };
            let permit_call = async (user, options) => {
                let result = await this.call('permit', [user], options);
                return;
            };
            this.permit = Object.assign(permit_send, {
                call: permit_call
            });
            let takeOwnership_send = async (options) => {
                let result = await this.send('takeOwnership', [], options);
                return result;
            };
            let takeOwnership_call = async (options) => {
                let result = await this.call('takeOwnership', [], options);
                return;
            };
            this.takeOwnership = Object.assign(takeOwnership_send, {
                call: takeOwnership_call
            });
            let transferOwnership_send = async (newOwner, options) => {
                let result = await this.send('transferOwnership', [newOwner], options);
                return result;
            };
            let transferOwnership_call = async (newOwner, options) => {
                let result = await this.call('transferOwnership', [newOwner], options);
                return;
            };
            this.transferOwnership = Object.assign(transferOwnership_send, {
                call: transferOwnership_call
            });
        }
    }
    exports.Authorization = Authorization;
    Authorization._abi = Authorization_json_1.default.abi;
});
define("@scom/scom-domain-contract/contracts/Domain.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-domain-contract/contracts/Domain.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [{ "internalType": "string", "name": "__baseURI", "type": "string" }, { "internalType": "contract IERC20", "name": "_mintFeeToken", "type": "address" }, { "internalType": "uint256", "name": "_mintFee", "type": "uint256" }, { "internalType": "address", "name": "_mintFeeTo", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Authorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "baseURI", "type": "string" }], "name": "BaseURI", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Deauthorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "domain", "type": "string" }], "name": "Mint", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "mintFee", "type": "uint256" }], "name": "MintFee", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "mintFeeTo", "type": "address" }], "name": "MintFeeTo", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract IERC20", "name": "mintFeeToken", "type": "address" }], "name": "MintFeeToken", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "StartOwnershipTransfer", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "TransferOwnership", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" },
            { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "baseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "deny", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "domainNames", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "string", "name": "_domain", "type": "string" }], "name": "isDomainAvailable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "string", "name": "_domain", "type": "string" }], "name": "isDomainValid", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "pure", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isPermitted", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "string", "name": "_domain", "type": "string" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "mintFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "mintFeeTo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "mintFeeToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "string", "name": "_domain", "type": "string" }], "name": "mintTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "newOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "string", "name": "__baseURI", "type": "string" }], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "_mintFee", "type": "uint256" }], "name": "setMintFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "_mintFeeTo", "type": "address" }], "name": "setMintFeeTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "_mintFeeToken", "type": "address" }], "name": "setMintFeeToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "takeOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "newOwner_", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
        ],
        "bytecode": "60806040523480156200001157600080fd5b5060405162003f7538038062003f75833981016040819052620000349162000192565b604080518082018252600b81526a29a1a7a6902237b6b0b4b760a91b6020808301919091528251808401909352600783526614d0d3d34b511560ca1b90830152600080546001600160a01b031916331790556003805460ff191690556001600455906005620000a4838262000325565b506006620000b3828262000325565b5050506001600160a01b038116620001115760405162461bcd60e51b815260206004820152601960248201527f496e76616c6964206d696e74466565546f206164647265737300000000000000604482015260640160405180910390fd5b601080546001600160a01b038086166001600160a01b03199283161790925560128054928416929091169190911790556011829055600f62000154858262000325565b5050505050620003f1565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b03811681146200018d57600080fd5b919050565b60008060008060808587031215620001a957600080fd5b84516001600160401b0380821115620001c157600080fd5b818701915087601f830112620001d657600080fd5b815181811115620001eb57620001eb6200015f565b604051601f8201601f19908116603f011681019083821181831017156200021657620002166200015f565b81604052828152602093508a848487010111156200023357600080fd5b600091505b8282101562000257578482018401518183018501529083019062000238565b60008484830101528098505050506200027281880162000175565b94505050604085015191506200028b6060860162000175565b905092959194509250565b600181811c90821680620002ab57607f821691505b602082108103620002cc57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200032057600081815260208120601f850160051c81016020861015620002fb5750805b601f850160051c820191505b818110156200031c5782815560010162000307565b5050505b505050565b81516001600160401b038111156200034157620003416200015f565b620003598162000352845462000296565b84620002d2565b602080601f831160018114620003915760008415620003785750858301515b600019600386901b1c1916600185901b1785556200031c565b600085815260208120601f198616915b82811015620003c257888601518255948401946001909101908401620003a1565b5085821015620003e15787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b613b7480620004016000396000f3fe608060405234801561001057600080fd5b50600436106102ac5760003560e01c8063636921cf1161017b578063a2f55ae5116100d8578063d4ee1d901161008c578063e985e9c511610071578063e985e9c5146105c1578063eddd0d9c1461060a578063f2fde38b1461061d57600080fd5b8063d4ee1d901461058e578063d85d3d27146105ae57600080fd5b8063c4c69033116100bd578063c4c690331461053b578063c58af31c1461055b578063c87b56dd1461057b57600080fd5b8063a2f55ae514610515578063b88d4fde1461052857600080fd5b8063864e66f61161012f57806395d89b411161011457806395d89b41146104e75780639c52a7f1146104ef578063a22cb4651461050257600080fd5b8063864e66f6146104b45780638da5cb5b146104c757600080fd5b80636c0360eb116101605780636c0360eb1461049157806370a08231146104995780638456cb59146104ac57600080fd5b8063636921cf1461046b57806367384bd51461047e57600080fd5b806332752b09116102295780634f6ccce7116101dd5780635c975abb116101c25780635c975abb1461044557806360536172146104505780636352211e1461045857600080fd5b80634f6ccce71461041f57806355f804b31461043257600080fd5b80633fd8cc4e1161020e5780633fd8cc4e146103c457806342842e0e146103f9578063479919bc1461040c57600080fd5b806332752b09146103935780633f4ba83a146103bc57600080fd5b8063095ea7b31161028057806318160ddd1161026557806318160ddd1461036557806323b872dd1461036d5780632f745c591461038057600080fd5b8063095ea7b31461033b57806313966db51461034e57600080fd5b806275a317146102b157806301ffc9a7146102c657806306fdde03146102ee578063081812fc14610303575b600080fd5b6102c46102bf3660046133fa565b610630565b005b6102d96102d4366004613478565b610658565b60405190151581526020015b60405180910390f35b6102f66106b4565b6040516102e59190613503565b610316610311366004613516565b610746565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016102e5565b6102c461034936600461352f565b61077a565b61035760115481565b6040519081526020016102e5565b600d54610357565b6102c461037b36600461355b565b61090b565b61035761038e36600461352f565b6109ac565b6102d96103a136600461359c565b80516020918201206000908152601490915260409020541590565b6102c4610a7b565b6103e76103d23660046135d1565b60026020526000908152604090205460ff1681565b60405160ff90911681526020016102e5565b6102c461040736600461355b565b610b49565b6102d961041a36600461359c565b610b64565b61035761042d366004613516565b610e35565b6102c461044036600461359c565b610ef3565b60035460ff166102d9565b6102c4610fff565b610316610466366004613516565b61112a565b6102f6610479366004613516565b6111b6565b6102c461048c3660046135d1565b611250565b6102f66112e7565b6103576104a73660046135d1565b6112f4565b6102c46113c2565b6102c46104c23660046135d1565b61148e565b6000546103169073ffffffffffffffffffffffffffffffffffffffff1681565b6102f66115a2565b6102c46104fd3660046135d1565b6115b1565b6102c46105103660046135fc565b611651565b6102c46105233660046135d1565b61165c565b6102c4610536366004613635565b6116ff565b6010546103169073ffffffffffffffffffffffffffffffffffffffff1681565b6012546103169073ffffffffffffffffffffffffffffffffffffffff1681565b6102f6610589366004613516565b6117a7565b6001546103169073ffffffffffffffffffffffffffffffffffffffff1681565b6102c46105bc36600461359c565b61180e565b6102d96105cf3660046136b5565b73ffffffffffffffffffffffffffffffffffffffff9182166000908152600a6020908152604080832093909416825291909152205460ff1690565b6102c4610618366004613516565b611835565b6102c461062b3660046135d1565b61188e565b610638611925565b610640611998565b61064a8282611a05565b6106546001600455565b5050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f780e9d630000000000000000000000000000000000000000000000000000000014806106ae57506106ae82611bbb565b92915050565b6060600580546106c3906136e3565b80601f01602080910402602001604051908101604052809291908181526020018280546106ef906136e3565b801561073c5780601f106107115761010080835404028352916020019161073c565b820191906000526020600020905b81548152906001019060200180831161071f57829003601f168201915b5050505050905090565b600061075182611c9e565b5060009081526009602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60006107858261112a565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610847576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f720000000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff82161480610870575061087081336105cf565b6108fc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000606482015260840161083e565b6109068383611d29565b505050565b6109153382611dc9565b6109a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602d60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206f7220617070726f76656400000000000000000000000000000000000000606482015260840161083e565b610906838383611e89565b60006109b7836112f4565b8210610a45576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201527f74206f6620626f756e6473000000000000000000000000000000000000000000606482015260840161083e565b5073ffffffffffffffffffffffffffffffffffffffff919091166000908152600b60209081526040808320938352929052205490565b3360009081526002602052604090205460ff1660011480610ab3575060005473ffffffffffffffffffffffffffffffffffffffff1633145b610b3f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e0000000000000000000000000000000000000000000000606482015260840161083e565b610b47612191565b565b610906838383604051806020016040528060008152506116ff565b80516000908290801580610b785750603f81115b15610b87575060009392505050565b81600081518110610b9a57610b9a613736565b6020910101517fff00000000000000000000000000000000000000000000000000000000000000167f2d000000000000000000000000000000000000000000000000000000000000001480610c51575081610bf6600183613794565b81518110610c0657610c06613736565b6020910101517fff00000000000000000000000000000000000000000000000000000000000000167f2d00000000000000000000000000000000000000000000000000000000000000145b15610c60575060009392505050565b60005b81811015610e2a576000838281518110610c7f57610c7f613736565b01602001517fff000000000000000000000000000000000000000000000000000000000000001690507f30000000000000000000000000000000000000000000000000000000000000008110801590610d1a57507f39000000000000000000000000000000000000000000000000000000000000007fff00000000000000000000000000000000000000000000000000000000000000821611155b158015610db857507f61000000000000000000000000000000000000000000000000000000000000007fff00000000000000000000000000000000000000000000000000000000000000821610801590610db657507f7a000000000000000000000000000000000000000000000000000000000000007fff00000000000000000000000000000000000000000000000000000000000000821611155b155b8015610e0657507f2d000000000000000000000000000000000000000000000000000000000000007fff00000000000000000000000000000000000000000000000000000000000000821614155b15610e175750600095945050505050565b5080610e22816137a7565b915050610c63565b506001949350505050565b6000610e40600d5490565b8210610ece576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201527f7574206f6620626f756e64730000000000000000000000000000000000000000606482015260840161083e565b600d8281548110610ee157610ee1613736565b90600052602060002001549050919050565b3360009081526002602052604090205460ff1660011480610f2b575060005473ffffffffffffffffffffffffffffffffffffffff1633145b610fb7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e0000000000000000000000000000000000000000000000606482015260840161083e565b600f610fc3828261382d565b507f01e56a02aca7f26a28165a040851ba78f30282b55ca81c63a804cdc1e2dcea72600f604051610ff49190613947565b60405180910390a150565b60015473ffffffffffffffffffffffffffffffffffffffff1633146110a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e0000000000000000000000000000000000000000000000606482015260840161083e565b600180546000805473ffffffffffffffffffffffffffffffffffffffff83167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a4906020015b60405180910390a1565b60008181526007602052604081205473ffffffffffffffffffffffffffffffffffffffff16806106ae576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e2049440000000000000000604482015260640161083e565b601560205260009081526040902080546111cf906136e3565b80601f01602080910402602001604051908101604052809291908181526020018280546111fb906136e3565b80156112485780601f1061121d57610100808354040283529160200191611248565b820191906000526020600020905b81548152906001019060200180831161122b57829003601f168201915b505050505081565b60005473ffffffffffffffffffffffffffffffffffffffff16331461127457600080fd5b601080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f9191f926195a6a7df7ef972e5e6773a46e634808c2fd045f5f85fb1d5286123590602001610ff4565b600f80546111cf906136e3565b600073ffffffffffffffffffffffffffffffffffffffff8216611399576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e65720000000000000000000000000000000000000000000000606482015260840161083e565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526008602052604090205490565b3360009081526002602052604090205460ff16600114806113fa575060005473ffffffffffffffffffffffffffffffffffffffff1633145b611486576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e0000000000000000000000000000000000000000000000606482015260840161083e565b610b47612209565b60005473ffffffffffffffffffffffffffffffffffffffff1633146114b257600080fd5b73ffffffffffffffffffffffffffffffffffffffff811661152f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f496e76616c6964206d696e74466565546f206164647265737300000000000000604482015260640161083e565b601280547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f563a8b0c504e5ffd0976076dfa93d30851fe3495436f6a74cb54f040c7a1a58590602001610ff4565b6060600680546106c3906136e3565b60005473ffffffffffffffffffffffffffffffffffffffff1633146115d557600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a78849101610ff4565b610654338383612264565b60005473ffffffffffffffffffffffffffffffffffffffff16331461168057600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf59101610ff4565b6117093383611dc9565b611795576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602d60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206f7220617070726f76656400000000000000000000000000000000000000606482015260840161083e565b6117a184848484612391565b50505050565b60606117b282611c9e565b60006117bc612434565b905060008151116117dc5760405180602001604052806000815250611807565b806117e684612443565b6040516020016117f79291906139f0565b6040516020818303038152906040525b9392505050565b611816611925565b61181e611998565b6118283382611a05565b6118326001600455565b50565b60005473ffffffffffffffffffffffffffffffffffffffff16331461185957600080fd5b60118190556040518181527f6f87524b705f31734b7940b88671f37a3291d7b961b69da31bcabf882b2531da90602001610ff4565b60005473ffffffffffffffffffffffffffffffffffffffff1633146118b257600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b90602001610ff4565b600260045403611991576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161083e565b6002600455565b60035460ff1615610b47576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015260640161083e565b80516020808301919091206000818152601490925260409091205415611a87576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f446f6d61696e206e6f7420617661696c61626c65000000000000000000000000604482015260640161083e565b611a9082610b64565b611af6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f496e76616c696420646f6d61696e206e616d6500000000000000000000000000604482015260640161083e565b60115415611b2f57601254601154601054611b2f9273ffffffffffffffffffffffffffffffffffffffff91821692339290911690612501565b60006013546001611b409190613a1f565b60138190559050611b518482612596565b600082815260146020908152604080832084905583835260159091529020611b79848261382d565b507f85a66b9141978db9980f7e0ce3b468cebf4f7999f32b23091c5c03e798b1ba7a848285604051611bad93929190613a32565b60405180910390a150505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd000000000000000000000000000000000000000000000000000000001480611c4e57507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b806106ae57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316146106ae565b60008181526007602052604090205473ffffffffffffffffffffffffffffffffffffffff16611832576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e2049440000000000000000604482015260640161083e565b600081815260096020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff84169081179091558190611d838261112a565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080611dd58361112a565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480611e43575073ffffffffffffffffffffffffffffffffffffffff8082166000908152600a602090815260408083209388168352929052205460ff165b80611e8157508373ffffffffffffffffffffffffffffffffffffffff16611e6984610746565b73ffffffffffffffffffffffffffffffffffffffff16145b949350505050565b8273ffffffffffffffffffffffffffffffffffffffff16611ea98261112a565b73ffffffffffffffffffffffffffffffffffffffff1614611f4c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e6572000000000000000000000000000000000000000000000000000000606482015260840161083e565b73ffffffffffffffffffffffffffffffffffffffff8216611fee576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161083e565b611ffb83838360016125b0565b8273ffffffffffffffffffffffffffffffffffffffff1661201b8261112a565b73ffffffffffffffffffffffffffffffffffffffff16146120be576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e6572000000000000000000000000000000000000000000000000000000606482015260840161083e565b600081815260096020908152604080832080547fffffffffffffffffffffffff000000000000000000000000000000000000000090811690915573ffffffffffffffffffffffffffffffffffffffff8781168086526008855283862080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01905590871680865283862080546001019055868652600790945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b612199612760565b600380547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001611120565b612211611998565b600380547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586121e43390565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036122f9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161083e565b73ffffffffffffffffffffffffffffffffffffffff8381166000818152600a602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b61239c848484611e89565b6123a8848484846127cc565b6117a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161083e565b6060600f80546106c3906136e3565b60606000612450836129b7565b600101905060008167ffffffffffffffff81111561247057612470613317565b6040519080825280601f01601f19166020018201604052801561249a576020820181803683370190505b5090508181016020015b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff017f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a85049450846124a457509392505050565b6040805173ffffffffffffffffffffffffffffffffffffffff85811660248301528416604482015260648082018490528251808303909101815260849091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd000000000000000000000000000000000000000000000000000000001790526117a1908590612a99565b610654828260405180602001604052806000815250612ba5565b6125bc84848484612c48565b600181111561264d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603560248201527f455243373231456e756d657261626c653a20636f6e736563757469766520747260448201527f616e7366657273206e6f7420737570706f727465640000000000000000000000606482015260840161083e565b8173ffffffffffffffffffffffffffffffffffffffff85166126b6576126b181600d80546000838152600e60205260408120829055600182018355919091527fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb50155565b6126f3565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16146126f3576126f38582612d04565b73ffffffffffffffffffffffffffffffffffffffff841661271c5761271781612dbb565b612759565b8473ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614612759576127598482612e6a565b5050505050565b60035460ff16610b47576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f5061757361626c653a206e6f7420706175736564000000000000000000000000604482015260640161083e565b600073ffffffffffffffffffffffffffffffffffffffff84163b15610e2a576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290612843903390899088908890600401613a70565b6020604051808303816000875af192505050801561289c575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820190925261289991810190613ab9565b60015b612969573d8080156128ca576040519150601f19603f3d011682016040523d82523d6000602084013e6128cf565b606091505b508051600003612961576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161083e565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050949350505050565b6000807a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310612a00577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000830492506040015b6d04ee2d6d415b85acef81000000008310612a2c576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310612a4a57662386f26fc10000830492506010015b6305f5e1008310612a62576305f5e100830492506008015b6127108310612a7657612710830492506004015b60648310612a88576064830492506002015b600a83106106ae5760010192915050565b6000612afb826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16612ebb9092919063ffffffff16565b8051909150156109065780806020019051810190612b199190613ad6565b610906576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f74207375636365656400000000000000000000000000000000000000000000606482015260840161083e565b612baf8383612eca565b612bbc60008484846127cc565b610906576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161083e565b60018111156117a15773ffffffffffffffffffffffffffffffffffffffff841615612ca85773ffffffffffffffffffffffffffffffffffffffff841660009081526008602052604081208054839290612ca2908490613794565b90915550505b73ffffffffffffffffffffffffffffffffffffffff8316156117a15773ffffffffffffffffffffffffffffffffffffffff831660009081526008602052604081208054839290612cf9908490613a1f565b909155505050505050565b60006001612d11846112f4565b612d1b9190613794565b6000838152600c6020526040902054909150808214612d7b5773ffffffffffffffffffffffffffffffffffffffff84166000908152600b602090815260408083208584528252808320548484528184208190558352600c90915290208190555b506000918252600c6020908152604080842084905573ffffffffffffffffffffffffffffffffffffffff9094168352600b81528383209183525290812055565b600d54600090612dcd90600190613794565b6000838152600e6020526040812054600d8054939450909284908110612df557612df5613736565b9060005260206000200154905080600d8381548110612e1657612e16613736565b6000918252602080832090910192909255828152600e9091526040808220849055858252812055600d805480612e4e57612e4e613af3565b6001900381819060005260206000200160009055905550505050565b6000612e75836112f4565b73ffffffffffffffffffffffffffffffffffffffff9093166000908152600b602090815260408083208684528252808320859055938252600c9052919091209190915550565b6060611e8184846000856130fd565b73ffffffffffffffffffffffffffffffffffffffff8216612f47576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161083e565b60008181526007602052604090205473ffffffffffffffffffffffffffffffffffffffff1615612fd3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161083e565b612fe16000838360016125b0565b60008181526007602052604090205473ffffffffffffffffffffffffffffffffffffffff161561306d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161083e565b73ffffffffffffffffffffffffffffffffffffffff8216600081815260086020908152604080832080546001019055848352600790915280822080547fffffffffffffffffffffffff0000000000000000000000000000000000000000168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60608247101561318f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c0000000000000000000000000000000000000000000000000000606482015260840161083e565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516131b89190613b22565b60006040518083038185875af1925050503d80600081146131f5576040519150601f19603f3d011682016040523d82523d6000602084013e6131fa565b606091505b509150915061320b87838387613216565b979650505050505050565b606083156132ac5782516000036132a55773ffffffffffffffffffffffffffffffffffffffff85163b6132a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161083e565b5081611e81565b611e8183838151156132c15781518083602001fd5b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161083e9190613503565b73ffffffffffffffffffffffffffffffffffffffff8116811461183257600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600067ffffffffffffffff8084111561336157613361613317565b604051601f85017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019082821181831017156133a7576133a7613317565b816040528093508581528686860111156133c057600080fd5b858560208301376000602087830101525050509392505050565b600082601f8301126133eb57600080fd5b61180783833560208501613346565b6000806040838503121561340d57600080fd5b8235613418816132f5565b9150602083013567ffffffffffffffff81111561343457600080fd5b613440858286016133da565b9150509250929050565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461183257600080fd5b60006020828403121561348a57600080fd5b81356118078161344a565b60005b838110156134b0578181015183820152602001613498565b50506000910152565b600081518084526134d1816020860160208601613495565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061180760208301846134b9565b60006020828403121561352857600080fd5b5035919050565b6000806040838503121561354257600080fd5b823561354d816132f5565b946020939093013593505050565b60008060006060848603121561357057600080fd5b833561357b816132f5565b9250602084013561358b816132f5565b929592945050506040919091013590565b6000602082840312156135ae57600080fd5b813567ffffffffffffffff8111156135c557600080fd5b611e81848285016133da565b6000602082840312156135e357600080fd5b8135611807816132f5565b801515811461183257600080fd5b6000806040838503121561360f57600080fd5b823561361a816132f5565b9150602083013561362a816135ee565b809150509250929050565b6000806000806080858703121561364b57600080fd5b8435613656816132f5565b93506020850135613666816132f5565b925060408501359150606085013567ffffffffffffffff81111561368957600080fd5b8501601f8101871361369a57600080fd5b6136a987823560208401613346565b91505092959194509250565b600080604083850312156136c857600080fd5b82356136d3816132f5565b9150602083013561362a816132f5565b600181811c908216806136f757607f821691505b602082108103613730577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b818103818111156106ae576106ae613765565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036137d8576137d8613765565b5060010190565b601f82111561090657600081815260208120601f850160051c810160208610156138065750805b601f850160051c820191505b8181101561382557828155600101613812565b505050505050565b815167ffffffffffffffff81111561384757613847613317565b61385b8161385584546136e3565b846137df565b602080601f8311600181146138ae57600084156138785750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555613825565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b828110156138fb578886015182559484019460019091019084016138dc565b508582101561393757878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b600060208083526000845461395b816136e3565b8084870152604060018084166000811461397c57600181146139b4576139e2565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008516838a01528284151560051b8a010195506139e2565b896000528660002060005b858110156139da5781548b82018601529083019088016139bf565b8a0184019650505b509398975050505050505050565b60008351613a02818460208801613495565b835190830190613a16818360208801613495565b01949350505050565b808201808211156106ae576106ae613765565b73ffffffffffffffffffffffffffffffffffffffff84168152826020820152606060408201526000613a6760608301846134b9565b95945050505050565b600073ffffffffffffffffffffffffffffffffffffffff808716835280861660208401525083604083015260806060830152613aaf60808301846134b9565b9695505050505050565b600060208284031215613acb57600080fd5b81516118078161344a565b600060208284031215613ae857600080fd5b8151611807816135ee565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b60008251613b34818460208701613495565b919091019291505056fea2646970667358221220e4325d5984e4210620f68207044cb6a16018d3a9810037993284d8ceca0628a864736f6c63430008110033"
    };
});
define("@scom/scom-domain-contract/contracts/Domain.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-domain-contract/contracts/Domain.json.ts"], function (require, exports, eth_contract_4, Domain_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Domain = void 0;
    class Domain extends eth_contract_4.Contract {
        constructor(wallet, address) {
            super(wallet, address, Domain_json_1.default.abi, Domain_json_1.default.bytecode);
            this.assign();
        }
        deploy(params, options) {
            return this.__deploy([params.baseURI, params.mintFeeToken, this.wallet.utils.toString(params.mintFee), params.mintFeeTo], options);
        }
        parseApprovalEvent(receipt) {
            return this.parseEvents(receipt, "Approval").map(e => this.decodeApprovalEvent(e));
        }
        decodeApprovalEvent(event) {
            let result = event.data;
            return {
                owner: result.owner,
                approved: result.approved,
                tokenId: new eth_contract_4.BigNumber(result.tokenId),
                _event: event
            };
        }
        parseApprovalForAllEvent(receipt) {
            return this.parseEvents(receipt, "ApprovalForAll").map(e => this.decodeApprovalForAllEvent(e));
        }
        decodeApprovalForAllEvent(event) {
            let result = event.data;
            return {
                owner: result.owner,
                operator: result.operator,
                approved: result.approved,
                _event: event
            };
        }
        parseAuthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Authorize").map(e => this.decodeAuthorizeEvent(e));
        }
        decodeAuthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseBaseURIEvent(receipt) {
            return this.parseEvents(receipt, "BaseURI").map(e => this.decodeBaseURIEvent(e));
        }
        decodeBaseURIEvent(event) {
            let result = event.data;
            return {
                baseURI: result.baseURI,
                _event: event
            };
        }
        parseDeauthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Deauthorize").map(e => this.decodeDeauthorizeEvent(e));
        }
        decodeDeauthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseMintEvent(receipt) {
            return this.parseEvents(receipt, "Mint").map(e => this.decodeMintEvent(e));
        }
        decodeMintEvent(event) {
            let result = event.data;
            return {
                sender: result.sender,
                tokenId: new eth_contract_4.BigNumber(result.tokenId),
                domain: result.domain,
                _event: event
            };
        }
        parseMintFeeEvent(receipt) {
            return this.parseEvents(receipt, "MintFee").map(e => this.decodeMintFeeEvent(e));
        }
        decodeMintFeeEvent(event) {
            let result = event.data;
            return {
                mintFee: new eth_contract_4.BigNumber(result.mintFee),
                _event: event
            };
        }
        parseMintFeeToEvent(receipt) {
            return this.parseEvents(receipt, "MintFeeTo").map(e => this.decodeMintFeeToEvent(e));
        }
        decodeMintFeeToEvent(event) {
            let result = event.data;
            return {
                mintFeeTo: result.mintFeeTo,
                _event: event
            };
        }
        parseMintFeeTokenEvent(receipt) {
            return this.parseEvents(receipt, "MintFeeToken").map(e => this.decodeMintFeeTokenEvent(e));
        }
        decodeMintFeeTokenEvent(event) {
            let result = event.data;
            return {
                mintFeeToken: result.mintFeeToken,
                _event: event
            };
        }
        parsePausedEvent(receipt) {
            return this.parseEvents(receipt, "Paused").map(e => this.decodePausedEvent(e));
        }
        decodePausedEvent(event) {
            let result = event.data;
            return {
                account: result.account,
                _event: event
            };
        }
        parseStartOwnershipTransferEvent(receipt) {
            return this.parseEvents(receipt, "StartOwnershipTransfer").map(e => this.decodeStartOwnershipTransferEvent(e));
        }
        decodeStartOwnershipTransferEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseTransferEvent(receipt) {
            return this.parseEvents(receipt, "Transfer").map(e => this.decodeTransferEvent(e));
        }
        decodeTransferEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                to: result.to,
                tokenId: new eth_contract_4.BigNumber(result.tokenId),
                _event: event
            };
        }
        parseTransferOwnershipEvent(receipt) {
            return this.parseEvents(receipt, "TransferOwnership").map(e => this.decodeTransferOwnershipEvent(e));
        }
        decodeTransferOwnershipEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseUnpausedEvent(receipt) {
            return this.parseEvents(receipt, "Unpaused").map(e => this.decodeUnpausedEvent(e));
        }
        decodeUnpausedEvent(event) {
            let result = event.data;
            return {
                account: result.account,
                _event: event
            };
        }
        assign() {
            let balanceOf_call = async (owner, options) => {
                let result = await this.call('balanceOf', [owner], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.balanceOf = balanceOf_call;
            let baseURI_call = async (options) => {
                let result = await this.call('baseURI', [], options);
                return result;
            };
            this.baseURI = baseURI_call;
            let domainNames_call = async (param1, options) => {
                let result = await this.call('domainNames', [this.wallet.utils.toString(param1)], options);
                return result;
            };
            this.domainNames = domainNames_call;
            let getApproved_call = async (tokenId, options) => {
                let result = await this.call('getApproved', [this.wallet.utils.toString(tokenId)], options);
                return result;
            };
            this.getApproved = getApproved_call;
            let isApprovedForAllParams = (params) => [params.owner, params.operator];
            let isApprovedForAll_call = async (params, options) => {
                let result = await this.call('isApprovedForAll', isApprovedForAllParams(params), options);
                return result;
            };
            this.isApprovedForAll = isApprovedForAll_call;
            let isDomainAvailable_call = async (domain, options) => {
                let result = await this.call('isDomainAvailable', [domain], options);
                return result;
            };
            this.isDomainAvailable = isDomainAvailable_call;
            let isDomainValid_call = async (domain, options) => {
                let result = await this.call('isDomainValid', [domain], options);
                return result;
            };
            this.isDomainValid = isDomainValid_call;
            let isPermitted_call = async (param1, options) => {
                let result = await this.call('isPermitted', [param1], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.isPermitted = isPermitted_call;
            let mintFee_call = async (options) => {
                let result = await this.call('mintFee', [], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.mintFee = mintFee_call;
            let mintFeeTo_call = async (options) => {
                let result = await this.call('mintFeeTo', [], options);
                return result;
            };
            this.mintFeeTo = mintFeeTo_call;
            let mintFeeToken_call = async (options) => {
                let result = await this.call('mintFeeToken', [], options);
                return result;
            };
            this.mintFeeToken = mintFeeToken_call;
            let name_call = async (options) => {
                let result = await this.call('name', [], options);
                return result;
            };
            this.name = name_call;
            let newOwner_call = async (options) => {
                let result = await this.call('newOwner', [], options);
                return result;
            };
            this.newOwner = newOwner_call;
            let owner_call = async (options) => {
                let result = await this.call('owner', [], options);
                return result;
            };
            this.owner = owner_call;
            let ownerOf_call = async (tokenId, options) => {
                let result = await this.call('ownerOf', [this.wallet.utils.toString(tokenId)], options);
                return result;
            };
            this.ownerOf = ownerOf_call;
            let paused_call = async (options) => {
                let result = await this.call('paused', [], options);
                return result;
            };
            this.paused = paused_call;
            let supportsInterface_call = async (interfaceId, options) => {
                let result = await this.call('supportsInterface', [interfaceId], options);
                return result;
            };
            this.supportsInterface = supportsInterface_call;
            let symbol_call = async (options) => {
                let result = await this.call('symbol', [], options);
                return result;
            };
            this.symbol = symbol_call;
            let tokenByIndex_call = async (index, options) => {
                let result = await this.call('tokenByIndex', [this.wallet.utils.toString(index)], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.tokenByIndex = tokenByIndex_call;
            let tokenOfOwnerByIndexParams = (params) => [params.owner, this.wallet.utils.toString(params.index)];
            let tokenOfOwnerByIndex_call = async (params, options) => {
                let result = await this.call('tokenOfOwnerByIndex', tokenOfOwnerByIndexParams(params), options);
                return new eth_contract_4.BigNumber(result);
            };
            this.tokenOfOwnerByIndex = tokenOfOwnerByIndex_call;
            let tokenURI_call = async (tokenId, options) => {
                let result = await this.call('tokenURI', [this.wallet.utils.toString(tokenId)], options);
                return result;
            };
            this.tokenURI = tokenURI_call;
            let totalSupply_call = async (options) => {
                let result = await this.call('totalSupply', [], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.totalSupply = totalSupply_call;
            let approveParams = (params) => [params.to, this.wallet.utils.toString(params.tokenId)];
            let approve_send = async (params, options) => {
                let result = await this.send('approve', approveParams(params), options);
                return result;
            };
            let approve_call = async (params, options) => {
                let result = await this.call('approve', approveParams(params), options);
                return;
            };
            this.approve = Object.assign(approve_send, {
                call: approve_call
            });
            let deny_send = async (user, options) => {
                let result = await this.send('deny', [user], options);
                return result;
            };
            let deny_call = async (user, options) => {
                let result = await this.call('deny', [user], options);
                return;
            };
            this.deny = Object.assign(deny_send, {
                call: deny_call
            });
            let mint_send = async (domain, options) => {
                let result = await this.send('mint', [domain], options);
                return result;
            };
            let mint_call = async (domain, options) => {
                let result = await this.call('mint', [domain], options);
                return;
            };
            this.mint = Object.assign(mint_send, {
                call: mint_call
            });
            let mintToParams = (params) => [params.to, params.domain];
            let mintTo_send = async (params, options) => {
                let result = await this.send('mintTo', mintToParams(params), options);
                return result;
            };
            let mintTo_call = async (params, options) => {
                let result = await this.call('mintTo', mintToParams(params), options);
                return;
            };
            this.mintTo = Object.assign(mintTo_send, {
                call: mintTo_call
            });
            let pause_send = async (options) => {
                let result = await this.send('pause', [], options);
                return result;
            };
            let pause_call = async (options) => {
                let result = await this.call('pause', [], options);
                return;
            };
            this.pause = Object.assign(pause_send, {
                call: pause_call
            });
            let permit_send = async (user, options) => {
                let result = await this.send('permit', [user], options);
                return result;
            };
            let permit_call = async (user, options) => {
                let result = await this.call('permit', [user], options);
                return;
            };
            this.permit = Object.assign(permit_send, {
                call: permit_call
            });
            let safeTransferFromParams = (params) => [params.from, params.to, this.wallet.utils.toString(params.tokenId)];
            let safeTransferFrom_send = async (params, options) => {
                let result = await this.send('safeTransferFrom', safeTransferFromParams(params), options);
                return result;
            };
            let safeTransferFrom_call = async (params, options) => {
                let result = await this.call('safeTransferFrom', safeTransferFromParams(params), options);
                return;
            };
            this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
                call: safeTransferFrom_call
            });
            let safeTransferFrom_1Params = (params) => [params.from, params.to, this.wallet.utils.toString(params.tokenId), this.wallet.utils.stringToBytes(params.data)];
            let safeTransferFrom_1_send = async (params, options) => {
                let result = await this.send('safeTransferFrom', safeTransferFrom_1Params(params), options);
                return result;
            };
            let safeTransferFrom_1_call = async (params, options) => {
                let result = await this.call('safeTransferFrom', safeTransferFrom_1Params(params), options);
                return;
            };
            this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
                call: safeTransferFrom_1_call
            });
            let setApprovalForAllParams = (params) => [params.operator, params.approved];
            let setApprovalForAll_send = async (params, options) => {
                let result = await this.send('setApprovalForAll', setApprovalForAllParams(params), options);
                return result;
            };
            let setApprovalForAll_call = async (params, options) => {
                let result = await this.call('setApprovalForAll', setApprovalForAllParams(params), options);
                return;
            };
            this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
                call: setApprovalForAll_call
            });
            let setBaseURI_send = async (baseURI, options) => {
                let result = await this.send('setBaseURI', [baseURI], options);
                return result;
            };
            let setBaseURI_call = async (baseURI, options) => {
                let result = await this.call('setBaseURI', [baseURI], options);
                return;
            };
            this.setBaseURI = Object.assign(setBaseURI_send, {
                call: setBaseURI_call
            });
            let setMintFee_send = async (mintFee, options) => {
                let result = await this.send('setMintFee', [this.wallet.utils.toString(mintFee)], options);
                return result;
            };
            let setMintFee_call = async (mintFee, options) => {
                let result = await this.call('setMintFee', [this.wallet.utils.toString(mintFee)], options);
                return;
            };
            this.setMintFee = Object.assign(setMintFee_send, {
                call: setMintFee_call
            });
            let setMintFeeTo_send = async (mintFeeTo, options) => {
                let result = await this.send('setMintFeeTo', [mintFeeTo], options);
                return result;
            };
            let setMintFeeTo_call = async (mintFeeTo, options) => {
                let result = await this.call('setMintFeeTo', [mintFeeTo], options);
                return;
            };
            this.setMintFeeTo = Object.assign(setMintFeeTo_send, {
                call: setMintFeeTo_call
            });
            let setMintFeeToken_send = async (mintFeeToken, options) => {
                let result = await this.send('setMintFeeToken', [mintFeeToken], options);
                return result;
            };
            let setMintFeeToken_call = async (mintFeeToken, options) => {
                let result = await this.call('setMintFeeToken', [mintFeeToken], options);
                return;
            };
            this.setMintFeeToken = Object.assign(setMintFeeToken_send, {
                call: setMintFeeToken_call
            });
            let takeOwnership_send = async (options) => {
                let result = await this.send('takeOwnership', [], options);
                return result;
            };
            let takeOwnership_call = async (options) => {
                let result = await this.call('takeOwnership', [], options);
                return;
            };
            this.takeOwnership = Object.assign(takeOwnership_send, {
                call: takeOwnership_call
            });
            let transferFromParams = (params) => [params.from, params.to, this.wallet.utils.toString(params.tokenId)];
            let transferFrom_send = async (params, options) => {
                let result = await this.send('transferFrom', transferFromParams(params), options);
                return result;
            };
            let transferFrom_call = async (params, options) => {
                let result = await this.call('transferFrom', transferFromParams(params), options);
                return;
            };
            this.transferFrom = Object.assign(transferFrom_send, {
                call: transferFrom_call
            });
            let transferOwnership_send = async (newOwner, options) => {
                let result = await this.send('transferOwnership', [newOwner], options);
                return result;
            };
            let transferOwnership_call = async (newOwner, options) => {
                let result = await this.call('transferOwnership', [newOwner], options);
                return;
            };
            this.transferOwnership = Object.assign(transferOwnership_send, {
                call: transferOwnership_call
            });
            let unpause_send = async (options) => {
                let result = await this.send('unpause', [], options);
                return result;
            };
            let unpause_call = async (options) => {
                let result = await this.call('unpause', [], options);
                return;
            };
            this.unpause = Object.assign(unpause_send, {
                call: unpause_call
            });
        }
    }
    exports.Domain = Domain;
    Domain._abi = Domain_json_1.default.abi;
});
define("@scom/scom-domain-contract/contracts/DomainMaster.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-domain-contract/contracts/DomainMaster.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [{ "internalType": "contract Domain", "name": "_domain", "type": "address" }, { "internalType": "contract IERC20", "name": "_defaultFeeToken", "type": "address" }, { "internalType": "contract IERC20", "name": "_spToken", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Authorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "invoiceCid", "type": "string" }, { "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "provider", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "feeToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newBalance", "type": "uint256" }], "name": "Bill", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Deauthorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "feeToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newBalance", "type": "uint256" }], "name": "Deposit", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "invoiceCid", "type": "string" }, { "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "address", "name": "provider", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "feeToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Pay", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "StartOwnershipTransfer", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "TransferOwnership", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "contract IERC20", "name": "feeToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "UpdateDomainAllowance", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "customDomain", "type": "string" }, { "indexed": false, "internalType": "string", "name": "cid", "type": "string" }, { "indexed": false, "internalType": "address", "name": "serviceProvider", "type": "address" }], "name": "UpdateDomainInfo", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract IERC20", "name": "feeToken", "type": "address" }], "name": "UpdateFeeToken", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "provider", "type": "address" }, { "indexed": false, "internalType": "address", "name": "operator", "type": "address" }], "name": "UpdateOperator", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "provider", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "active", "type": "bool" }], "name": "UpdateServiceProvider", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "provider", "type": "address" }, { "indexed": false, "internalType": "address", "name": "treasury", "type": "address" }], "name": "UpdateTreasury", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "feeToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newBalance", "type": "uint256" }], "name": "Withdraw", "type": "event" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balances", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "balancesWithFeeToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "string", "name": "invoiceCid", "type": "string" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "bill", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "string", "name": "invoiceCid", "type": "string" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "feeToken", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "billWithFeeToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "customDomains", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "defaultFeeToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "deny", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "depositTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "contract IERC20", "name": "feeToken", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "depositToWithFeeToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "feeToken", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "depositWithFeeToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "provider", "type": "address" }], "name": "disableServiceProvider", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "domain", "outputs": [{ "internalType": "contract Domain", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "domainAllowance", "outputs": [{ "internalType": "uint256", "name": "allowance", "type": "uint256" }, { "internalType": "uint256", "name": "billedDate", "type": "uint256" }, { "internalType": "uint256", "name": "billedAmount", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "feeToken", "type": "address" }], "name": "domainAllowanceWithFeeToken", "outputs": [{ "internalType": "uint256", "name": "allowance", "type": "uint256" }, { "internalType": "uint256", "name": "billedDate", "type": "uint256" }, { "internalType": "uint256", "name": "billedAmount", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "domainCids", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "domainInfo", "outputs": [{ "internalType": "string", "name": "domainName", "type": "string" }, { "internalType": "string", "name": "customDomain", "type": "string" }, { "internalType": "string", "name": "cid", "type": "string" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "serviceProvider", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "domainServiceProviders", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "provider", "type": "address" }, { "internalType": "string", "name": "cid", "type": "string" }, { "internalType": "string", "name": "domainName", "type": "string" }], "name": "enableServiceProvider", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isActiveProvider", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "isInvoiceSettled", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isPermitted", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "newOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "string", "name": "invoiceCid", "type": "string" }, { "internalType": "address", "name": "provider", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "pay", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "string", "name": "invoiceCid", "type": "string" }, { "internalType": "address", "name": "provider", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "payFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "string", "name": "invoiceCid", "type": "string" }, { "internalType": "address", "name": "provider", "type": "address" }, { "internalType": "contract IERC20", "name": "feeToken", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "payFromWithFeeToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "string", "name": "invoiceCid", "type": "string" }, { "internalType": "address", "name": "provider", "type": "address" }, { "internalType": "contract IERC20", "name": "feeToken", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "payWithFeeToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "providerOperators", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "providerTreasuries", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "serviceProviders", "outputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "string", "name": "cid", "type": "string" }, { "internalType": "bool", "name": "active", "type": "bool" }, { "internalType": "string", "name": "domain", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "_defaultFeeToken", "type": "address" }], "name": "setDefaultFeeToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "spToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "takeOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "newOwner_", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "updateDomainAllowance", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "feeToken", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "updateDomainAllowanceWithFeeToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "string", "name": "customDomain", "type": "string" }, { "internalType": "string", "name": "cid", "type": "string" }, { "internalType": "address", "name": "serviceProvider", "type": "address" }], "name": "updateDomainInfo", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }], "name": "updateOperator", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "treasury", "type": "address" }], "name": "updateTreasury", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "feeToken", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawWithFeeToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
        ],
        "bytecode": "60c06040523480156200001157600080fd5b5060405162003f0738038062003f07833981016040819052620000349162000171565b60008054336001600160a01b0319918216178255600160038190556001600160a01b0386811660a05260048054841687831617815585821660809081526040805191820181528682528051602081810183528882528381019182528383018990528251908101909252878252606083019190915260058054958601815590965280517f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db09490920293840180549095169190921617835592517f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db1909101906200011d90826200026a565b50604082015160028201805460ff1916911515919091179055606082015160038201906200014c90826200026a565b50505050505062000336565b6001600160a01b03811681146200016e57600080fd5b50565b6000806000606084860312156200018757600080fd5b8351620001948162000158565b6020850151909350620001a78162000158565b6040850151909250620001ba8162000158565b809150509250925092565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620001f057607f821691505b6020821081036200021157634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200026557600081815260208120601f850160051c81016020861015620002405750805b601f850160051c820191505b8181101562000261578281556001016200024c565b5050505b505050565b81516001600160401b03811115620002865762000286620001c5565b6200029e81620002978454620001db565b8462000217565b602080601f831160018114620002d65760008415620002bd5750858301515b600019600386901b1c1916600185901b17855562000261565b600085815260208120601f198616915b828110156200030757888601518255948401946001909101908401620002e6565b5085821015620003265787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60805160a051613b9662000371600039600081816106e10152818161117f0152818161146b015261270e015260006105de0152613b966000f3fe608060405234801561001057600080fd5b50600436106102e95760003560e01c80637f51bb1f11610191578063c2fb26a6116100e3578063e8d196c211610097578063f213159c11610071578063f213159c146107b8578063f2fde38b146107cb578063f60830ff146107de57600080fd5b8063e8d196c21461075c578063ec446b181461076f578063edd756eb1461078257600080fd5b8063d23a65c5116100c8578063d23a65c514610716578063d4ee1d9014610729578063e23541c11461074957600080fd5b8063c2fb26a6146106dc578063d05259831461070357600080fd5b80639c52a7f111610145578063ac7475ed1161011f578063ac7475ed14610692578063b4e439ff146106a5578063b6b55f25146106c957600080fd5b80639c52a7f1146106365780639ee6b23014610649578063a2f55ae51461067f57600080fd5b80638e148776116101765780638e148776146105d95780639750834d146106005780639b5e1a3b1461061357600080fd5b80637f51bb1f146105a65780638da5cb5b146105b957600080fd5b80633fd8cc4e1161024a5780635ae81ce9116101fe57806360536172116101d8578063605361721461055d57806378117736146105655780637ebbd8cc1461059357600080fd5b80635ae81ce91461050c5780635b5a64a514610537578063600a0c561461054a57600080fd5b806347310a2b1161022f57806347310a2b146104a357806348abced7146104d957806350fdbcd8146104f957600080fd5b80633fd8cc4e1461045b578063408cff501461049057600080fd5b80632ab21926116102a1578063344a7c3511610286578063344a7c35146103d057806338ff891e1461040357806339df81d21461041657600080fd5b80632ab21926146103aa5780632e1a7d4d146103bd57600080fd5b80630a90e179116102d25780630a90e1791461032f5780631da1e5f81461034257806327e235e31461035557600080fd5b806309eca636146102ee5780630a02dcc714610303575b600080fd5b6103016102fc366004612df3565b6107f1565b005b610316610311366004612e2b565b610801565b6040516103269493929190612eb2565b60405180910390f35b61030161033d366004613015565b61096d565b61030161035036600461305e565b6109a8565b61039c6103633660046130db565b73ffffffffffffffffffffffffffffffffffffffff90811660009081526008602090815260408083206004549094168352929052205490565b604051908152602001610326565b6103016103b83660046130ff565b6109ce565b6103016103cb366004612e2b565b6109e3565b6103f36103de366004612e2b565b600a6020526000908152604090205460ff1681565b6040519015158152602001610326565b610301610411366004613162565b610a1b565b6004546104369073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610326565b61047e6104693660046130db565b60026020526000908152604090205460ff1681565b60405160ff9091168152602001610326565b61030161049e3660046131fc565b610a3f565b6104366104b13660046130db565b600e6020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b6104ec6104e7366004612e2b565b610ba5565b6040516103269190613288565b61030161050736600461329b565b610c3f565b61039c61051a3660046132bd565b600860209081526000928352604080842090915290825290205481565b6103016105453660046130db565b610c68565b6103016105583660046132f6565b610d06565b610301610d24565b610578610573366004613322565b610e4e565b60408051938452602084019290925290820152606001610326565b6104ec6105a1366004612e2b565b610e6e565b6103016105b43660046130db565b610e87565b6000546104369073ffffffffffffffffffffffffffffffffffffffff1681565b6104367f000000000000000000000000000000000000000000000000000000000000000081565b61057861060e3660046132f6565b610f28565b6103f36106213660046130db565b600c6020526000908152604090205460ff1681565b6103016106443660046130db565b610f62565b610436610657366004612e2b565b600b6020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b61030161068d3660046130db565b611002565b6103016106a03660046130db565b6110a5565b6106b86106b3366004612e2b565b611175565b604051610326959493929190613364565b6103016106d7366004612e2b565b61153c565b6104367f000000000000000000000000000000000000000000000000000000000000000081565b6103016107113660046133d0565b61156b565b6103016107243660046130db565b61159c565b6001546104369073ffffffffffffffffffffffffffffffffffffffff1681565b61030161075736600461342a565b6117ab565b61030161076a366004613474565b6117c0565b61030161077d3660046132f6565b611b29565b6104366107903660046130db565b600d6020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b6103016107c63660046134ea565b611b3b565b6103016107d93660046130db565b611b6a565b6103016107ec36600461351a565b611c01565b6107fc838383611c32565b505050565b6005818154811061081157600080fd5b60009182526020909120600490910201805460018201805473ffffffffffffffffffffffffffffffffffffffff90921693509061084d90613579565b80601f016020809104026020016040519081016040528092919081815260200182805461087990613579565b80156108c65780601f1061089b576101008083540402835291602001916108c6565b820191906000526020600020905b8154815290600101906020018083116108a957829003601f168201915b5050506002840154600385018054949560ff9092169491935091506108ea90613579565b80601f016020809104026020016040519081016040528092919081815260200182805461091690613579565b80156109635780601f1061093857610100808354040283529160200191610963565b820191906000526020600020905b81548152906001019060200180831161094657829003601f168201915b5050505050905084565b610975611cad565b60045461099e9033908590859073ffffffffffffffffffffffffffffffffffffffff1685611d20565b6107fc6001600355565b6109b0611cad565b6109bd8585858585611d20565b6109c76001600355565b5050505050565b6109d6611cad565b6109bd8585858585611ec4565b6109eb611cad565b600454610a0e9073ffffffffffffffffffffffffffffffffffffffff16826123c5565b610a186001600355565b50565b610a23611cad565b610a2f848484846125b1565b610a396001600355565b50505050565b610a48866126dc565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600f60205260408120549003610adb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f736572766963652070726f7669646572206e6f7420657869737473000000000060448201526064015b60405180910390fd5b6000868152601160205260409020610af483858361361a565b506000868152601060205260409020610b0e85878361361a565b506000868152600b60205260409081902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff84161790555186907fc81bf83ae19700ed8354672d41b413fb5428a7608dcfddcb1ff1718bb584b87b90610b95908890889088908890889061377d565b60405180910390a2505050505050565b60106020526000908152604090208054610bbe90613579565b80601f0160208091040260200160405190810160405280929190818152602001828054610bea90613579565b8015610c375780601f10610c0c57610100808354040283529160200191610c37565b820191906000526020600020905b815481529060010190602001808311610c1a57829003601f168201915b505050505081565b600454610c6490839073ffffffffffffffffffffffffffffffffffffffff1683611c32565b5050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610c8c57600080fd5b600480547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527faba379270b543cc95d13a917cc25b32e681fbf7975a6be7c1ca7acca52801810906020015b60405180910390a150565b610d0e611cad565b610d1a333384846125b1565b610c646001600355565b60015473ffffffffffffffffffffffffffffffffffffffff163314610dcb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610ad2565b600180546000805473ffffffffffffffffffffffffffffffffffffffff83167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b6000806000610e5e86868661280f565b9250925092505b93509350939050565b60116020526000908152604090208054610bbe90613579565b336000908152600c602052604090205460ff16610ea357600080fd5b336000818152600e602090815260409182902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86169081179091558251938452908301527fd101a15f9e9364a1c0a7c4cc8eb4cd9220094e83353915b0c74e09f72ec73edb9101610cfb565b60045460009081908190610f55908690869073ffffffffffffffffffffffffffffffffffffffff1661280f565b9250925092509250925092565b60005473ffffffffffffffffffffffffffffffffffffffff163314610f8657600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a78849101610cfb565b60005473ffffffffffffffffffffffffffffffffffffffff16331461102657600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf59101610cfb565b336000908152600c602052604090205460ff16806110e75750336000908152600d602052604090205473ffffffffffffffffffffffffffffffffffffffff1615155b6110f057600080fd5b336000818152600d602090815260409182902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86169081179091558251938452908301527ff7fa3b6184cd955c4d8db1b118f541d29ad3cde98ac41ffac1864077b27acc5b9101610cfb565b60608060606000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16636352211e876040518263ffffffff1660e01b81526004016111d891815260200190565b602060405180830381865afa1580156111f5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061121991906137cd565b600087815260106020526040902080549193509061123690613579565b80601f016020809104026020016040519081016040528092919081815260200182805461126290613579565b80156112af5780601f10611284576101008083540402835291602001916112af565b820191906000526020600020905b81548152906001019060200180831161129257829003601f168201915b50505060008981526011602052604090208054939750926112d292509050613579565b80601f01602080910402602001604051908101604052809291908181526020018280546112fe90613579565b801561134b5780601f106113205761010080835404028352916020019161134b565b820191906000526020600020905b81548152906001019060200180831161132e57829003601f168201915b5050506000898152600b602090815260408083205473ffffffffffffffffffffffffffffffffffffffff16808452600f90925290912054600580549598509195509093909250821090506113a1576113a16137ea565b906000526020600020906004020160030180546113bd90613579565b80601f01602080910402602001604051908101604052809291908181526020018280546113e990613579565b80156114365780601f1061140b57610100808354040283529160200191611436565b820191906000526020600020905b81548152906001019060200180831161141957829003601f168201915b50506040517f636921cf000000000000000000000000000000000000000000000000000000008152600481018b9052939850507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff169263636921cf92506024019050600060405180830381865afa1580156114ca573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526115109190810190613819565b85604051602001611522929190613890565b604051602081830303815290604052945091939590929450565b611544611cad565b600454610a0e903390819073ffffffffffffffffffffffffffffffffffffffff16846125b1565b611573611cad565b600454610a2f9085908590859073ffffffffffffffffffffffffffffffffffffffff1685611d20565b3360009081526002602052604090205460ff16600114806115d4575060005473ffffffffffffffffffffffffffffffffffffffff1633145b611660576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610ad2565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600f6020526040902054806116ed576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f4e6f7420736572766963652070726f76696465720000000000000000000000006044820152606401610ad2565b600060058281548110611702576117026137ea565b600091825260208083206004929092029091016002810180547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0090811690915573ffffffffffffffffffffffffffffffffffffffff8716808552600c84526040808620805490931690925581519081529283019390935292507fbc2307230f41bcac9cb725c21f84ae39712b7788c1e8a3057861eeafe95db40f910160405180910390a1505050565b6117b3611cad565b610a2f3385858585611d20565b3360009081526002602052604090205460ff16600114806117f8575060005473ffffffffffffffffffffffffffffffffffffffff1633145b611884576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610ad2565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600f602052604081205490819003611a32576005805473ffffffffffffffffffffffffffffffffffffffff8681166000818152600f602090815260408083208690558051608081018252938452908301898152600191840182905260608401899052908501865594905280517f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0600490940293840180547fffffffffffffffffffffffff00000000000000000000000000000000000000001691909316178255925190917f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db1019061199190826138e8565b5060408201516002820180547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016911515919091179055606082015160038201906119dc90826138e8565b50505073ffffffffffffffffffffffffffffffffffffffff84166000818152600e6020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169091179055611a9a565b600060058281548110611a4757611a476137ea565b60009182526020909120600260049092020190810180547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660019081179091559091508101611a9785826138e8565b50505b73ffffffffffffffffffffffffffffffffffffffff84166000818152600c602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660019081179091558251938452908301527fbc2307230f41bcac9cb725c21f84ae39712b7788c1e8a3057861eeafe95db40f910160405180910390a150505050565b611b31611cad565b610d1a82826123c5565b611b43611cad565b60045461099e908490849073ffffffffffffffffffffffffffffffffffffffff16846125b1565b60005473ffffffffffffffffffffffffffffffffffffffff163314611b8e57600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b90602001610cfb565b611c09611cad565b600454610a2f9085908590859073ffffffffffffffffffffffffffffffffffffffff1685611ec4565b336000908152600960209081526040808320868452825280832073ffffffffffffffffffffffffffffffffffffffff861680855290835292819020849055805192835290820183905284917f96b68e8bafd29a13be28eb36226b094d2c5f920b1488b6d5369a4bde02e20b28910160405180910390a2505050565b600260035403611d19576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610ad2565b6002600355565b60008111611d8a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f496e76616c696420616d6f756e740000000000000000000000000000000000006044820152606401610ad2565b83516020808601919091206000818152600a90925260409091205460ff1615611e0f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f496e766f69636520686173206265656e20736574746c656400000000000000006044820152606401610ad2565b6000818152600a6020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905573ffffffffffffffffffffffffffffffffffffffff8088168452600e90925290912054611e7d9185811691899116856128cb565b7f39296dbf32218993063845152381e7659979b64c3ce2d0f4c8eb06a25581eb6a8587868686604051611eb4959493929190613a02565b60405180910390a1505050505050565b60008111611f2e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f496e76616c696420616d6f756e740000000000000000000000000000000000006044820152606401610ad2565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260086020908152604080832093861683529290522054811115611fca576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f496e73756666696369656e742066756e647300000000000000000000000000006044820152606401610ad2565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260066020908152604080832087845282528083209386168352929052205481906120149062278d00613a7f565b421061205c5773ffffffffffffffffffffffffffffffffffffffff808616600090815260066020908152604080832088845282528083209387168352929052204290556120a4565b73ffffffffffffffffffffffffffffffffffffffff80861660009081526007602090815260408083208884528252808320938716835292905220546120a19082613a7f565b90505b73ffffffffffffffffffffffffffffffffffffffff8086166000818152600760209081526040808320898452825280832094881680845294825280832086905592825260098152828220888352815282822093825292909252902054811115612169576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f496e73756666696369656e7420617070726f7665642066756e647300000000006044820152606401610ad2565b6000848152600b602090815260408083205473ffffffffffffffffffffffffffffffffffffffff908116808552600d909352922054909116338214806121c457503373ffffffffffffffffffffffffffffffffffffffff8216145b61222a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4e6f742074686520736572766963652070726f766964657200000000000000006044820152606401610ad2565b87516020808a01919091206000818152600a90925260409091205460ff16156122af576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f496e766f69636520686173206265656e20736574746c656400000000000000006044820152606401610ad2565b6000818152600a6020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905573ffffffffffffffffffffffffffffffffffffffff808c16845260088352818420908a168452909152812054612320908790613a98565b73ffffffffffffffffffffffffffffffffffffffff808b1660009081526008602090815260408083208c85168085529083528184208690558985168452600e9092529091205492935061237692909116886129a7565b7f5be1e9caf73f18183388b0d4025ee4b62482ddbfee34e5d8ccf04d0f3bbc7a8a8a8a8a878b8b876040516123b19796959493929190613aab565b60405180910390a150505050505050505050565b6000811161242f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f496e76616c696420616d6f756e740000000000000000000000000000000000006044820152606401610ad2565b33600081815260086020908152604080832073ffffffffffffffffffffffffffffffffffffffff871684529091529020548211156124c9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f496e73756666696369656e742066756e647300000000000000000000000000006044820152606401610ad2565b73ffffffffffffffffffffffffffffffffffffffff8082166000908152600860209081526040808320938716835292905290812054612509908490613a98565b73ffffffffffffffffffffffffffffffffffffffff808416600090815260086020908152604080832093891680845293909152902082905590915061254f9083856129a7565b6040805173ffffffffffffffffffffffffffffffffffffffff868116825260208201869052918101839052908316907ff341246adaac6f497bc2a656f546ab9e182111d630394f0c57c710a59a2cb5679060600160405180910390a250505050565b6000811161261b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f496e76616c696420616d6f756e740000000000000000000000000000000000006044820152606401610ad2565b73ffffffffffffffffffffffffffffffffffffffff8084166000908152600860209081526040808320938616835292905220546126598584846129fd565b915060006126678383613a7f565b73ffffffffffffffffffffffffffffffffffffffff8681166000818152600860209081526040808320948a16808452948252918290208590558151938452830187905282018390529192507fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d790606001610b95565b6040517f6352211e000000000000000000000000000000000000000000000000000000008152600481018290526000907f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1690636352211e90602401602060405180830381865afa15801561276a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061278e91906137cd565b90503373ffffffffffffffffffffffffffffffffffffffff821614610c64576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f4e6f742074686520746f6b656e206f776e6572000000000000000000000000006044820152606401610ad2565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526009602090815260408083208784528252808320948616808452948252808320549383526006825280832087845282528083209483529390529182205490916128788262278d00613a7f565b421061288657506000610e65565b5073ffffffffffffffffffffffffffffffffffffffff808616600090815260076020908152604080832088845282528083209387168352929052205493509350939050565b60405173ffffffffffffffffffffffffffffffffffffffff80851660248301528316604482015260648101829052610a399085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152612b54565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526107fc9084907fa9059cbb0000000000000000000000000000000000000000000000000000000090606401612925565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8416906370a0823190602401602060405180830381865afa158015612a6a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a8e9190613b09565b9050612ab273ffffffffffffffffffffffffffffffffffffffff84168530856128cb565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa158015612b1e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b429190613b09565b612b4c9190613a98565b949350505050565b6000612bb6826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16612c609092919063ffffffff16565b8051909150156107fc5780806020019051810190612bd49190613b22565b6107fc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610ad2565b6060612b4c8484600085856000808673ffffffffffffffffffffffffffffffffffffffff168587604051612c949190613b44565b60006040518083038185875af1925050503d8060008114612cd1576040519150601f19603f3d011682016040523d82523d6000602084013e612cd6565b606091505b5091509150612ce787838387612cf2565b979650505050505050565b60608315612d88578251600003612d815773ffffffffffffffffffffffffffffffffffffffff85163b612d81576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610ad2565b5081612b4c565b612b4c8383815115612d9d5781518083602001fd5b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ad29190613288565b73ffffffffffffffffffffffffffffffffffffffff81168114610a1857600080fd5b600080600060608486031215612e0857600080fd5b833592506020840135612e1a81612dd1565b929592945050506040919091013590565b600060208284031215612e3d57600080fd5b5035919050565b60005b83811015612e5f578181015183820152602001612e47565b50506000910152565b60008151808452612e80816020860160208601612e44565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b73ffffffffffffffffffffffffffffffffffffffff85168152608060208201526000612ee16080830186612e68565b84151560408401528281036060840152612ce78185612e68565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715612f7157612f71612efb565b604052919050565b600067ffffffffffffffff821115612f9357612f93612efb565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b600082601f830112612fd057600080fd5b8135612fe3612fde82612f79565b612f2a565b818152846020838601011115612ff857600080fd5b816020850160208301376000918101602001919091529392505050565b60008060006060848603121561302a57600080fd5b833567ffffffffffffffff81111561304157600080fd5b61304d86828701612fbf565b9350506020840135612e1a81612dd1565b600080600080600060a0868803121561307657600080fd5b853561308181612dd1565b9450602086013567ffffffffffffffff81111561309d57600080fd5b6130a988828901612fbf565b94505060408601356130ba81612dd1565b925060608601356130ca81612dd1565b949793965091946080013592915050565b6000602082840312156130ed57600080fd5b81356130f881612dd1565b9392505050565b600080600080600060a0868803121561311757600080fd5b853567ffffffffffffffff81111561312e57600080fd5b61313a88828901612fbf565b955050602086013561314b81612dd1565b93506040860135925060608601356130ca81612dd1565b6000806000806080858703121561317857600080fd5b843561318381612dd1565b9350602085013561319381612dd1565b925060408501356131a381612dd1565b9396929550929360600135925050565b60008083601f8401126131c557600080fd5b50813567ffffffffffffffff8111156131dd57600080fd5b6020830191508360208285010111156131f557600080fd5b9250929050565b6000806000806000806080878903121561321557600080fd5b86359550602087013567ffffffffffffffff8082111561323457600080fd5b6132408a838b016131b3565b9097509550604089013591508082111561325957600080fd5b5061326689828a016131b3565b909450925050606087013561327a81612dd1565b809150509295509295509295565b6020815260006130f86020830184612e68565b600080604083850312156132ae57600080fd5b50508035926020909101359150565b600080604083850312156132d057600080fd5b82356132db81612dd1565b915060208301356132eb81612dd1565b809150509250929050565b6000806040838503121561330957600080fd5b823561331481612dd1565b946020939093013593505050565b60008060006060848603121561333757600080fd5b833561334281612dd1565b925060208401359150604084013561335981612dd1565b809150509250925092565b60a08152600061337760a0830188612e68565b82810360208401526133898188612e68565b9050828103604084015261339d8187612e68565b91505073ffffffffffffffffffffffffffffffffffffffff80851660608401528084166080840152509695505050505050565b600080600080608085870312156133e657600080fd5b84356133f181612dd1565b9350602085013567ffffffffffffffff81111561340d57600080fd5b61341987828801612fbf565b93505060408501356131a381612dd1565b6000806000806080858703121561344057600080fd5b843567ffffffffffffffff81111561345757600080fd5b61346387828801612fbf565b945050602085013561319381612dd1565b60008060006060848603121561348957600080fd5b833561349481612dd1565b9250602084013567ffffffffffffffff808211156134b157600080fd5b6134bd87838801612fbf565b935060408601359150808211156134d357600080fd5b506134e086828701612fbf565b9150509250925092565b6000806000606084860312156134ff57600080fd5b833561350a81612dd1565b92506020840135612e1a81612dd1565b6000806000806080858703121561353057600080fd5b843567ffffffffffffffff81111561354757600080fd5b61355387828801612fbf565b945050602085013561356481612dd1565b93969395505050506040820135916060013590565b600181811c9082168061358d57607f821691505b6020821081036135c6577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b601f8211156107fc57600081815260208120601f850160051c810160208610156135f35750805b601f850160051c820191505b81811015613612578281556001016135ff565b505050505050565b67ffffffffffffffff83111561363257613632612efb565b613646836136408354613579565b836135cc565b6000601f84116001811461369857600085156136625750838201355b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600387901b1c1916600186901b1783556109c7565b6000838152602090207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0861690835b828110156136e757868501358255602094850194600190920191016136c7565b5086821015613722577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f88860031b161c19848701351681555b505060018560011b0183555050505050565b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b606081526000613791606083018789613734565b82810360208401526137a4818688613734565b91505073ffffffffffffffffffffffffffffffffffffffff831660408301529695505050505050565b6000602082840312156137df57600080fd5b81516130f881612dd1565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006020828403121561382b57600080fd5b815167ffffffffffffffff81111561384257600080fd5b8201601f8101841361385357600080fd5b8051613861612fde82612f79565b81815285602083850101111561387657600080fd5b613887826020830160208601612e44565b95945050505050565b600083516138a2818460208801612e44565b7f2e0000000000000000000000000000000000000000000000000000000000000090830190815283516138dc816001840160208801612e44565b01600101949350505050565b815167ffffffffffffffff81111561390257613902612efb565b613916816139108454613579565b846135cc565b602080601f83116001811461396957600084156139335750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555613612565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b828110156139b657888601518255948401946001909101908401613997565b50858210156139f257878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b60a081526000613a1560a0830188612e68565b73ffffffffffffffffffffffffffffffffffffffff968716602084015294861660408301525091909316606082015260800191909152919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b80820180821115613a9257613a92613a50565b92915050565b81810381811115613a9257613a92613a50565b60e081526000613abe60e083018a612e68565b73ffffffffffffffffffffffffffffffffffffffff9889166020840152604083019790975250938616606085015291909416608083015260a082019390935260c00191909152919050565b600060208284031215613b1b57600080fd5b5051919050565b600060208284031215613b3457600080fd5b815180151581146130f857600080fd5b60008251613b56818460208701612e44565b919091019291505056fea2646970667358221220b8fd9f78725a7f0ecff2cd435a9052933dec7d234eb8fe8a0e9fbba7c9c1b38464736f6c63430008110033"
    };
});
define("@scom/scom-domain-contract/contracts/DomainMaster.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-domain-contract/contracts/DomainMaster.json.ts"], function (require, exports, eth_contract_5, DomainMaster_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DomainMaster = void 0;
    class DomainMaster extends eth_contract_5.Contract {
        constructor(wallet, address) {
            super(wallet, address, DomainMaster_json_1.default.abi, DomainMaster_json_1.default.bytecode);
            this.assign();
        }
        deploy(params, options) {
            return this.__deploy([params.domain, params.defaultFeeToken, params.spToken], options);
        }
        parseAuthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Authorize").map(e => this.decodeAuthorizeEvent(e));
        }
        decodeAuthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseBillEvent(receipt) {
            return this.parseEvents(receipt, "Bill").map(e => this.decodeBillEvent(e));
        }
        decodeBillEvent(event) {
            let result = event.data;
            return {
                invoiceCid: result.invoiceCid,
                owner: result.owner,
                tokenId: new eth_contract_5.BigNumber(result.tokenId),
                provider: result.provider,
                feeToken: result.feeToken,
                amount: new eth_contract_5.BigNumber(result.amount),
                newBalance: new eth_contract_5.BigNumber(result.newBalance),
                _event: event
            };
        }
        parseDeauthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Deauthorize").map(e => this.decodeDeauthorizeEvent(e));
        }
        decodeDeauthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseDepositEvent(receipt) {
            return this.parseEvents(receipt, "Deposit").map(e => this.decodeDepositEvent(e));
        }
        decodeDepositEvent(event) {
            let result = event.data;
            return {
                account: result.account,
                feeToken: result.feeToken,
                amount: new eth_contract_5.BigNumber(result.amount),
                newBalance: new eth_contract_5.BigNumber(result.newBalance),
                _event: event
            };
        }
        parsePayEvent(receipt) {
            return this.parseEvents(receipt, "Pay").map(e => this.decodePayEvent(e));
        }
        decodePayEvent(event) {
            let result = event.data;
            return {
                invoiceCid: result.invoiceCid,
                owner: result.owner,
                provider: result.provider,
                feeToken: result.feeToken,
                amount: new eth_contract_5.BigNumber(result.amount),
                _event: event
            };
        }
        parseStartOwnershipTransferEvent(receipt) {
            return this.parseEvents(receipt, "StartOwnershipTransfer").map(e => this.decodeStartOwnershipTransferEvent(e));
        }
        decodeStartOwnershipTransferEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseTransferOwnershipEvent(receipt) {
            return this.parseEvents(receipt, "TransferOwnership").map(e => this.decodeTransferOwnershipEvent(e));
        }
        decodeTransferOwnershipEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseUpdateDomainAllowanceEvent(receipt) {
            return this.parseEvents(receipt, "UpdateDomainAllowance").map(e => this.decodeUpdateDomainAllowanceEvent(e));
        }
        decodeUpdateDomainAllowanceEvent(event) {
            let result = event.data;
            return {
                tokenId: new eth_contract_5.BigNumber(result.tokenId),
                feeToken: result.feeToken,
                amount: new eth_contract_5.BigNumber(result.amount),
                _event: event
            };
        }
        parseUpdateDomainInfoEvent(receipt) {
            return this.parseEvents(receipt, "UpdateDomainInfo").map(e => this.decodeUpdateDomainInfoEvent(e));
        }
        decodeUpdateDomainInfoEvent(event) {
            let result = event.data;
            return {
                tokenId: new eth_contract_5.BigNumber(result.tokenId),
                customDomain: result.customDomain,
                cid: result.cid,
                serviceProvider: result.serviceProvider,
                _event: event
            };
        }
        parseUpdateFeeTokenEvent(receipt) {
            return this.parseEvents(receipt, "UpdateFeeToken").map(e => this.decodeUpdateFeeTokenEvent(e));
        }
        decodeUpdateFeeTokenEvent(event) {
            let result = event.data;
            return {
                feeToken: result.feeToken,
                _event: event
            };
        }
        parseUpdateOperatorEvent(receipt) {
            return this.parseEvents(receipt, "UpdateOperator").map(e => this.decodeUpdateOperatorEvent(e));
        }
        decodeUpdateOperatorEvent(event) {
            let result = event.data;
            return {
                provider: result.provider,
                operator: result.operator,
                _event: event
            };
        }
        parseUpdateServiceProviderEvent(receipt) {
            return this.parseEvents(receipt, "UpdateServiceProvider").map(e => this.decodeUpdateServiceProviderEvent(e));
        }
        decodeUpdateServiceProviderEvent(event) {
            let result = event.data;
            return {
                provider: result.provider,
                active: result.active,
                _event: event
            };
        }
        parseUpdateTreasuryEvent(receipt) {
            return this.parseEvents(receipt, "UpdateTreasury").map(e => this.decodeUpdateTreasuryEvent(e));
        }
        decodeUpdateTreasuryEvent(event) {
            let result = event.data;
            return {
                provider: result.provider,
                treasury: result.treasury,
                _event: event
            };
        }
        parseWithdrawEvent(receipt) {
            return this.parseEvents(receipt, "Withdraw").map(e => this.decodeWithdrawEvent(e));
        }
        decodeWithdrawEvent(event) {
            let result = event.data;
            return {
                account: result.account,
                feeToken: result.feeToken,
                amount: new eth_contract_5.BigNumber(result.amount),
                newBalance: new eth_contract_5.BigNumber(result.newBalance),
                _event: event
            };
        }
        assign() {
            let balances_call = async (owner, options) => {
                let result = await this.call('balances', [owner], options);
                return new eth_contract_5.BigNumber(result);
            };
            this.balances = balances_call;
            let balancesWithFeeTokenParams = (params) => [params.param1, params.param2];
            let balancesWithFeeToken_call = async (params, options) => {
                let result = await this.call('balancesWithFeeToken', balancesWithFeeTokenParams(params), options);
                return new eth_contract_5.BigNumber(result);
            };
            this.balancesWithFeeToken = balancesWithFeeToken_call;
            let customDomains_call = async (param1, options) => {
                let result = await this.call('customDomains', [this.wallet.utils.toString(param1)], options);
                return result;
            };
            this.customDomains = customDomains_call;
            let defaultFeeToken_call = async (options) => {
                let result = await this.call('defaultFeeToken', [], options);
                return result;
            };
            this.defaultFeeToken = defaultFeeToken_call;
            let domain_call = async (options) => {
                let result = await this.call('domain', [], options);
                return result;
            };
            this.domain = domain_call;
            let domainAllowanceParams = (params) => [params.owner, this.wallet.utils.toString(params.tokenId)];
            let domainAllowance_call = async (params, options) => {
                let result = await this.call('domainAllowance', domainAllowanceParams(params), options);
                return {
                    allowance: new eth_contract_5.BigNumber(result.allowance),
                    billedDate: new eth_contract_5.BigNumber(result.billedDate),
                    billedAmount: new eth_contract_5.BigNumber(result.billedAmount)
                };
            };
            this.domainAllowance = domainAllowance_call;
            let domainAllowanceWithFeeTokenParams = (params) => [params.owner, this.wallet.utils.toString(params.tokenId), params.feeToken];
            let domainAllowanceWithFeeToken_call = async (params, options) => {
                let result = await this.call('domainAllowanceWithFeeToken', domainAllowanceWithFeeTokenParams(params), options);
                return {
                    allowance: new eth_contract_5.BigNumber(result.allowance),
                    billedDate: new eth_contract_5.BigNumber(result.billedDate),
                    billedAmount: new eth_contract_5.BigNumber(result.billedAmount)
                };
            };
            this.domainAllowanceWithFeeToken = domainAllowanceWithFeeToken_call;
            let domainCids_call = async (param1, options) => {
                let result = await this.call('domainCids', [this.wallet.utils.toString(param1)], options);
                return result;
            };
            this.domainCids = domainCids_call;
            let domainInfo_call = async (tokenId, options) => {
                let result = await this.call('domainInfo', [this.wallet.utils.toString(tokenId)], options);
                return {
                    domainName: result.domainName,
                    customDomain: result.customDomain,
                    cid: result.cid,
                    owner: result.owner,
                    serviceProvider: result.serviceProvider
                };
            };
            this.domainInfo = domainInfo_call;
            let domainServiceProviders_call = async (param1, options) => {
                let result = await this.call('domainServiceProviders', [this.wallet.utils.toString(param1)], options);
                return result;
            };
            this.domainServiceProviders = domainServiceProviders_call;
            let isActiveProvider_call = async (param1, options) => {
                let result = await this.call('isActiveProvider', [param1], options);
                return result;
            };
            this.isActiveProvider = isActiveProvider_call;
            let isInvoiceSettled_call = async (param1, options) => {
                let result = await this.call('isInvoiceSettled', [this.wallet.utils.stringToBytes32(param1)], options);
                return result;
            };
            this.isInvoiceSettled = isInvoiceSettled_call;
            let isPermitted_call = async (param1, options) => {
                let result = await this.call('isPermitted', [param1], options);
                return new eth_contract_5.BigNumber(result);
            };
            this.isPermitted = isPermitted_call;
            let newOwner_call = async (options) => {
                let result = await this.call('newOwner', [], options);
                return result;
            };
            this.newOwner = newOwner_call;
            let owner_call = async (options) => {
                let result = await this.call('owner', [], options);
                return result;
            };
            this.owner = owner_call;
            let providerOperators_call = async (param1, options) => {
                let result = await this.call('providerOperators', [param1], options);
                return result;
            };
            this.providerOperators = providerOperators_call;
            let providerTreasuries_call = async (param1, options) => {
                let result = await this.call('providerTreasuries', [param1], options);
                return result;
            };
            this.providerTreasuries = providerTreasuries_call;
            let serviceProviders_call = async (param1, options) => {
                let result = await this.call('serviceProviders', [this.wallet.utils.toString(param1)], options);
                return {
                    owner: result.owner,
                    cid: result.cid,
                    active: result.active,
                    domain: result.domain
                };
            };
            this.serviceProviders = serviceProviders_call;
            let spToken_call = async (options) => {
                let result = await this.call('spToken', [], options);
                return result;
            };
            this.spToken = spToken_call;
            let billParams = (params) => [params.invoiceCid, params.owner, this.wallet.utils.toString(params.tokenId), this.wallet.utils.toString(params.amount)];
            let bill_send = async (params, options) => {
                let result = await this.send('bill', billParams(params), options);
                return result;
            };
            let bill_call = async (params, options) => {
                let result = await this.call('bill', billParams(params), options);
                return;
            };
            this.bill = Object.assign(bill_send, {
                call: bill_call
            });
            let billWithFeeTokenParams = (params) => [params.invoiceCid, params.owner, this.wallet.utils.toString(params.tokenId), params.feeToken, this.wallet.utils.toString(params.amount)];
            let billWithFeeToken_send = async (params, options) => {
                let result = await this.send('billWithFeeToken', billWithFeeTokenParams(params), options);
                return result;
            };
            let billWithFeeToken_call = async (params, options) => {
                let result = await this.call('billWithFeeToken', billWithFeeTokenParams(params), options);
                return;
            };
            this.billWithFeeToken = Object.assign(billWithFeeToken_send, {
                call: billWithFeeToken_call
            });
            let deny_send = async (user, options) => {
                let result = await this.send('deny', [user], options);
                return result;
            };
            let deny_call = async (user, options) => {
                let result = await this.call('deny', [user], options);
                return;
            };
            this.deny = Object.assign(deny_send, {
                call: deny_call
            });
            let deposit_send = async (amount, options) => {
                let result = await this.send('deposit', [this.wallet.utils.toString(amount)], options);
                return result;
            };
            let deposit_call = async (amount, options) => {
                let result = await this.call('deposit', [this.wallet.utils.toString(amount)], options);
                return;
            };
            this.deposit = Object.assign(deposit_send, {
                call: deposit_call
            });
            let depositToParams = (params) => [params.from, params.to, this.wallet.utils.toString(params.amount)];
            let depositTo_send = async (params, options) => {
                let result = await this.send('depositTo', depositToParams(params), options);
                return result;
            };
            let depositTo_call = async (params, options) => {
                let result = await this.call('depositTo', depositToParams(params), options);
                return;
            };
            this.depositTo = Object.assign(depositTo_send, {
                call: depositTo_call
            });
            let depositToWithFeeTokenParams = (params) => [params.from, params.to, params.feeToken, this.wallet.utils.toString(params.amount)];
            let depositToWithFeeToken_send = async (params, options) => {
                let result = await this.send('depositToWithFeeToken', depositToWithFeeTokenParams(params), options);
                return result;
            };
            let depositToWithFeeToken_call = async (params, options) => {
                let result = await this.call('depositToWithFeeToken', depositToWithFeeTokenParams(params), options);
                return;
            };
            this.depositToWithFeeToken = Object.assign(depositToWithFeeToken_send, {
                call: depositToWithFeeToken_call
            });
            let depositWithFeeTokenParams = (params) => [params.feeToken, this.wallet.utils.toString(params.amount)];
            let depositWithFeeToken_send = async (params, options) => {
                let result = await this.send('depositWithFeeToken', depositWithFeeTokenParams(params), options);
                return result;
            };
            let depositWithFeeToken_call = async (params, options) => {
                let result = await this.call('depositWithFeeToken', depositWithFeeTokenParams(params), options);
                return;
            };
            this.depositWithFeeToken = Object.assign(depositWithFeeToken_send, {
                call: depositWithFeeToken_call
            });
            let disableServiceProvider_send = async (provider, options) => {
                let result = await this.send('disableServiceProvider', [provider], options);
                return result;
            };
            let disableServiceProvider_call = async (provider, options) => {
                let result = await this.call('disableServiceProvider', [provider], options);
                return;
            };
            this.disableServiceProvider = Object.assign(disableServiceProvider_send, {
                call: disableServiceProvider_call
            });
            let enableServiceProviderParams = (params) => [params.provider, params.cid, params.domainName];
            let enableServiceProvider_send = async (params, options) => {
                let result = await this.send('enableServiceProvider', enableServiceProviderParams(params), options);
                return result;
            };
            let enableServiceProvider_call = async (params, options) => {
                let result = await this.call('enableServiceProvider', enableServiceProviderParams(params), options);
                return;
            };
            this.enableServiceProvider = Object.assign(enableServiceProvider_send, {
                call: enableServiceProvider_call
            });
            let payParams = (params) => [params.invoiceCid, params.provider, this.wallet.utils.toString(params.amount)];
            let pay_send = async (params, options) => {
                let result = await this.send('pay', payParams(params), options);
                return result;
            };
            let pay_call = async (params, options) => {
                let result = await this.call('pay', payParams(params), options);
                return;
            };
            this.pay = Object.assign(pay_send, {
                call: pay_call
            });
            let payFromParams = (params) => [params.from, params.invoiceCid, params.provider, this.wallet.utils.toString(params.amount)];
            let payFrom_send = async (params, options) => {
                let result = await this.send('payFrom', payFromParams(params), options);
                return result;
            };
            let payFrom_call = async (params, options) => {
                let result = await this.call('payFrom', payFromParams(params), options);
                return;
            };
            this.payFrom = Object.assign(payFrom_send, {
                call: payFrom_call
            });
            let payFromWithFeeTokenParams = (params) => [params.from, params.invoiceCid, params.provider, params.feeToken, this.wallet.utils.toString(params.amount)];
            let payFromWithFeeToken_send = async (params, options) => {
                let result = await this.send('payFromWithFeeToken', payFromWithFeeTokenParams(params), options);
                return result;
            };
            let payFromWithFeeToken_call = async (params, options) => {
                let result = await this.call('payFromWithFeeToken', payFromWithFeeTokenParams(params), options);
                return;
            };
            this.payFromWithFeeToken = Object.assign(payFromWithFeeToken_send, {
                call: payFromWithFeeToken_call
            });
            let payWithFeeTokenParams = (params) => [params.invoiceCid, params.provider, params.feeToken, this.wallet.utils.toString(params.amount)];
            let payWithFeeToken_send = async (params, options) => {
                let result = await this.send('payWithFeeToken', payWithFeeTokenParams(params), options);
                return result;
            };
            let payWithFeeToken_call = async (params, options) => {
                let result = await this.call('payWithFeeToken', payWithFeeTokenParams(params), options);
                return;
            };
            this.payWithFeeToken = Object.assign(payWithFeeToken_send, {
                call: payWithFeeToken_call
            });
            let permit_send = async (user, options) => {
                let result = await this.send('permit', [user], options);
                return result;
            };
            let permit_call = async (user, options) => {
                let result = await this.call('permit', [user], options);
                return;
            };
            this.permit = Object.assign(permit_send, {
                call: permit_call
            });
            let setDefaultFeeToken_send = async (defaultFeeToken, options) => {
                let result = await this.send('setDefaultFeeToken', [defaultFeeToken], options);
                return result;
            };
            let setDefaultFeeToken_call = async (defaultFeeToken, options) => {
                let result = await this.call('setDefaultFeeToken', [defaultFeeToken], options);
                return;
            };
            this.setDefaultFeeToken = Object.assign(setDefaultFeeToken_send, {
                call: setDefaultFeeToken_call
            });
            let takeOwnership_send = async (options) => {
                let result = await this.send('takeOwnership', [], options);
                return result;
            };
            let takeOwnership_call = async (options) => {
                let result = await this.call('takeOwnership', [], options);
                return;
            };
            this.takeOwnership = Object.assign(takeOwnership_send, {
                call: takeOwnership_call
            });
            let transferOwnership_send = async (newOwner, options) => {
                let result = await this.send('transferOwnership', [newOwner], options);
                return result;
            };
            let transferOwnership_call = async (newOwner, options) => {
                let result = await this.call('transferOwnership', [newOwner], options);
                return;
            };
            this.transferOwnership = Object.assign(transferOwnership_send, {
                call: transferOwnership_call
            });
            let updateDomainAllowanceParams = (params) => [this.wallet.utils.toString(params.tokenId), this.wallet.utils.toString(params.amount)];
            let updateDomainAllowance_send = async (params, options) => {
                let result = await this.send('updateDomainAllowance', updateDomainAllowanceParams(params), options);
                return result;
            };
            let updateDomainAllowance_call = async (params, options) => {
                let result = await this.call('updateDomainAllowance', updateDomainAllowanceParams(params), options);
                return;
            };
            this.updateDomainAllowance = Object.assign(updateDomainAllowance_send, {
                call: updateDomainAllowance_call
            });
            let updateDomainAllowanceWithFeeTokenParams = (params) => [this.wallet.utils.toString(params.tokenId), params.feeToken, this.wallet.utils.toString(params.amount)];
            let updateDomainAllowanceWithFeeToken_send = async (params, options) => {
                let result = await this.send('updateDomainAllowanceWithFeeToken', updateDomainAllowanceWithFeeTokenParams(params), options);
                return result;
            };
            let updateDomainAllowanceWithFeeToken_call = async (params, options) => {
                let result = await this.call('updateDomainAllowanceWithFeeToken', updateDomainAllowanceWithFeeTokenParams(params), options);
                return;
            };
            this.updateDomainAllowanceWithFeeToken = Object.assign(updateDomainAllowanceWithFeeToken_send, {
                call: updateDomainAllowanceWithFeeToken_call
            });
            let updateDomainInfoParams = (params) => [this.wallet.utils.toString(params.tokenId), params.customDomain, params.cid, params.serviceProvider];
            let updateDomainInfo_send = async (params, options) => {
                let result = await this.send('updateDomainInfo', updateDomainInfoParams(params), options);
                return result;
            };
            let updateDomainInfo_call = async (params, options) => {
                let result = await this.call('updateDomainInfo', updateDomainInfoParams(params), options);
                return;
            };
            this.updateDomainInfo = Object.assign(updateDomainInfo_send, {
                call: updateDomainInfo_call
            });
            let updateOperator_send = async (operator, options) => {
                let result = await this.send('updateOperator', [operator], options);
                return result;
            };
            let updateOperator_call = async (operator, options) => {
                let result = await this.call('updateOperator', [operator], options);
                return;
            };
            this.updateOperator = Object.assign(updateOperator_send, {
                call: updateOperator_call
            });
            let updateTreasury_send = async (treasury, options) => {
                let result = await this.send('updateTreasury', [treasury], options);
                return result;
            };
            let updateTreasury_call = async (treasury, options) => {
                let result = await this.call('updateTreasury', [treasury], options);
                return;
            };
            this.updateTreasury = Object.assign(updateTreasury_send, {
                call: updateTreasury_call
            });
            let withdraw_send = async (amount, options) => {
                let result = await this.send('withdraw', [this.wallet.utils.toString(amount)], options);
                return result;
            };
            let withdraw_call = async (amount, options) => {
                let result = await this.call('withdraw', [this.wallet.utils.toString(amount)], options);
                return;
            };
            this.withdraw = Object.assign(withdraw_send, {
                call: withdraw_call
            });
            let withdrawWithFeeTokenParams = (params) => [params.feeToken, this.wallet.utils.toString(params.amount)];
            let withdrawWithFeeToken_send = async (params, options) => {
                let result = await this.send('withdrawWithFeeToken', withdrawWithFeeTokenParams(params), options);
                return result;
            };
            let withdrawWithFeeToken_call = async (params, options) => {
                let result = await this.call('withdrawWithFeeToken', withdrawWithFeeTokenParams(params), options);
                return;
            };
            this.withdrawWithFeeToken = Object.assign(withdrawWithFeeToken_send, {
                call: withdrawWithFeeToken_call
            });
        }
    }
    exports.DomainMaster = DomainMaster;
    DomainMaster._abi = DomainMaster_json_1.default.abi;
});
define("@scom/scom-domain-contract/contracts/ServiceProviderToken.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-domain-contract/contracts/ServiceProviderToken.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" },
            { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "minter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "_minter", "type": "address" }], "name": "setMintter", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }
        ],
        "bytecode": "60806040523480156200001157600080fd5b506040518060400160405280601481526020017f5365727669636550726f7669646572546f6b656e0000000000000000000000008152506040518060400160405280600381526020016214d41560ea1b815250816003908162000075919062000144565b50600462000084828262000144565b5050600580546001600160a01b031916331790555062000210565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620000ca57607f821691505b602082108103620000eb57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200013f57600081815260208120601f850160051c810160208610156200011a5750805b601f850160051c820191505b818110156200013b5782815560010162000126565b5050505b505050565b81516001600160401b038111156200016057620001606200009f565b6200017881620001718454620000b5565b84620000f1565b602080601f831160018114620001b05760008415620001975750858301515b600019600386901b1c1916600185901b1785556200013b565b600085815260208120601f198616915b82811015620001e157888601518255948401946001909101908401620001c0565b5085821015620002005787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61102680620002206000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806342966c6811610097578063a457c2d711610066578063a457c2d714610258578063a9059cbb1461026b578063c2e343ff1461027e578063dd62ed3e1461029157600080fd5b806342966c68146101e757806370a08231146101fa5780638da5cb5b1461023057806395d89b411461025057600080fd5b806323b872dd116100d357806323b872dd1461019d578063313ce567146101b057806339509351146101bf57806340c10f19146101d257600080fd5b806306fdde03146101055780630754617214610123578063095ea7b31461016857806318160ddd1461018b575b600080fd5b61010d6102d7565b60405161011a9190610dfa565b60405180910390f35b6006546101439073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161011a565b61017b610176366004610e8f565b610369565b604051901515815260200161011a565b6002545b60405190815260200161011a565b61017b6101ab366004610eb9565b610383565b6040516012815260200161011a565b61017b6101cd366004610e8f565b6103a7565b6101e56101e0366004610e8f565b6103f3565b005b6101e56101f5366004610ef5565b610487565b61018f610208366004610f0e565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b6005546101439073ffffffffffffffffffffffffffffffffffffffff1681565b61010d610494565b61017b610266366004610e8f565b6104a3565b61017b610279366004610e8f565b610574565b6101e561028c366004610f0e565b610582565b61018f61029f366004610f30565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b6060600380546102e690610f63565b80601f016020809104026020016040519081016040528092919081815260200182805461031290610f63565b801561035f5780601f106103345761010080835404028352916020019161035f565b820191906000526020600020905b81548152906001019060200180831161034257829003601f168201915b5050505050905090565b600033610377818585610651565b60019150505b92915050565b600033610391858285610805565b61039c8585856108dc565b506001949350505050565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490919061037790829086906103ee908790610fb6565b610651565b60065473ffffffffffffffffffffffffffffffffffffffff163314610479576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f6e6f742066726f6d206d696e746572000000000000000000000000000000000060448201526064015b60405180910390fd5b6104838282610b4b565b5050565b6104913382610c3e565b50565b6060600480546102e690610f63565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490919083811015610567576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f0000000000000000000000000000000000000000000000000000006064820152608401610470565b61039c8286868403610651565b6000336103778185856108dc565b60055473ffffffffffffffffffffffffffffffffffffffff163314610603576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f6e6f742066726f6d206f776e65720000000000000000000000000000000000006044820152606401610470565b6006805473ffffffffffffffffffffffffffffffffffffffff9092167fffffffffffffffffffffffff0000000000000000000000000000000000000000928316179055600580549091169055565b73ffffffffffffffffffffffffffffffffffffffff83166106f3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610470565b73ffffffffffffffffffffffffffffffffffffffff8216610796576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f73730000000000000000000000000000000000000000000000000000000000006064820152608401610470565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff8381166000908152600160209081526040808320938616835292905220547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146108d657818110156108c9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610470565b6108d68484848403610651565b50505050565b73ffffffffffffffffffffffffffffffffffffffff831661097f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610470565b73ffffffffffffffffffffffffffffffffffffffff8216610a22576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610470565b73ffffffffffffffffffffffffffffffffffffffff831660009081526020819052604090205481811015610ad8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610470565b73ffffffffffffffffffffffffffffffffffffffff848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36108d6565b73ffffffffffffffffffffffffffffffffffffffff8216610bc8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610470565b8060026000828254610bda9190610fb6565b909155505073ffffffffffffffffffffffffffffffffffffffff8216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b73ffffffffffffffffffffffffffffffffffffffff8216610ce1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610470565b73ffffffffffffffffffffffffffffffffffffffff821660009081526020819052604090205481811015610d97576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f63650000000000000000000000000000000000000000000000000000000000006064820152608401610470565b73ffffffffffffffffffffffffffffffffffffffff83166000818152602081815260408083208686039055600280548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91016107f8565b600060208083528351808285015260005b81811015610e2757858101830151858201604001528201610e0b565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b803573ffffffffffffffffffffffffffffffffffffffff81168114610e8a57600080fd5b919050565b60008060408385031215610ea257600080fd5b610eab83610e66565b946020939093013593505050565b600080600060608486031215610ece57600080fd5b610ed784610e66565b9250610ee560208501610e66565b9150604084013590509250925092565b600060208284031215610f0757600080fd5b5035919050565b600060208284031215610f2057600080fd5b610f2982610e66565b9392505050565b60008060408385031215610f4357600080fd5b610f4c83610e66565b9150610f5a60208401610e66565b90509250929050565b600181811c90821680610f7757607f821691505b602082108103610fb0577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b8082018082111561037d577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea26469706673582212205c52ab80de1dd6b4c832fcd95da02312601db79f9f053bb453be0bf66ea5066564736f6c63430008110033"
    };
});
define("@scom/scom-domain-contract/contracts/ServiceProviderToken.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-domain-contract/contracts/ServiceProviderToken.json.ts"], function (require, exports, eth_contract_6, ServiceProviderToken_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ServiceProviderToken = void 0;
    class ServiceProviderToken extends eth_contract_6.Contract {
        constructor(wallet, address) {
            super(wallet, address, ServiceProviderToken_json_1.default.abi, ServiceProviderToken_json_1.default.bytecode);
            this.assign();
        }
        deploy(options) {
            return this.__deploy([], options);
        }
        parseApprovalEvent(receipt) {
            return this.parseEvents(receipt, "Approval").map(e => this.decodeApprovalEvent(e));
        }
        decodeApprovalEvent(event) {
            let result = event.data;
            return {
                owner: result.owner,
                spender: result.spender,
                value: new eth_contract_6.BigNumber(result.value),
                _event: event
            };
        }
        parseTransferEvent(receipt) {
            return this.parseEvents(receipt, "Transfer").map(e => this.decodeTransferEvent(e));
        }
        decodeTransferEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                to: result.to,
                value: new eth_contract_6.BigNumber(result.value),
                _event: event
            };
        }
        assign() {
            let allowanceParams = (params) => [params.owner, params.spender];
            let allowance_call = async (params, options) => {
                let result = await this.call('allowance', allowanceParams(params), options);
                return new eth_contract_6.BigNumber(result);
            };
            this.allowance = allowance_call;
            let balanceOf_call = async (account, options) => {
                let result = await this.call('balanceOf', [account], options);
                return new eth_contract_6.BigNumber(result);
            };
            this.balanceOf = balanceOf_call;
            let decimals_call = async (options) => {
                let result = await this.call('decimals', [], options);
                return new eth_contract_6.BigNumber(result);
            };
            this.decimals = decimals_call;
            let minter_call = async (options) => {
                let result = await this.call('minter', [], options);
                return result;
            };
            this.minter = minter_call;
            let name_call = async (options) => {
                let result = await this.call('name', [], options);
                return result;
            };
            this.name = name_call;
            let owner_call = async (options) => {
                let result = await this.call('owner', [], options);
                return result;
            };
            this.owner = owner_call;
            let symbol_call = async (options) => {
                let result = await this.call('symbol', [], options);
                return result;
            };
            this.symbol = symbol_call;
            let totalSupply_call = async (options) => {
                let result = await this.call('totalSupply', [], options);
                return new eth_contract_6.BigNumber(result);
            };
            this.totalSupply = totalSupply_call;
            let approveParams = (params) => [params.spender, this.wallet.utils.toString(params.amount)];
            let approve_send = async (params, options) => {
                let result = await this.send('approve', approveParams(params), options);
                return result;
            };
            let approve_call = async (params, options) => {
                let result = await this.call('approve', approveParams(params), options);
                return result;
            };
            this.approve = Object.assign(approve_send, {
                call: approve_call
            });
            let burn_send = async (amount, options) => {
                let result = await this.send('burn', [this.wallet.utils.toString(amount)], options);
                return result;
            };
            let burn_call = async (amount, options) => {
                let result = await this.call('burn', [this.wallet.utils.toString(amount)], options);
                return;
            };
            this.burn = Object.assign(burn_send, {
                call: burn_call
            });
            let decreaseAllowanceParams = (params) => [params.spender, this.wallet.utils.toString(params.subtractedValue)];
            let decreaseAllowance_send = async (params, options) => {
                let result = await this.send('decreaseAllowance', decreaseAllowanceParams(params), options);
                return result;
            };
            let decreaseAllowance_call = async (params, options) => {
                let result = await this.call('decreaseAllowance', decreaseAllowanceParams(params), options);
                return result;
            };
            this.decreaseAllowance = Object.assign(decreaseAllowance_send, {
                call: decreaseAllowance_call
            });
            let increaseAllowanceParams = (params) => [params.spender, this.wallet.utils.toString(params.addedValue)];
            let increaseAllowance_send = async (params, options) => {
                let result = await this.send('increaseAllowance', increaseAllowanceParams(params), options);
                return result;
            };
            let increaseAllowance_call = async (params, options) => {
                let result = await this.call('increaseAllowance', increaseAllowanceParams(params), options);
                return result;
            };
            this.increaseAllowance = Object.assign(increaseAllowance_send, {
                call: increaseAllowance_call
            });
            let mintParams = (params) => [params.to, this.wallet.utils.toString(params.amount)];
            let mint_send = async (params, options) => {
                let result = await this.send('mint', mintParams(params), options);
                return result;
            };
            let mint_call = async (params, options) => {
                let result = await this.call('mint', mintParams(params), options);
                return;
            };
            this.mint = Object.assign(mint_send, {
                call: mint_call
            });
            let setMintter_send = async (minter, options) => {
                let result = await this.send('setMintter', [minter], options);
                return result;
            };
            let setMintter_call = async (minter, options) => {
                let result = await this.call('setMintter', [minter], options);
                return;
            };
            this.setMintter = Object.assign(setMintter_send, {
                call: setMintter_call
            });
            let transferParams = (params) => [params.to, this.wallet.utils.toString(params.amount)];
            let transfer_send = async (params, options) => {
                let result = await this.send('transfer', transferParams(params), options);
                return result;
            };
            let transfer_call = async (params, options) => {
                let result = await this.call('transfer', transferParams(params), options);
                return result;
            };
            this.transfer = Object.assign(transfer_send, {
                call: transfer_call
            });
            let transferFromParams = (params) => [params.from, params.to, this.wallet.utils.toString(params.amount)];
            let transferFrom_send = async (params, options) => {
                let result = await this.send('transferFrom', transferFromParams(params), options);
                return result;
            };
            let transferFrom_call = async (params, options) => {
                let result = await this.call('transferFrom', transferFromParams(params), options);
                return result;
            };
            this.transferFrom = Object.assign(transferFrom_send, {
                call: transferFrom_call
            });
        }
    }
    exports.ServiceProviderToken = ServiceProviderToken;
    ServiceProviderToken._abi = ServiceProviderToken_json_1.default.abi;
});
define("@scom/scom-domain-contract/contracts/index.ts", ["require", "exports", "@scom/scom-domain-contract/contracts/@openzeppelin/contracts/token/ERC20/ERC20.ts", "@scom/scom-domain-contract/contracts/@openzeppelin/contracts/token/ERC721/ERC721.ts", "@scom/scom-domain-contract/contracts/Authorization.ts", "@scom/scom-domain-contract/contracts/Domain.ts", "@scom/scom-domain-contract/contracts/DomainMaster.ts", "@scom/scom-domain-contract/contracts/ServiceProviderToken.ts"], function (require, exports, ERC20_1, ERC721_1, Authorization_1, Domain_1, DomainMaster_1, ServiceProviderToken_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ServiceProviderToken = exports.DomainMaster = exports.Domain = exports.Authorization = exports.ERC721 = exports.ERC20 = void 0;
    Object.defineProperty(exports, "ERC20", { enumerable: true, get: function () { return ERC20_1.ERC20; } });
    Object.defineProperty(exports, "ERC721", { enumerable: true, get: function () { return ERC721_1.ERC721; } });
    Object.defineProperty(exports, "Authorization", { enumerable: true, get: function () { return Authorization_1.Authorization; } });
    Object.defineProperty(exports, "Domain", { enumerable: true, get: function () { return Domain_1.Domain; } });
    Object.defineProperty(exports, "DomainMaster", { enumerable: true, get: function () { return DomainMaster_1.DomainMaster; } });
    Object.defineProperty(exports, "ServiceProviderToken", { enumerable: true, get: function () { return ServiceProviderToken_1.ServiceProviderToken; } });
});
define("@scom/scom-domain-contract", ["require", "exports", "@scom/scom-domain-contract/contracts/index.ts", "@ijstech/eth-wallet"], function (require, exports, Contracts, eth_wallet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deploy = exports.DefaultDeployOptions = exports.Contracts = void 0;
    exports.Contracts = Contracts;
    ;
    ;
    var progressHandler;
    exports.DefaultDeployOptions = {
        baseURI: "",
        feeToken: "",
        mintFee: "5000000000000000000",
        mintFeeTo: ""
    };
    function reportProgress(msg) {
        if (progressHandler)
            progressHandler(msg);
    }
    ;
    async function deploy(wallet, options, onProgress) {
        progressHandler = onProgress;
        let domainContract = new Contracts.Domain(wallet);
        let spTokenContract = new Contracts.ServiceProviderToken(wallet);
        let valutContract = new Contracts.DomainMaster(wallet);
        reportProgress('Deploy Domain Contract');
        let domain = await domainContract.deploy({
            baseURI: options.baseURI,
            mintFee: new eth_wallet_1.BigNumber(options.mintFee),
            mintFeeTo: options.mintFeeTo,
            mintFeeToken: options.feeToken
        });
        reportProgress('Domain Contract deployed ' + domain);
        reportProgress('Deploy ServiceProviderToken Contract');
        let spToken = await spTokenContract.deploy();
        reportProgress('ServiceProviderToken Contract deployed ' + spToken);
        reportProgress('Deploy DomainMaster Contract');
        let master = await valutContract.deploy({ domain: domain, defaultFeeToken: options.feeToken, spToken: spToken });
        reportProgress('DomainMaster Contract deployed ' + master);
        await spTokenContract.setMintter(master);
        return {
            domain,
            master,
            spToken
        };
    }
    exports.deploy = deploy;
    ;
    exports.default = {
        Contracts,
        deploy,
        DefaultDeployOptions: exports.DefaultDeployOptions
    };
});
