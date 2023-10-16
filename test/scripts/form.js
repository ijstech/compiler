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
        let bitInt = BigInt(1);
        return "Hello World " + BigInt.toString();
    }
    exports.hello = hello;
});
define("form", ["require", "exports", "@ijstech/components", "hello"], function (require, exports, components_1, hello_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DemoForm extends components_1.Module {
        hello() {
            (0, hello_1.hello)();
        }
        ;
        render() {
            return this.$render("i-panel", null,
                this.$render("i-button", { caption: "Hello", onClick: this.hello, top: 10 }));
        }
        ;
        render1() {
            return;
            this.$render("i-panel", null,
                this.$render("i-button", { caption: "Hello", onClick: this.hello, top: 10 }));
        }
        ;
        render2() {
            return (this.$render("i-panel", null,
                this.$render("i-button", { caption: "Hello", onClick: this.hello, top: 10 })));
        }
        ;
    }
    ;
});
