define("@scom/dapp-sample/module1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.test = void 0;
    ///<amd-module name='@scom/dapp-sample/module1'/> 
    const test = "abc";
    exports.test = test;
    exports.default = test;
});
