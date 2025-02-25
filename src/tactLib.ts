import { RequireJS, application } from '@ijstech/components';

let _compiler: any;
const path = application.currentModuleDir;

RequireJS.config({
  paths: {
    '@compiler': `${path}/lib/tact-compiler.js`,
  }
});

RequireJS.require(['@compiler'], (result: any) => {
  _compiler = result;
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

export {
  _compiler as TactCompiler,
};