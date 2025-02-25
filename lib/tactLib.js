"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TactCompiler = void 0;
const components_1 = require("@ijstech/components");
let _compiler;
exports.TactCompiler = _compiler;
const path = components_1.application.currentModuleDir;
components_1.RequireJS.config({
    paths: {
        '@compiler': `${path}/lib/tact-compiler.js`,
    }
});
components_1.RequireJS.require(['@compiler'], (result) => {
    exports.TactCompiler = _compiler = result;
    exports.enableFeatures = result.enableFeatures;
    exports.build = result.build;
    exports.precompile = result.precompile;
    exports.TactError = result.TactError;
    exports.TactCompilationError = result.TactCompilationError;
    exports.parseConfig = result.parseConfig;
    exports.verifyConfig = result.verifyConfig;
    exports.createVirtualFileSystem = result.createVirtualFileSystem;
    exports.ConfigProject = result.ConfigProject;
    exports.Config = result.Config;
    exports.VirtualFileSystem = result.VirtualFileSystem;
});
