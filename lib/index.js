"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = exports.PackageManager = exports.resolveAbsolutePath = exports.bundleDapp = exports.bundleWidget = exports.bundleWorker = exports.bundleDist = exports.bundleLib = exports.bundleSdk = exports.bundleContract = exports.EPackageType = exports.Types = exports.Path = exports.Parser = void 0;
const lib_1 = __importDefault(require("./lib"));
const Parser = __importStar(require("./parser"));
exports.Parser = Parser;
const typescript_1 = __importDefault(require("./lib/typescript"));
const path_1 = __importDefault(require("./path"));
exports.Path = path_1.default;
const Sol = __importStar(require("./solCompile"));
const Types = __importStar(require("./types"));
exports.Types = Types;
let isNode = false;
if (typeof process === 'object') {
    if (typeof process.versions === 'object') {
        if (typeof process.versions.node !== 'undefined') {
            isNode = true;
        }
    }
}
;
const indexHtmlTemplate = `
<!DOCTYPE html>

<head>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover">
{{meta}}
{{manifest}}
  <script 
    src="{{rootDir}}libs/@ijstech/components/index.js"
    integrity="{{sri}}"
    crossorigin="anonymous"></script>
  {{oauth}}
  {{bundleJS}}
</head>
<html>

<body>
  <script>
    async function init() {
      let module = await application.init('{{rootDir}}scconfig.json');
      document.body.append(module);
    };
    init();
  </script>
</body>

</html>`;
var EPackageType;
(function (EPackageType) {
    EPackageType["contract"] = "contract";
    EPackageType["dapp"] = "dapp";
    EPackageType["widget"] = "widget";
    EPackageType["worker"] = "worker";
})(EPackageType = exports.EPackageType || (exports.EPackageType = {}));
async function bundleContract(storage, solc, RootPath) {
    RootPath = RootPath || storage.rootPath;
    let scconfig = await storage.getSCConfig();
    let options = scconfig?.solidity;
    if (!options) {
        let solconfig = await storage.readFile('solconfig.json');
        if (solconfig)
            options = JSON.parse(solconfig);
    }
    ;
    await Sol.bundle(solc, storage, options || {
        "version": "0.8.19",
        "optimizerRuns": 999999,
        "sourceDir": "contracts",
        "outputDir": "src/contracts",
        "outputObjects": "bytecode"
    }, RootPath);
    await bundleDist('contract', storage, RootPath);
    await bundleLib(storage, RootPath);
}
exports.bundleContract = bundleContract;
;
async function bundleSdk(storage, RootPath) {
    RootPath = RootPath || storage.rootPath;
    await bundleDist('sdk', storage, RootPath);
    await bundleLib(storage, RootPath);
}
exports.bundleSdk = bundleSdk;
;
async function bundleLib(storage, RootPath) {
    RootPath = RootPath || storage.rootPath;
    let packageConfig = await storage.getPackageConfig();
    if (packageConfig) {
        let packageManager = new PackageManager({
            packageImporter: async (packName) => {
                let pack = await storage.getPackageTypes(packName);
                return pack;
            },
            tsconfig: {
                allowJs: false,
                alwaysStrict: true,
                declaration: true,
                esModuleInterop: true,
                removeComments: true,
                moduleResolution: typescript_1.default.ModuleResolutionKind.Classic,
                resolveJsonModule: false,
                skipLibCheck: true,
                noEmitOnError: true,
                module: typescript_1.default.ModuleKind.CommonJS,
                target: typescript_1.default.ScriptTarget.ES2020
            }
        });
        packageManager.addPackage('@ijstech/eth-contract', await storage.getPackageTypes('@ijstech/eth-contract'));
        let pack = { files: await storage.getFiles(path_1.default.join(RootPath, 'src')) };
        packageManager.addPackage(packageConfig.name, pack);
        await packageManager.buildAll();
        pack = packageManager.packages(packageConfig.name);
        if (pack.errors && pack.errors.length > 0) {
            console.error('Package compilation error: ' + packageConfig.name);
            console.error(JSON.stringify(pack.errors, null, 4));
            return;
        }
        ;
        let libDir = path_1.default.join(RootPath, 'lib');
        let typesDir = path_1.default.join(RootPath, 'types');
        for (let fileName in pack.script) {
            let content = pack.script[fileName];
            await storage.writeFile(path_1.default.join(libDir, fileName), content);
        }
        for (let fileName in pack.dts) {
            let content = pack.dts[fileName];
            await storage.writeFile(path_1.default.join(typesDir, fileName), content);
        }
        ;
    }
    ;
}
exports.bundleLib = bundleLib;
;
async function bundleDist(bundleType, storage, RootPath) {
    RootPath = RootPath || storage.rootPath;
    let packageConfig = await storage.getPackageConfig();
    if (packageConfig) {
        let packageManager = new PackageManager({
            packageImporter: async (packName) => {
                let pack = await storage.getPackageTypes(packName);
                return pack;
            }
        });
        let pack = { files: await storage.getFiles(path_1.default.join(RootPath, 'src')) };
        for (let n in pack.files) {
            if (n == 'index.ts' || n == 'index.tsx')
                pack.files[n] = `///<amd-module name='${packageConfig.name}'/> \n` + pack.files[n];
            else
                pack.files[n] = `///<amd-module name='${packageConfig.name}/${n}'/> \n` + pack.files[n];
        }
        ;
        packageManager.addPackage(packageConfig.name, pack);
        await packageManager.buildAll();
        pack = packageManager.packages(packageConfig.name);
        if (pack.errors && pack.errors.length > 0) {
            console.error('Package compilation error: ' + packageConfig.name);
            console.error(JSON.stringify(pack.errors, null, 4));
            return;
        }
        ;
        let distDir = path_1.default.join(RootPath, 'dist');
        let typesDir = path_1.default.join(RootPath, 'pluginTypes');
        let script = '';
        let dts = '';
        if (pack.script && pack.script['index.js'])
            script = pack.script['index.js'];
        if (pack.dts && pack.dts['index.d.ts'])
            dts = pack.dts['index.d.ts'];
        await storage.writeFile(path_1.default.join(distDir, 'index.js'), script);
        await storage.writeFile(path_1.default.join(typesDir, 'index.d.ts'), dts);
        await storage.writeFile(path_1.default.join(distDir, 'scconfig.json'), JSON.stringify({
            name: packageConfig.name,
            type: bundleType,
            version: packageConfig.version,
            dependencies: pack.dependencies
        }, null, 4));
        await storage.writeFile(path_1.default.join(distDir, 'scconfig.json'), JSON.stringify({
            name: packageConfig.name,
            type: bundleType,
            version: packageConfig.version,
            dependencies: pack.dependencies
        }, null, 4));
    }
    ;
}
exports.bundleDist = bundleDist;
;
const WorkerDefaultPackages = [
    'bignumber.js',
    '@ijstech/eth-contract',
    '@ijstech/eth-wallet',
    '@ijstech/fetch',
    '@ijstech/pdm',
    '@ijstech/plugin',
    '@ijstech/types',
    '@ijstech/wallet'
];
async function bundleWorker(storage, RootPath) {
    RootPath = RootPath || storage.rootPath;
    let scConfig = await storage.getSCConfig();
    if (scConfig?.workers) {
        let results = {};
        let files = await storage.getFiles(path_1.default.join(RootPath, 'src'));
        let deps = [];
        for (let n in scConfig.workers) {
            if (!results[n]) {
                let workerConfig = scConfig.workers[n];
                if (workerConfig.module) {
                    let modulePath = path_1.default.join(RootPath, 'src', workerConfig.module);
                    let pack = { files: {} };
                    for (let n in files)
                        pack.files[n] = files[n];
                    let indexFile = workerConfig.module;
                    pack.indexFile = indexFile;
                    let packageManager = new PackageManager({
                        packageImporter: async (packName) => {
                            let pack = await storage.getPackageTypes(packName);
                            return pack;
                        },
                        tsconfig: {
                            allowJs: false,
                            alwaysStrict: true,
                            declaration: false,
                            esModuleInterop: true,
                            experimentalDecorators: true,
                            module: typescript_1.default.ModuleKind.AMD,
                            moduleResolution: typescript_1.default.ModuleResolutionKind.Classic,
                            noEmitOnError: true,
                            outFile: "index.js",
                            removeComments: true,
                            resolveJsonModule: false,
                            skipLibCheck: true,
                            target: typescript_1.default.ScriptTarget.ES2020
                        }
                    });
                    packageManager.addPackage('bignumber.js', await storage.getPackageTypes('bignumber.js'));
                    packageManager.addPackage('worker', pack);
                    if (workerConfig.plugins?.wallet) {
                        packageManager.addPackage('@ijstech/eth-wallet', await storage.getPackageTypes('@ijstech/eth-wallet'));
                        packageManager.addPackage('@ijstech/eth-contract', await storage.getPackageTypes('@ijstech/eth-contract'));
                        packageManager.addPackage('@ijstech/wallet', await storage.getPackageTypes('@ijstech/wallet'));
                    }
                    ;
                    await packageManager.buildAll();
                    pack = packageManager.packages('worker');
                    let script = pack.script['index.js'];
                    if (!script) {
                        console.error('Worker compilation error: ' + n);
                        console.error(JSON.stringify(pack.errors, null, 4));
                        return;
                    }
                    ;
                    results[n] = pack.script['index.js'];
                    workerConfig.module = `${n}.js`;
                    workerConfig.dependencies = [];
                    for (let i = 0; i < pack.dependencies.length; i++) {
                        let n = pack.dependencies[i];
                        if (WorkerDefaultPackages.indexOf(n) < 0) {
                            workerConfig.dependencies.push(n);
                            if (deps.indexOf(n) < 0)
                                deps.push(n);
                        }
                        ;
                    }
                    ;
                    await storage.writeFile(`dist/workers/${n}.js`, results[n]);
                }
                ;
            }
            ;
        }
        ;
        await storage.writeFile('dist/scconfig.json', JSON.stringify(scConfig, null, 4));
        for (let i = 0; i < deps.length; i++) {
            let dep = deps[i];
            await storage.copyPackage(dep, `dist/libs/${dep}`);
        }
        ;
    }
    ;
}
exports.bundleWorker = bundleWorker;
;
async function bundleWidget(storage, RootPath) {
    RootPath = RootPath || storage.rootPath;
    let scRootDir = RootPath;
    let packageConfig = await storage.getPackageConfig();
    if (packageConfig) {
        let packs = {};
        let packageManager = new PackageManager({
            packageImporter: async (packName) => {
                let pack = await storage.getPackageTypes(packName);
                packs[packName] = pack;
                return pack;
            }
        });
        let pack = { files: await storage.getFiles(path_1.default.join(scRootDir, 'src')) };
        for (let n in pack.files) {
            if (n == 'index.ts' || n == 'index.tsx')
                pack.files[n] = `///<amd-module name='${packageConfig.name}'/> \n` + pack.files[n];
            else
                pack.files[n] = `///<amd-module name='${packageConfig.name}/${n}'/> \n` + pack.files[n];
        }
        ;
        packageManager.addPackage(packageConfig.name, pack);
        await packageManager.buildAll();
        pack = packageManager.packages(packageConfig.name);
        if (pack.errors && pack.errors.length > 0) {
            console.error('Package compilation error: ' + packageConfig.name);
            console.error(JSON.stringify(pack.errors, null, 4));
            return;
        }
        ;
        let distDir = path_1.default.join(scRootDir, 'dist');
        let typesDir = path_1.default.join(scRootDir, 'pluginTypes');
        let script = '';
        let dts = '';
        if (pack.script && pack.script['index.js'])
            script = pack.script['index.js'];
        if (pack.dts && pack.dts['index.d.ts'])
            dts = pack.dts['index.d.ts'];
        storage.copyAssets(path_1.default.join(scRootDir, 'src'), distDir);
        storage.writeFile(path_1.default.join(distDir, 'index.js'), script);
        let dependencies = [];
        pack.dependencies?.forEach((item) => {
            let idx = 0;
            if (dependencies.indexOf(item) < 0) {
                idx = dependencies.push(item);
                let dep = packs[item];
                dep?.dependencies?.forEach((depItem) => {
                    if (depItem.startsWith('@scom/')) {
                        let depIdx = dependencies.indexOf(depItem);
                        if (depIdx < 0) {
                            dependencies.splice(idx - 1, 0, depItem);
                            idx++;
                        }
                        else if (depIdx > idx) {
                            dependencies.splice(depIdx, 1);
                            dependencies.splice(idx - 1, 0, depItem);
                            idx++;
                        }
                        ;
                    }
                });
            }
            ;
        });
        storage.writeFile(path_1.default.join(distDir, 'scconfig.json'), JSON.stringify({
            name: packageConfig.name,
            type: "widget",
            version: packageConfig.version,
            dependencies: dependencies
        }, null, 4));
        storage.writeFile(path_1.default.join(typesDir, 'index.d.ts'), dts);
    }
    ;
}
exports.bundleWidget = bundleWidget;
;
async function bundleDapp(storage, RootPath) {
    RootPath = RootPath || storage.rootPath;
    let scRootDir = RootPath;
    let bundleLibs = {};
    let bundleJS = `let scripts = document.getElementsByTagName("script");
let rootDir = scripts[scripts.length-1].src.replace(/^[a-zA-Z]{3,5}:\\/{2}[a-zA-Z0-9_.:-]+/,'').split('/').slice(0, -1).join('/');
if (!rootDir.endsWith('/'))
    rootDir += '/';\n`;
    let scconfig = await storage.getSCConfig();
    if (scconfig) {
        let moduleSourceDir = path_1.default.join(scRootDir, scconfig.moduleDir || 'modules');
        let packages = {};
        for (let name in scconfig.modules) {
            packages[name] = path_1.default.join(moduleSourceDir, scconfig.modules[name].path);
        }
        ;
        let packageManager = new PackageManager({
            packageImporter: async (packName) => {
                let pack = await storage.getPackageTypes(packName);
                return pack;
            }
        });
        packageManager.addPackage('@ijstech/components', await storage.getPackageTypes('@ijstech/components'));
        if (scconfig.networks) {
            packageManager.addPackage('bignumber.js', await storage.getPackageTypes('bignumber.js'));
            packageManager.addPackage('@ijstech/eth-wallet', await storage.getPackageTypes('@ijstech/eth-wallet'));
            packageManager.addPackage('@ijstech/eth-contract', await storage.getPackageTypes('@ijstech/eth-contract'));
        }
        ;
        for (let n in scconfig.dependencies) {
            if (!packageManager.packages(n))
                packageManager.addPackage(n, await storage.getPackageTypes(n));
        }
        ;
        for (let name in packages) {
            let pack = { files: await storage.getFiles(packages[name]) };
            for (let n in pack.files) {
                if (n == 'index.ts' || n == 'index.tsx')
                    pack.files[n] = `///<amd-module name='${name}'/> \n` + pack.files[n];
                else
                    pack.files[n] = `///<amd-module name='${name}/${n}'/> \n` + pack.files[n];
            }
            ;
            packageManager.addPackage(name, pack);
        }
        ;
        await packageManager.buildAll();
        for (let name in packages) {
            let pack = packageManager.packages(name);
            if (pack.errors && pack.errors.length > 0) {
                console.error('Package compilation error: ' + name);
                console.error(JSON.stringify(pack.errors, null, 4));
                return;
            }
        }
        ;
        let distDir = path_1.default.join(scRootDir, scconfig.distDir || 'dist');
        if (scconfig.ipfs)
            distDir = distDir + '/output';
        let rootDir = '';
        if (scconfig.version && scconfig.bundle)
            rootDir = scconfig.version;
        let distLibDir = path_1.default.join(distDir, rootDir, 'libs');
        let distModuleDir = path_1.default.join(distDir, rootDir, 'modules');
        for (let name in scconfig.modules) {
            let pack = packageManager.packages(name);
            let module = scconfig.modules[name];
            module.dependencies = [];
            pack.dependencies?.forEach((item) => {
                if ((scconfig.modules[item] || item.startsWith('@scom/') || item.startsWith('@ijstech/')) && item != '@ijstech/components' && !item.startsWith('@ijstech/components/')) {
                    if (module.dependencies.indexOf(item) < 0) {
                        let idx = module.dependencies.push(item);
                        if (!scconfig.modules[item] && !scconfig.dependencies[item])
                            scconfig.dependencies[item] = '*';
                        let dep = packageManager.packages(item);
                        if (dep && dep.dependencies) {
                            dep.dependencies.forEach((depItem) => {
                                if ((depItem.startsWith('@scom/') || depItem.startsWith('@ijstech/')) && depItem != '@ijstech/components' && !depItem.startsWith('@ijstech/components/')) {
                                    if (module.dependencies.indexOf(depItem) < 0)
                                        module.dependencies.splice(idx - 1, 0, depItem);
                                    else if (module.dependencies.indexOf(depItem) > idx) {
                                        module.dependencies.splice(module.dependencies.indexOf(depItem), 1);
                                        module.dependencies.splice(idx, 0, depItem);
                                    }
                                    ;
                                }
                                ;
                            });
                        }
                        ;
                    }
                    ;
                }
                ;
            });
            let distModulePath = path_1.default.join(distModuleDir, module.path);
            let script = '';
            if (pack.script && pack.script['index.js'])
                script = pack.script['index.js'];
            await storage.copyAssets(path_1.default.join(scRootDir, scconfig.moduleDir || 'modules', module.path), distModulePath);
            await storage.writeFile(path_1.default.join(distModulePath, 'index.js'), script);
        }
        ;
        let checkDeps = true;
        while (checkDeps) {
            checkDeps = false;
            for (let name in scconfig.modules) {
                let module = scconfig.modules[name];
                for (let i = 0; i < module.dependencies.length; i++) {
                    let depModule = scconfig.modules[module.dependencies[i]];
                    if (depModule) {
                        for (let k = 0; k < depModule.dependencies.length; k++) {
                            if (module.dependencies.indexOf(depModule.dependencies[k]) < 0) {
                                module.dependencies.splice(i, 0, depModule.dependencies[k]);
                                checkDeps = true;
                            }
                            ;
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            ;
        }
        ;
        let deps = [];
        await storage.copyPackage('@ijstech/components', path_1.default.join(distLibDir, '@ijstech/components'));
        async function copyDependencies(dependencies, all) {
            let items = [];
            if (Array.isArray(dependencies))
                items = dependencies;
            else
                items = Object.keys(dependencies);
            for (let i = 0; i < items.length; i++) {
                let name = items[i];
                if (name != '@ijstech/components/' && !name.startsWith('@ijstech/components/')) {
                    if ((all || scconfig.modules[name] || name.startsWith('@ijstech/') || name.startsWith('@scom/'))) {
                        let pack;
                        if (scconfig.modules[name])
                            pack = scconfig.modules[name];
                        else
                            pack = await storage.copyPackage(name, path_1.default.join(distLibDir, name));
                        if (pack) {
                            let existsIdx = deps.indexOf(name);
                            if (existsIdx >= 0)
                                deps.splice(existsIdx, 1);
                            deps.unshift(name);
                            let dependencies = pack.dependencies || {};
                            if (name == '@ijstech/eth-contract') {
                                existsIdx = deps.indexOf('@ijstech/eth-wallet');
                                if (existsIdx >= 0)
                                    deps.splice(existsIdx, 1);
                                deps.unshift('@ijstech/eth-wallet');
                            }
                            await copyDependencies(dependencies);
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            ;
        }
        ;
        async function bundleDependencies(dependencies) {
            dependencies = dependencies || {};
            for (let name in dependencies) {
                if (scconfig.modules[name]) {
                    let content = await storage.readFile(path_1.default.join(distModuleDir, `${scconfig.modules[name].path}/index.js`));
                    if (content) {
                        bundleJS += `application.currentModuleDir=rootDir+'modules/${scconfig.modules[name].path}';\n`;
                        bundleJS += `${content}\n`;
                    }
                    ;
                }
                else {
                    let content = await storage.readFile(path_1.default.join(distLibDir, name, 'index.js'));
                    if (content) {
                        bundleJS += `application.currentModuleDir=rootDir+'libs/${name}';\n`;
                        bundleJS += `${content}\n`;
                    }
                    ;
                }
                ;
            }
            ;
        }
        ;
        scconfig.dependencies = scconfig.dependencies || {};
        delete scconfig.dependencies[scconfig.main];
        if (scconfig.main)
            scconfig.dependencies[scconfig.main] = '*';
        if (scconfig.assets)
            scconfig.dependencies[scconfig.assets] = '*';
        await copyDependencies(scconfig.dependencies, true);
        if (scconfig.packages) {
            scconfig.packages.forEach(async (name) => {
                await storage.copyPackage(name, distLibDir);
            });
            delete scconfig.packages;
        }
        ;
        scconfig.dependencies = {};
        deps.forEach((name) => {
            if (name != '@ijstech/components' && !name.startsWith('@ijstech/components/'))
                scconfig.dependencies[name] = '*';
        });
        if (scconfig.bundle) {
            await bundleDependencies(scconfig.dependencies);
            await storage.writeFile(path_1.default.join(distDir, rootDir, 'bundle.js'), bundleJS);
        }
        ;
        delete scconfig['distDir'];
        scconfig.moduleDir = 'modules';
        let indexHtml = indexHtmlTemplate;
        let meta = '';
        if (scconfig.meta) {
            for (let n in scconfig.meta) {
                if (n == 'favicon') {
                    let value = scconfig.meta[n];
                    if (rootDir && value.startsWith('modules/'))
                        value = `${rootDir}/${value}`;
                    meta += `  <link rel="icon" href="${value}">\n`;
                }
                else if (n == 'title')
                    meta += `  <title>${scconfig.meta[n]}</title>\n`;
                else if (n == 'chartset')
                    meta += `  <meta charset="${scconfig.meta[n]}">\n`;
                else if (n.indexOf(':') < 0)
                    meta += `  <meta name="${n}" content="${scconfig.meta[n]}">\n`;
                else
                    meta += `  <meta property="${n}" content="${scconfig.meta[n]}">\n`;
            }
            ;
        }
        ;
        indexHtml = indexHtml.replace('{{meta}}', meta);
        let manifestLink = '';
        if (scconfig.manifest) {
            manifestLink = '  <link rel="manifest" href="manifest.webmanifest" >';
            let manifest = {
                "scope": "/",
                "start_url": "/",
                "display": "standalone",
                "theme_color": "#000",
                "background_color": "#1E1E1E",
                ...scconfig.manifest
            };
            for (let icon of manifest.icons) {
                if (icon.src.startsWith('modules/'))
                    icon.src = `/${scconfig.version}/${icon.src}`;
            }
            await storage.writeFile(path_1.default.join(distDir, 'manifest.webmanifest'), JSON.stringify(manifest, null, 4));
        }
        indexHtml = indexHtml.replace('{{manifest}}', manifestLink);
        indexHtml = indexHtml.replace('{{main}}', `${scconfig.main || '@scom/dapp'}`);
        let content = await storage.readFile(path_1.default.join(distLibDir, `@ijstech/components/index.js`));
        let cid = await storage.hashContent(content);
        let sri = await storage.cidToSri(cid);
        indexHtml = indexHtml.replace('{{sri}}', `sha256-${sri}`);
        if (scconfig.oauth) {
            let scripts = [];
            for (let provider in scconfig.oauth) {
                let providerInfo = scconfig.oauth[provider];
                if (!providerInfo.enabled)
                    continue;
                if (provider == 'google') {
                    scripts.push(`<script src="https://accounts.google.com/gsi/client" async></script>`);
                }
            }
            indexHtml = indexHtml.replace('{{oauth}}', scripts.join('\n'));
        }
        else {
            indexHtml = indexHtml.replace('{{oauth}}', '');
        }
        if (scconfig.bundle) {
            let cid = await storage.hashContent(bundleJS);
            let sri = await storage.cidToSri(cid);
            indexHtml = indexHtml.replace('{{bundleJS}}', `<script src="${rootDir ? rootDir + '/' : ''}bundle.js" integrity="sha256-${sri}" crossorigin="anonymous"></script>`);
        }
        else
            indexHtml = indexHtml.replace('{{bundleJS}}', ``);
        if (scconfig.ipfs == true) {
            delete scconfig.ipfs;
            let idx = indexHtml.replaceAll('{{rootDir}}', rootDir ? rootDir + '/' : '');
            await storage.writeFile(path_1.default.join(distDir, 'index.html'), idx);
            await storage.writeFile(path_1.default.join(distDir, 'scconfig.json'), JSON.stringify(scconfig, null, 4));
            let cid = await storage.hashDir(distDir);
            let d = path_1.default.join(scRootDir, scconfig.distDir || 'dist');
            await storage.rename(distDir, path_1.default.join(d, cid.cid));
            indexHtml = indexHtml.replaceAll('{{rootDir}}', cid.cid + '/' + (rootDir ? rootDir + '/' : ''));
            await storage.writeFile(path_1.default.join(d, 'index.html'), indexHtml);
            await storage.writeFile(path_1.default.join(path_1.default.join(d, `${cid.cid}.json`)), JSON.stringify(cid));
        }
        else {
            indexHtml = indexHtml.replaceAll('{{rootDir}}', rootDir ? rootDir + '/' : '');
            await storage.writeFile(path_1.default.join(distDir, 'index.html'), indexHtml);
            await storage.writeFile(path_1.default.join(distDir, rootDir ? rootDir + '/' : '', 'scconfig.json'), JSON.stringify(scconfig, null, 4));
        }
        ;
    }
    ;
}
exports.bundleDapp = bundleDapp;
;
const PackageWhiteList = ['bignumber.js'];
function resolveAbsolutePath(baseFilePath, relativeFilePath) {
    let basePath = baseFilePath.split('/').slice(0, -1).join('/');
    if (basePath)
        basePath += '/';
    let fullPath = basePath + relativeFilePath;
    return fullPath.split('/')
        .reduce((result, value) => {
        if (value === '.') { }
        else if (value === '..')
            result.pop();
        else
            result.push(value);
        return result;
    }, [])
        .join('/');
}
exports.resolveAbsolutePath = resolveAbsolutePath;
;
class PackageManager {
    constructor(options) {
        this._packages = {};
        this.packageImporter = options?.packageImporter;
        this.tsconfig = options?.tsconfig;
    }
    ;
    addPackage(name, pack) {
        if (!this._packages[name])
            this._packages[name] = pack;
    }
    ;
    async buildAll() {
        for (let name in this._packages) {
            let result = await this.buildPackage(name);
            if (result.errors && result.errors.length > 0) {
                console.error('Failed to build package: ' + name);
                console.error(JSON.stringify(result.errors, null, 4));
                throw new Error('Failed to build package: ' + name);
            }
        }
        ;
        return true;
    }
    ;
    async buildPackage(name) {
        let pack = this._packages[name];
        if (!pack.dts && pack.files) {
            let indexFile = '';
            if (pack.indexFile)
                indexFile = pack.indexFile;
            else if (pack.files['index.ts'])
                indexFile = 'index.ts';
            else if (pack.files['index.tsx'])
                indexFile = 'index.tsx';
            if (indexFile) {
                let compiler = new Compiler({ packageImporter: this.packageImporter, tsconfig: this.tsconfig });
                for (let n in this._packages) {
                    if (this._packages[n].dts)
                        compiler.addPackage(n, this._packages[n]);
                }
                ;
                await compiler.addFile(indexFile, pack.files[indexFile], async (fileName, isPackage) => {
                    if (isPackage) {
                        if (fileName && fileName.startsWith('@ijstech/components/'))
                            fileName = '@ijstech/components';
                        if (this._packages[fileName]) {
                            if (!this._packages[fileName].dts) {
                                let p = await this.buildPackage(fileName);
                                if (p.errors && p.errors.length > 0) {
                                    console.dir(p.errors);
                                    throw new Error('Failed to build package: ' + fileName);
                                }
                                ;
                            }
                            ;
                            compiler.addPackage(fileName, this._packages[fileName]);
                            let dts = '';
                            let pack = this._packages[fileName];
                            if (pack.dts && pack.dts['index.d.ts'])
                                dts = pack.dts['index.d.ts'];
                            return {
                                fileName: 'index.d.ts',
                                content: dts
                            };
                        }
                        let result = await compiler.addPackage(fileName);
                        if (result)
                            return result;
                        throw new Error('Package not found: ' + fileName);
                    }
                    else {
                        let name = '';
                        if (pack.files) {
                            if (pack.files[fileName])
                                name = fileName;
                            else if (pack.files[fileName + '.ts'])
                                name = fileName + '.ts';
                            else if (pack.files[fileName + '.tsx'])
                                name = fileName + '.tsx';
                            else if (pack.files[fileName + '.d.ts'])
                                name = fileName + '.d.ts';
                            else if (pack.files[fileName + '/index.ts'])
                                name = fileName + '/index.ts';
                            if (name)
                                return {
                                    fileName: name,
                                    content: pack.files[name]
                                };
                        }
                        ;
                        return null;
                    }
                });
                let result = await compiler.compile(true);
                pack.dts = result.dts;
                pack.script = result.script;
                pack.dependencies = compiler.dependencies;
                pack.errors = result.errors;
            }
            ;
        }
        ;
        return pack;
    }
    ;
    packages(name) {
        return this._packages[name];
    }
    ;
}
exports.PackageManager = PackageManager;
;
class Compiler {
    constructor(options) {
        this.packages = {};
        this.dependencies = [];
        this.packageImporter = options?.packageImporter;
        this.scriptOptions = options?.tsconfig || {
            allowJs: false,
            alwaysStrict: true,
            declaration: true,
            experimentalDecorators: true,
            resolveJsonModule: false,
            skipLibCheck: true,
            noEmitOnError: true,
            module: typescript_1.default.ModuleKind.AMD,
            outFile: 'index.js',
            target: typescript_1.default.ScriptTarget.ES2020,
            "jsx": 2,
            "jsxFactory": "global.$JSX"
        };
        this.dtsOptions = {
            allowJs: false,
            alwaysStrict: true,
            declaration: true,
            emitDeclarationOnly: true,
            experimentalDecorators: true,
            resolveJsonModule: false,
            skipLibCheck: true,
            module: typescript_1.default.ModuleKind.CommonJS,
            noEmitOnError: true,
            target: typescript_1.default.ScriptTarget.ES2020
        };
        this.files = {};
        this.packageFiles = {};
    }
    ;
    async importDependencies(fileName, content, fileImporter, result) {
        let ast = typescript_1.default.createSourceFile(fileName, content, typescript_1.default.ScriptTarget.ES2020, true);
        result = result || [];
        for (let i = 0; i < ast.statements.length; i++) {
            let node = ast.statements[i];
            if (node.kind == typescript_1.default.SyntaxKind.ImportDeclaration || node.kind == typescript_1.default.SyntaxKind.ExportDeclaration) {
                if (node.moduleSpecifier) {
                    let module = node.moduleSpecifier.text;
                    if (module.startsWith('.')) {
                        let filePath = resolveAbsolutePath(fileName, module);
                        if (this.files[filePath] == undefined && this.files[filePath + '.ts'] == undefined && this.files[filePath + '.tsx'] == undefined) {
                            let file = await fileImporter(filePath);
                            if (file) {
                                result.push('./' + file.fileName);
                                this.addFile(file.fileName, file.content);
                                await this.importDependencies(file.fileName, file.content, fileImporter, result);
                            }
                        }
                    }
                    else {
                        if (this.dependencies.indexOf(module) < 0)
                            this.dependencies.push(module);
                        if (!this.packages[module]) {
                            let isSubmodule = module.split('/').length > 2;
                            if (!isSubmodule && this.packageImporter) {
                                let pack = await this.addPackage(module);
                                if (pack)
                                    result.push(module);
                            }
                            else {
                                let file = await fileImporter(module, true);
                                if (file) {
                                    result.push(module);
                                    let pack = {
                                        dts: { 'index.d.ts': file.content }
                                    };
                                    this.addPackage(module, pack);
                                }
                                ;
                            }
                            ;
                        }
                        ;
                    }
                    ;
                }
            }
        }
        ;
        return result;
    }
    async addFile(fileName, content, dependenciesImporter) {
        this.files[fileName] = content;
        if (dependenciesImporter) {
            let result = await this.importDependencies(fileName, content, dependenciesImporter);
            return result;
        }
        else
            return [];
    }
    ;
    updateFile(fileName, content) {
        this.files[fileName] = content;
    }
    ;
    getProgram(result) {
        const host = {
            getSourceFile: this.getSourceFile.bind(this),
            getDefaultLibFileName: () => "lib.d.ts",
            writeFile: (fileName, content) => {
                if (result) {
                    if (fileName.endsWith('d.ts'))
                        result.dts[fileName] = content;
                    else {
                        result.script[fileName] = content.replace(new RegExp(/\global.\$JSX\(/, 'g'), 'this.$render(');
                    }
                }
                ;
            },
            getCurrentDirectory: () => "",
            getDirectories: (path) => {
                return typescript_1.default.sys.getDirectories(path);
            },
            getCanonicalFileName: (fileName) => typescript_1.default.sys && typescript_1.default.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
            getNewLine: () => typescript_1.default.sys && typescript_1.default.sys.newLine ? typescript_1.default.sys.newLine : '\n',
            useCaseSensitiveFileNames: () => typescript_1.default.sys && typescript_1.default.sys.useCaseSensitiveFileNames ? typescript_1.default.sys.useCaseSensitiveFileNames : false,
            fileExists: () => true,
            readFile: this.readFile.bind(this),
            resolveModuleNames: this.resolveModuleNames.bind(this)
        };
        let fileNames = [];
        for (let f in this.files)
            fileNames.push(f);
        let program = typescript_1.default.createProgram(fileNames, this.scriptOptions, host);
        return program;
    }
    ;
    async addPackage(packName, pack) {
        if (!pack) {
            if (!this.packages[packName]) {
                if (packName == '@ijstech/eth-contract' || packName == '@ijstech/eth-wallet')
                    await this.addPackage('bignumber.js');
                if (packName == '@ijstech/eth-wallet')
                    await this.addPackage('@ijstech/eth-contract');
                if (this.packageImporter) {
                    let pack = await this.packageImporter(packName);
                    if (pack?.dts) {
                        this.addPackage(packName, pack);
                        if (pack.dependencies) {
                            for (let i = 0; i < pack.dependencies.length; i++) {
                                let n = pack.dependencies[i];
                                if (PackageWhiteList.indexOf(n) > -1 || n.startsWith('@scom/') || n.startsWith('@ijstech/'))
                                    await this.addPackage(n);
                            }
                            ;
                        }
                        ;
                        let dts = '';
                        if (pack.dts && pack.dts['index.d.ts'])
                            dts = pack.dts['index.d.ts'];
                        return {
                            fileName: 'index.d.ts',
                            content: dts
                        };
                    }
                    ;
                }
                ;
            }
            ;
        }
        else {
            this.packages[packName] = pack;
            if (pack.dts && pack.dts['index.d.ts'])
                this.packageFiles[packName] = pack.dts['index.d.ts'];
        }
        ;
    }
    ;
    async compile(emitDeclaration) {
        let result = {
            errors: [],
            script: {},
            dts: {},
        };
        try {
            let program = this.getProgram(result);
            const emitResult = program.emit();
            emitResult.diagnostics.forEach(item => {
                result.errors.push({
                    category: item.category,
                    code: item.code,
                    file: item.file ? item.file.fileName : '',
                    length: item.length ? item.length : 0,
                    message: item.messageText,
                    start: item.start ? item.start : 0
                });
            });
        }
        catch (err) {
            if (this.fileNotExists)
                console.dir('File not exists: ' + this.fileNotExists);
            else
                console.trace(err);
        }
        ;
        return result;
    }
    ;
    getSource(fileName) {
        let program = this.getProgram();
        program.getTypeChecker();
        const source = program.getSourceFile(fileName);
        return source;
    }
    ;
    addComponentProp(fileName, className, id) {
        const source = this.getSource(fileName);
        if (source) {
            let result = Parser.addComponentProp(source, className, id);
            return result;
        }
        ;
    }
    ;
    addEventHandler(fileName, classNames, func, params) {
        const source = this.getSource(fileName);
        if (source) {
            let result = Parser.addEventHandler(source, classNames, func, params);
            return result;
        }
        else
            return {};
    }
    ;
    locateMethod(fileName, funcName) {
        const source = this.getSource(fileName);
        if (source) {
            let result = Parser.locateMethod(source, funcName);
            return result;
        }
        else
            return {};
    }
    ;
    renameMethod(fileName, fromFuncName, toFuncName) {
        const source = this.getSource(fileName);
        if (source) {
            let result = Parser.renameMethod(source, fromFuncName, toFuncName);
            return result;
        }
        ;
    }
    ;
    renameComponent(fileName, className, fromId, toId) {
        const source = this.getSource(fileName);
        if (source) {
            let result = Parser.renameProperty(source, className, fromId, toId);
            return result;
        }
    }
    ;
    parseUI(fileName, funcName) {
        funcName = funcName || 'render';
        let program = this.getProgram();
        program.getTypeChecker();
        const source = program.getSourceFile(fileName);
        if (source) {
            let component = Parser.parseUI(source, funcName);
            return component;
        }
        ;
        return;
    }
    ;
    renderUI(fileName, funcName, component) {
        funcName = funcName || 'render';
        let program = this.getProgram();
        program.getTypeChecker();
        const source = program.getSourceFile(fileName);
        if (source) {
            return Parser.renderUI(source, funcName, component);
        }
        ;
    }
    ;
    fileExists(fileName) {
        let result = this.files[fileName] != undefined || this.packageFiles[fileName] != undefined;
        if (!result && fileName.endsWith('.d.ts')) {
            let packName = fileName.split('/').slice(0, 2).join('/');
            let dtsFile = fileName.split('/').slice(2).join('/');
            let pack = this.packages[packName];
            if (pack && pack.dts && pack.dts[dtsFile])
                result = true;
        }
        ;
        if (!result && fileName.endsWith('.ts'))
            result = this.packages[fileName.slice(0, -3)] != undefined;
        this.resolvedFileName = '';
        if (!result && this.files[fileName.slice(0, -3) + '/index.ts'] != undefined) {
            result = true;
            this.resolvedFileName = fileName.slice(0, -3) + '/index.ts';
        }
        ;
        if (!result)
            this.fileNotExists = fileName;
        else
            this.fileNotExists = '';
        return result;
    }
    ;
    async getDependencies(fileName, content, fileImporter, result) {
        let ast = typescript_1.default.createSourceFile(fileName, content, typescript_1.default.ScriptTarget.ES2020, true);
        result = result || [];
        for (let i = 0; i < ast.statements.length; i++) {
            let node = ast.statements[i];
            if (node.kind == typescript_1.default.SyntaxKind.ImportDeclaration) {
                let module = node.moduleSpecifier.text;
                if (module.startsWith('@ijstech/components/'))
                    module = '@ijstech/components';
                if (module.startsWith('.')) {
                    let filePath = resolveAbsolutePath(fileName, module);
                    if (result.indexOf(filePath) < 0 && result.indexOf(filePath + '.ts') < 0 && result.indexOf(filePath + '.tsx') < 0) {
                        if (fileImporter) {
                            let file = await fileImporter(filePath);
                            if (file) {
                                result.push(file.fileName);
                                await this.getDependencies(filePath, file.content, fileImporter, result);
                            }
                        }
                        else
                            result.push(filePath);
                    }
                }
                else if (result.indexOf(module) < 0) {
                    if (fileImporter)
                        await fileImporter(module, true);
                    result.push(module);
                }
            }
        }
        return result;
    }
    ;
    getSourceFile(fileName, languageVersion, onError) {
        if (fileName == 'lib.d.ts') {
            return typescript_1.default.createSourceFile(fileName, lib_1.default, languageVersion);
        }
        ;
        let content = this.packageFiles[fileName] || this.files[fileName];
        let packName = '';
        let dtsFile = '';
        let dtsDir = '';
        if (!content && fileName.endsWith('/index.d.ts')) {
            packName = fileName.split('/').slice(0, -1).join('/');
            dtsFile = 'index.d.ts';
            let pack = this.packages[packName];
            if (pack && pack.dts && pack.dts['index.d.ts'])
                content = pack.dts['index.d.ts'];
        }
        ;
        if (!content && fileName.startsWith('@')) {
            packName = fileName.split('/').slice(0, 2).join('/');
            dtsFile = fileName.split('/').slice(2).join('/');
            if (!dtsFile) {
                if (packName.endsWith('.ts')) {
                    packName = packName.slice(0, -3);
                    dtsFile = 'index.d.ts';
                }
                else
                    dtsFile = 'index.d.ts';
            }
            ;
            dtsDir = dtsFile.slice(0, -5);
        }
        ;
        if (!content) {
            let pack = this.packages[packName];
            if (pack && pack.dts && pack.dts[dtsFile]) {
                content = pack.dts[dtsFile];
            }
            else if (pack && pack.dts && pack.dts[dtsDir + '/index.d.ts']) {
                fileName = packName + '/' + dtsDir + '/index.d.ts';
                content = pack.dts[dtsDir + '/index.d.ts'];
            }
            else {
                packName = fileName.split('/').slice(0, -1).join('/');
                for (let n in this.packages) {
                    if (packName.endsWith('/' + n)) {
                        let pack = this.packages[n];
                        let dts = '';
                        if (pack && pack.dts && pack.dts['index.d.ts'])
                            dts = pack.dts['index.d.ts'];
                        content = dts;
                        break;
                    }
                    ;
                }
                ;
            }
            ;
        }
        ;
        if (!content) {
            console.error('File not exists: ' + fileName);
            return;
        }
        return typescript_1.default.createSourceFile(fileName, content, languageVersion);
    }
    ;
    readFile(fileName) {
        return;
    }
    ;
    resolveModuleNames(moduleNames, containingFile) {
        let resolvedModules = [];
        for (const moduleName of moduleNames) {
            let result = typescript_1.default.resolveModuleName(moduleName, containingFile, this.scriptOptions, {
                fileExists: this.fileExists.bind(this),
                readFile: this.readFile.bind(this)
            });
            if (result.resolvedModule) {
                if (!moduleName.startsWith('./') && !moduleName.startsWith('../')) {
                    resolvedModules.push({
                        resolvedFileName: moduleName + '/index.d.ts',
                        extension: '.ts',
                        isExternalLibraryImport: true
                    });
                }
                else if (this.resolvedFileName) {
                    resolvedModules.push({
                        resolvedFileName: this.resolvedFileName,
                        extension: '.ts',
                        isExternalLibraryImport: false
                    });
                }
                else {
                    let resolvedFileName = result.resolvedModule.resolvedFileName;
                    if (resolvedFileName.startsWith('@') && resolvedFileName.endsWith('.ts') && resolvedFileName.split('/').length == 2) {
                        resolvedFileName = resolvedFileName.slice(0, -3) + '/index.d.ts';
                        result.resolvedModule.resolvedFileName = resolvedFileName;
                    }
                    ;
                    resolvedModules.push(result.resolvedModule);
                }
            }
            else {
                let resolvedFileName = moduleName;
                if (resolvedFileName.startsWith('.')) {
                    resolvedFileName = resolveAbsolutePath(containingFile, resolvedFileName);
                    if (resolvedFileName.startsWith('@') && resolvedFileName.split('/').length == 2) {
                        let packName = containingFile.split('/').slice(0, 2).join('/');
                        resolvedFileName = packName + '/' + resolvedFileName.split('/').pop();
                    }
                    ;
                }
                ;
                resolvedModules.push({
                    resolvedFileName: resolvedFileName + '/index.d.ts',
                    extension: '.ts',
                    isExternalLibraryImport: true
                });
            }
        }
        ;
        return resolvedModules;
    }
    ;
}
exports.Compiler = Compiler;
;
