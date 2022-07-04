"use strict";
function hello() {
    return "Hello World";
}
define("form", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hello extends components_1.Module {
        buttonClick() {
            //button click event handler
        }
        ;
        render() {
            return this.$render("i-panel", null,
                this.$render("i-button", { onClick: this.buttonClick }));
        }
    }
    exports.default = Hello;
});
