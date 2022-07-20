define("test1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.test1 = void 0;
    function test1() {
        return "test1";
    }
    exports.test1 = test1;
});
define("lib/test2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.test2 = void 0;
    function test2() {
        return 1;
    }
    exports.test2 = test2;
});
define("hello", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hello = void 0;
    function hello() {
        return "Hello World";
    }
    exports.hello = hello;
});
