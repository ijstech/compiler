define("@scom/dapp-sample/main/test.ts", ["require", "exports", "@scom/dapp-sample/module1"], function (require, exports, module1_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.test = void 0;
    Object.defineProperty(exports, "test", { enumerable: true, get: function () { return module1_1.test; } });
    console.log(module1_1.test);
});
define("@scom/dapp-sample/main/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.default = components_1.Styles.style({
        background: Theme.background.paper
    });
});
define("@scom/dapp-sample/main", ["require", "exports", "@scom/dapp-sample/main/test.ts", "@ijstech/components", "@scom/dapp-sample/module1"], function (require, exports, test_1, components_2, module1_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.test = void 0;
    Object.defineProperty(exports, "test", { enumerable: true, get: function () { return test_1.test; } });
    components_2.Styles.Theme.applyTheme(components_2.Styles.Theme.darkTheme);
    class MainLauncher extends components_2.Module {
        init() {
            super.init();
            console.dir(module1_2.default);
        }
        render() {
            return this.$render("i-panel", null,
                this.$render("i-button", { caption: "Button 1" }));
        }
    }
    exports.default = MainLauncher;
});
