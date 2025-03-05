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

  async function compileTactContract(storage: any, config: any) {
    const files: Record<string, string> = {};
    for (const cfg of config.projects) {
      const mainPath = cfg.path;
      const mainContent = await storage.readFile(mainPath);
      if (mainContent) {
        const encoder = new TextEncoder();
        files[mainPath] = btoa(String.fromCharCode(...encoder.encode(mainContent)));
      }
    }

    try {
      await result.run({ config, files });

      const formatedFiles: Record<string, string> = {};
      for (let key in files) {
        if (key.startsWith('/')) key = key.substring(1);
        const value = files[key];
        formatedFiles[key] = value ? atob(value) : '';
      }

      return formatedFiles;
    } catch (error) {
      console.error('Compilation failed:', error);
      return {};
    }
  }

  (window as any).compileTactContract = compileTactContract;
});

export {
  _compiler as TactCompiler,
};