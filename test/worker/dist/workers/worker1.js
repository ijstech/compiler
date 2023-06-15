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
define("index", ["require", "exports", "@ijstech/wallet", "hello"], function (require, exports, wallet_1, hello_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    wallet_1 = __importDefault(wallet_1);
    class Worker {
        async process(session, data) {
            let chainId = await wallet_1.default.getChainId();
            (0, hello_1.hello)('chainId: ' + chainId);
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
