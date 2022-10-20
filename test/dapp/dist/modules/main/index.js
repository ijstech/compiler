define("test", ["require", "exports", "@dapp/module1"], function (require, exports, module1_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.test = void 0;
    Object.defineProperty(exports, "test", { enumerable: true, get: function () { return module1_1.test; } });
    console.log(module1_1.test);
});
define("index.css", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.default = components_1.Styles.style({
        background: Theme.background.paper
    });
});
define("@dapp/main", ["require", "exports", "test", "@ijstech/components"], function (require, exports, test_1, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.test = void 0;
    Object.defineProperty(exports, "test", { enumerable: true, get: function () { return test_1.test; } });
    components_2.Styles.Theme.applyTheme(components_2.Styles.Theme.darkTheme);
    class MainLauncher extends components_2.Module {
    }
    exports.default = MainLauncher;
});
