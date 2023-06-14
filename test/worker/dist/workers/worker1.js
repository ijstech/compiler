var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("hello", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hello = void 0;
    function hello(value) {
        console.dir(value);
    }
    exports.hello = hello;
});
define("index", ["require", "exports", "@scom/scom-domain-contract", "@ijstech/wallet", "hello"], function (require, exports, scom_domain_contract_1, wallet_1, hello_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    wallet_1 = __importDefault(wallet_1);
    class Worker {
        async process(session, data) {
            let contract;
            contract = new scom_domain_contract_1.Contracts.Domain(wallet_1.default);
            (0, hello_1.hello)('Hello from worker');
            console.dir('### data ###');
            console.dir(data);
            console.dir('### session.params ###');
            console.dir(session.params);
            session.params.updated = new Date();
        }
        ;
    }
    exports.default = Worker;
    ;
});
