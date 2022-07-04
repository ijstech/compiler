define("hello", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hello = void 0;
    function hello() {
        return "Hello World";
    }
    exports.hello = hello;
});
define("form", ["require", "exports", "@ijstech/components", "hello"], function (require, exports, components_1, hello_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hello extends components_1.Module {
        buttonClick() {
            alert(hello_1.hello());
        }
        ;
        render() {
            return this.$render("i-panel", null,
                this.$render("i-button", { onClick: this.buttonClick }));
        }
    }
    exports.default = Hello;
});
