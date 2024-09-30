/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import Lib from './lib';
import * as Parser from './parser';
import TS, { Type } from "./lib/typescript";
import Path from './path';
export {Parser, Path};
import * as Sol from './solCompile';
import * as Types from './types';
import { ICompilerError } from './types';
export {Types};

let isNode = false;    
if (typeof process === 'object') {
  if (typeof process.versions === 'object') {
    if (typeof process.versions.node !== 'undefined') {
      isNode = true;
    }
  }
};
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

export enum EPackageType{
    contract = 'contract',
    dapp = 'dapp',  
    widget = 'widget',
    worker = 'worker'
}
// export async function bundle(storage: IStorage, RootPath: string, packageType?: EPackageType){
//     let scconfig = await storage.getSCConfig();
//     if (packageType || scconfig?.type){
//         switch(packageType || scconfig?.type){
//             case 'dapp':
//                 await bundleDapp(storage, RootPath);
//                 break;
//             case 'contract':
//                 await bundleContract(storage, RootPath);
//                 break;
//             default:
//                 await bundleDapp(storage, RootPath);
//                 break;
//         }
//     }
//     else
//         await bundleContractDist(storage, RootPath);
// };
export async function bundleContract(storage: Types.IStorage, solc: Types.ISolc, RootPath?: string){
    RootPath = RootPath || storage.rootPath;
    let scconfig = await storage.getSCConfig();
    let options = scconfig?.solidity;
    if (!options){
        let solconfig = await storage.readFile('solconfig.json');
        if (solconfig)
            options = JSON.parse(solconfig);
    };
    await Sol.bundle(solc, storage, options || {
        "version": "0.8.19",
        "optimizerRuns": 999999,
        "sourceDir": "contracts",
        "outputDir": "src/contracts",
        "outputObjects": "bytecode"
    }, RootPath);
    await bundleDist('contract', storage, RootPath);
    await bundleLib(storage, RootPath);
};
export async function bundleSdk(storage: Types.IStorage, RootPath?: string){
    RootPath = RootPath || storage.rootPath;
    await bundleDist('sdk', storage, RootPath);
    await bundleLib(storage, RootPath);
};
export async function bundleLib(storage: Types.IStorage, RootPath?: string){
    RootPath = RootPath || storage.rootPath;
    let packageConfig = await storage.getPackageConfig();
    if (packageConfig){
        let packageManager = new PackageManager({
            packageImporter: async (packName: string) => {
                let pack = await storage.getPackageTypes(packName);
                return pack;
            },
            tsconfig: {
                allowJs: false,
                alwaysStrict: true,
                declaration: true,   
                esModuleInterop: true,
                removeComments: true,
                moduleResolution: TS.ModuleResolutionKind.Classic,
                resolveJsonModule: false,
                skipLibCheck: true,
                noEmitOnError: true,
                module: TS.ModuleKind.CommonJS,
                target: TS.ScriptTarget.ES2020
            }
        });
        packageManager.addPackage('@ijstech/eth-contract', await storage.getPackageTypes('@ijstech/eth-contract'));            
        let pack:Types.IPackage = { files: await storage.getFiles(Path.join(RootPath, 'src'))};
        packageManager.addPackage(packageConfig.name, pack);
        await packageManager.buildAll();

        pack = packageManager.packages(packageConfig.name);

        if (pack.errors && pack.errors.length > 0) {
            console.error('Package compilation error: ' + packageConfig.name);
            console.error(JSON.stringify(pack.errors, null, 4));
            return;
        };

        let libDir = Path.join(RootPath, 'lib');
        let typesDir = Path.join(RootPath, 'types');
        for (let fileName in pack.script){
            let content = pack.script[fileName];
            await storage.writeFile(Path.join(libDir, fileName), content);
        }
        for (let fileName in pack.dts){
            let content = pack.dts[fileName];
            await storage.writeFile(Path.join(typesDir, fileName), content);
        };
    };
};
export async function bundleDist(bundleType: string, storage: Types.IStorage, RootPath?: string){
    RootPath = RootPath || storage.rootPath;
    let packageConfig = await storage.getPackageConfig();
    if (packageConfig){
        let packageManager = new PackageManager({
            packageImporter: async (packName: string) => {
                let pack = await storage.getPackageTypes(packName);
                return pack;
            }
        });       
        let pack:Types.IPackage = { files: await storage.getFiles(Path.join(RootPath, 'src'))};
        for (let n in pack.files){
            if (n == 'index.ts' || n == 'index.tsx')
                pack.files[n] = `///<amd-module name='${packageConfig.name}'/> \n` + pack.files[n];
            else
                pack.files[n] = `///<amd-module name='${packageConfig.name}/${n}'/> \n` + pack.files[n];
        };
        packageManager.addPackage(packageConfig.name, pack);
        await packageManager.buildAll();

        pack = packageManager.packages(packageConfig.name);
        if (pack.errors && pack.errors.length > 0) {
            console.error('Package compilation error: ' + packageConfig.name);
            console.error(JSON.stringify(pack.errors, null, 4));
            return;
        };

        let distDir = Path.join(RootPath, 'dist');
        let typesDir = Path.join(RootPath, 'pluginTypes');
        let script = '';
        let dts = '';
        if (pack.script && pack.script['index.js'])
            script = pack.script['index.js'];
        if (pack.dts && pack.dts['index.d.ts'])
            dts = pack.dts['index.d.ts'];    
        await storage.writeFile(Path.join(distDir, 'index.js'), script);
        await storage.writeFile(Path.join(typesDir, 'index.d.ts'), dts);
        await storage.writeFile(Path.join(distDir, 'scconfig.json'), JSON.stringify({
            name: packageConfig.name,
            type: bundleType,
            version: packageConfig.version,                        
            dependencies: pack.dependencies
        },null,4));
        await storage.writeFile(Path.join(distDir, 'scconfig.json'), JSON.stringify({
            name: packageConfig.name,
            type: bundleType,
            version: packageConfig.version,                        
            dependencies: pack.dependencies
        },null,4));
    };
};
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
export async function bundleWorker(storage: Types.IStorage, RootPath?: string){
    RootPath = RootPath || storage.rootPath;
    let scConfig = await storage.getSCConfig();
    if (scConfig?.workers){
        let results: {[name: string]: string} = {};
        let files = await storage.getFiles(Path.join(RootPath, 'src'));
        let deps: string[] = [];
        for (let n in scConfig.workers){
            if (!results[n]){
                let workerConfig = scConfig.workers[n];
                if (workerConfig.module){
                    let modulePath = Path.join(RootPath, 'src', workerConfig.module);
                    let pack: any = { files: {}};
                    for (let n in files)
                        pack.files[n] = files[n];
                    let indexFile = workerConfig.module;
                    pack.indexFile = indexFile;
                    // pack.files['index.ts'] = files[workerConfig.module];
                    let packageManager = new PackageManager({
                        packageImporter: async (packName: string) => {
                            let pack = await storage.getPackageTypes(packName);
                            return pack;
                        },
                        tsconfig: {
                            allowJs: false,
                            alwaysStrict: true,
                            declaration: false,
                            esModuleInterop: true,
                            experimentalDecorators: true,  
                            module: TS.ModuleKind.AMD,
                            moduleResolution: TS.ModuleResolutionKind.Classic,
                            noEmitOnError: true,
                            outFile: "index.js",
                            removeComments: true,                            
                            resolveJsonModule: false,
                            skipLibCheck: true,
                            target: TS.ScriptTarget.ES2020
                        }
                    });
                    packageManager.addPackage('bignumber.js', await storage.getPackageTypes('bignumber.js'));
                    packageManager.addPackage('worker', pack);
                    if (workerConfig.plugins?.wallet){
                        packageManager.addPackage('@ijstech/eth-wallet', await storage.getPackageTypes('@ijstech/eth-wallet'));
                        packageManager.addPackage('@ijstech/eth-contract', await storage.getPackageTypes('@ijstech/eth-contract'));
                        packageManager.addPackage('@ijstech/wallet', await storage.getPackageTypes('@ijstech/wallet'));
                    };
                    await packageManager.buildAll();
                    pack = packageManager.packages('worker');
                    let script = pack.script['index.js'];
                    if (!script){
                        console.error('Worker compilation error: ' + n);
                        console.error(JSON.stringify(pack.errors, null, 4));
                        return;
                    };
                    results[n] = pack.script['index.js'];
                    workerConfig.module = `${n}.js`;
                    workerConfig.dependencies = [];
                    for (let i = 0; i < pack.dependencies.length; i++){
                        let n = pack.dependencies[i];
                        if (WorkerDefaultPackages.indexOf(n) < 0){
                            workerConfig.dependencies.push(n);
                            if (deps.indexOf(n) < 0)
                                deps.push(n);
                        };
                    };
                    await storage.writeFile(`dist/workers/${n}.js`, results[n]);
                };
            };
        };        
        for (let i = 0; i < deps.length; i++){
            let dep = deps[i];
            await storage.copyPackage(dep, `dist/libs/${dep}`);
        };
        await storage.writeFile('dist/scconfig.json', JSON.stringify(scConfig, null, 4));
    };
};
export async function bundleWidget(storage: Types.IStorage, RootPath?: string){
    RootPath = RootPath || storage.rootPath;
    let scRootDir = RootPath;
    let packageConfig = await storage.getPackageConfig();
    if (packageConfig){
        let packs: {[packName: string]: Types.IPackage} = {};
        let packageManager = new PackageManager({
            packageImporter: async (packName: string) => {
                let pack = await storage.getPackageTypes(packName);
                packs[packName] = pack;
                return pack;
            }
        });
        // packageManager.addPackage('@ijstech/components', await storage.getPackageTypes('@ijstech/components'));            
        let pack:Types.IPackage = { files: await storage.getFiles(Path.join(scRootDir, 'src'))};
        for (let n in pack.files){
            if (n == 'index.ts' || n == 'index.tsx')
                pack.files[n] = `///<amd-module name='${packageConfig.name}'/> \n` + pack.files[n];
            else
                pack.files[n] = `///<amd-module name='${packageConfig.name}/${n}'/> \n` + pack.files[n];
        };
        packageManager.addPackage(packageConfig.name, pack);
        await packageManager.buildAll();

        pack = packageManager.packages(packageConfig.name);
        if (pack.errors && pack.errors.length > 0) {
            console.error('Package compilation error: ' + packageConfig.name);
            console.error(JSON.stringify(pack.errors, null, 4));
            return;
        };

        let distDir = Path.join(scRootDir, 'dist');
        let typesDir = Path.join(scRootDir, 'pluginTypes');
        let script = '';
        let dts = '';
        if (pack.script && pack.script['index.js'])
            script = pack.script['index.js'];
        if (pack.dts && pack.dts['index.d.ts'])
            dts = pack.dts['index.d.ts'];
        await storage.copyAssets(Path.join(scRootDir, 'src'), distDir);
        await storage.writeFile(Path.join(distDir, 'index.js'), script);
        let dependencies: string[] = [];
        pack.dependencies?.forEach((item: string) => {
            let idx: number = 0;
            if (dependencies.indexOf(item) < 0){
                idx = dependencies.push(item);
                let dep = packs[item];
                dep?.dependencies?.forEach((depItem: string) => {
                    if (depItem.startsWith('@scom/')){
                        let depIdx = dependencies.indexOf(depItem);
                        if (depIdx < 0){
                            dependencies.splice(idx-1, 0, depItem);
                            idx++;
                        }
                        else if (depIdx > idx){
                            dependencies.splice(depIdx, 1);
                            dependencies.splice(idx-1, 0, depItem);
                            idx++;
                        };
                    }
                });
            };                
        });
        await storage.writeFile(Path.join(distDir, 'scconfig.json'), JSON.stringify({
            name: packageConfig.name,
            type: "widget",
            version: packageConfig.version,                        
            dependencies:  dependencies
        },null,4));
        await storage.writeFile(Path.join(typesDir, 'index.d.ts'), dts);
    };
};

export async function bundleDapp(storage: Types.IStorage, RootPath?: string){
    RootPath = RootPath || storage.rootPath;
    let scRootDir = RootPath;
    let bundleLibs: {[fileName: string]: string} = {};
    let bundleJS: string = `let scripts = document.getElementsByTagName("script");
let rootDir = scripts[scripts.length-1].src.replace(/^[a-zA-Z]{3,5}:\\/{2}[a-zA-Z0-9_.:-]+/,'').split('/').slice(0, -1).join('/');
if (!rootDir.endsWith('/'))
    rootDir += '/';\n`;
    let scconfig = await storage.getSCConfig();    
    if (scconfig) {   
        scconfig.packages = scconfig.packages || [];     
        let moduleSourceDir = Path.join(scRootDir, scconfig.moduleDir || 'modules');
        let packages: {[name: string]: string} = {};
        for (let name in scconfig.modules) {
            packages[name] = Path.join(moduleSourceDir, scconfig.modules[name].path);
        };
        let packageManager = new PackageManager({
            packageImporter: async (packName: string) => {
                let pack = await storage.getPackageTypes(packName);
                return pack;
            }
        });
        packageManager.addPackage('@ijstech/components', await storage.getPackageTypes('@ijstech/components'));
        if (scconfig.networks){
            packageManager.addPackage('bignumber.js', await storage.getPackageTypes('bignumber.js'));
            packageManager.addPackage('@ijstech/eth-wallet', await storage.getPackageTypes('@ijstech/eth-wallet'));
            packageManager.addPackage('@ijstech/eth-contract', await storage.getPackageTypes('@ijstech/eth-contract'));
        };
        for (let n in scconfig.dependencies){
            if (!packageManager.packages(n))
                packageManager.addPackage(n, await storage.getPackageTypes(n));  
        };
        
        for (let name in packages){
            let pack = { files: await storage.getFiles(packages[name]) };
            for (let n in pack.files){
                if (n == 'index.ts' || n == 'index.tsx')
                    pack.files[n] = `///<amd-module name='${name}'/> \n` + pack.files[n];
                else
                    pack.files[n] = `///<amd-module name='${name}/${n}'/> \n` + pack.files[n];
            };
            packageManager.addPackage(name, pack);
        };

        await packageManager.buildAll(storage);

        for (let name in packages) {
            let pack = packageManager.packages(name);
            if (pack.errors && pack.errors.length > 0) {
                console.error('Package compilation error: ' + name);
                console.error(JSON.stringify(pack.errors, null, 4));
                return;
            }
        };
        //copy compiled modules to dist directory
        let distDir = Path.join(scRootDir, scconfig.distDir || 'dist');
        if (scconfig.ipfs)
            distDir = distDir + '/output';
        let rootDir = '';
        if (scconfig.version && scconfig.bundle)
            rootDir = scconfig.version;
        let distLibDir = Path.join(distDir, rootDir,  'libs');
        let distModuleDir = Path.join(distDir, rootDir, 'modules');
                
        for (let name in scconfig.modules) {
            let pack = packageManager.packages(name);
            let module = scconfig.modules[name];
            // let deps: string[] = [];
            // if (module.dependencies){
            //     for (let n in module.dependencies){
            //         if (typeof(n) == 'string')
            //             deps.push(n);
            //     }
            // };
            module.dependencies = [];//deps;
            pack.dependencies?.forEach((item: string) => {
                if ((scconfig.modules[item] || item.startsWith('@scom/') || item.startsWith('@ijstech/')) && item != '@ijstech/components' && !item.startsWith('@ijstech/components/')){
                    if (module.dependencies.indexOf(item) < 0){
                        let idx = module.dependencies.push(item);
                        if (!scconfig.modules[item] && !scconfig.dependencies[item])
                            scconfig.dependencies[item] = '*';
                        let dep = packageManager.packages(item);
                        if (dep && dep.dependencies){
                            dep.dependencies.forEach((depItem: string) => {
                                if ((depItem.startsWith('@scom/') || depItem.startsWith('@ijstech/')) && depItem != '@ijstech/components' && !depItem.startsWith('@ijstech/components/')){
                                    if (module.dependencies.indexOf(depItem) < 0)
                                        module.dependencies.splice(idx -1, 0, depItem)
                                    else if (module.dependencies.indexOf(depItem) > idx){
                                        module.dependencies.splice(module.dependencies.indexOf(depItem), 1);
                                        module.dependencies.splice(idx, 0, depItem)
                                    };
                                };
                            });
                        };
                    };                    
                };
            });
            let distModulePath = Path.join(distModuleDir, module.path);
            let script = '';
            if (pack.script && pack.script['index.js'])
                script = pack.script['index.js'];
            await storage.copyAssets(Path.join(scRootDir, scconfig.moduleDir || 'modules', module.path), distModulePath);
            // await storage.mkdir(distModulePath);
            await storage.writeFile(Path.join(distModulePath, 'index.js'), script);
        };        
        let checkDeps = true;
        while (checkDeps) {
            checkDeps = false;
            for (let name in scconfig.modules) {
                let module = scconfig.modules[name];
                for (let i = 0; i < module.dependencies.length; i++){
                    let depModule = scconfig.modules[module.dependencies[i]];
                    if (depModule){
                        for (let k = 0; k < depModule.dependencies.length; k++){
                            if (module.dependencies.indexOf(depModule.dependencies[k]) < 0){
                                module.dependencies.splice(i, 0, depModule.dependencies[k]);
                                checkDeps = true;
                            };
                        };
                    };
                };
            };
        };
        //copy dependencies        
        let deps: string[] = [];
        await storage.copyPackage('@ijstech/components', Path.join(distLibDir, '@ijstech/components'), scconfig.packages);

        async function copyDependencies(dependencies: any, all?: boolean){
            let items = [];
            if (Array.isArray(dependencies))
                items = dependencies
            else
                items = Object.keys(dependencies);
            for (let i = 0; i < items.length; i ++){
                let name = items[i];
                if (name != '@ijstech/components/' && !name.startsWith('@ijstech/components/')){
                    if ((all || scconfig.modules[name] || name.startsWith('@ijstech/') || name.startsWith('@scom/'))){   
                        let pack;
                        if (scconfig.modules[name])
                            pack = scconfig.modules[name]
                        else
                            pack = await storage.copyPackage(name, Path.join(distLibDir, name), scconfig.packages);
                        if (pack){       
                            let existsIdx = deps.indexOf(name);
                            if (existsIdx >= 0)
                                deps.splice(existsIdx, 1);              
                            deps.unshift(name);
                            let dependencies = pack.dependencies || {};
                            if (name == '@ijstech/eth-contract'){
                                existsIdx = deps.indexOf('@ijstech/eth-wallet');
                                if (existsIdx >= 0)
                                    deps.splice(existsIdx, 1);
                                deps.unshift('@ijstech/eth-wallet');
                            }
                            await copyDependencies(dependencies);
                        };
                    };
                };
            };            
        };
        async function bundleDependencies(dependencies: any){
            dependencies = dependencies || {};
            for (let name in dependencies){
                if (scconfig.modules[name]){
                    let content = await storage.readFile(Path.join(distModuleDir, `${scconfig.modules[name].path}/index.js`));
                    if (content){
                        bundleJS += `application.currentModuleDir=rootDir+'modules/${scconfig.modules[name].path}';\n`;
                        bundleJS += `${content}\n`;
                    };
                }
                else{
                    let content = await storage.readFile(Path.join(distLibDir, name, 'index.js'));
                    if (content){
                        bundleJS += `application.currentModuleDir=rootDir+'libs/${name}';\n`;
                        bundleJS += `${content}\n`;
                    };
                };
            };
        };
        scconfig.dependencies = scconfig.dependencies || {};
        delete scconfig.dependencies[scconfig.main];
        if (scconfig.main)
            scconfig.dependencies[scconfig.main] = '*';
        // if (scconfig.bundle){
        //     await copyDependencies(scconfig.dependencies, true);
        //     await bundleDependencies(scconfig.dependencies);
        //     if (scconfig.main && scconfig.modules[scconfig.main] && scconfig.modules[scconfig.main].dependencies){
        //         let deps: {[name: string]: string} = {};
        //         for (let i = 0; i < scconfig.modules[scconfig.main].dependencies.length; i++)
        //             deps[scconfig.modules[scconfig.main].dependencies[i]] = '*';
        //         deps[scconfig.main] = '*';
        //         await bundleDependencies(deps);
        //     };
        //     await storage.writeFile(Path.join(distDir, rootDir, 'bundle.json'), JSON.stringify(bundleLibs));
        // }
        // else
        if (scconfig.assets)
            scconfig.dependencies[scconfig.assets] = '*';
        await copyDependencies(scconfig.dependencies, true);
        for (let i = 0; i < scconfig.packages.length; i++){
            let name = scconfig.packages[i];
            await storage.copyPackage(name, distLibDir, scconfig.packages);
        }
        // if (scconfig.packages){
        //     scconfig.packages.forEach(async (name: string) => {
        //         await storage.copyPackage(name, distLibDir, scconfig.packages);
        //     });
        //     delete scconfig.packages;
        // };            
        scconfig.dependencies = {};
        deps.forEach((name)=>{
            if (name != '@ijstech/components' && !name.startsWith('@ijstech/components/'))
                scconfig.dependencies[name] = '*'
        });
        if (scconfig.bundle){
            await bundleDependencies(scconfig.dependencies);
            // await storage.writeFile(Path.join(distDir, rootDir, 'bundle.json'), JSON.stringify(bundleLibs));
            await storage.writeFile(Path.join(distDir, rootDir, 'bundle.js'), bundleJS);
        };
        delete scconfig['distDir'];
        scconfig.moduleDir = 'modules';
        // scconfig.moduleDir = 'libs/' + packageConfig.name;//'modules';
        //generate index.html
        let indexHtml = indexHtmlTemplate;
        let meta = '';
        if (scconfig.meta){
            for (let n in scconfig.meta){
                if (n == 'favicon'){
                    let value = scconfig.meta[n];
                    if (rootDir && value.startsWith('modules/'))
                        value = `${rootDir}/${value}`;
                    meta += `  <link rel="icon" href="${value}">\n`
                }
                else if (n == 'title')
                    meta += `  <title>${scconfig.meta[n]}</title>\n`
                else if (n == 'chartset')
                    meta += `  <meta charset="${scconfig.meta[n]}">\n`
                else if (n.indexOf(':') < 0)
                    meta += `  <meta name="${n}" content="${scconfig.meta[n]}">\n`
                else
                    meta += `  <meta property="${n}" content="${scconfig.meta[n]}">\n`
            };
        };
        indexHtml = indexHtml.replace('{{meta}}', meta);
        let manifestLink = '';
        if (scconfig.manifest){  
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
            await storage.writeFile(Path.join(distDir, 'manifest.webmanifest'), JSON.stringify(manifest, null, 4));
        }
        indexHtml = indexHtml.replace('{{manifest}}', manifestLink);
        indexHtml = indexHtml.replace('{{main}}', `${scconfig.main || '@scom/dapp'}`);
        let content = await storage.readFile(Path.join(distLibDir, `@ijstech/components/index.js`));
        let cid = await storage.hashContent(content);
        let sri = await storage.cidToSri(cid);
        indexHtml = indexHtml.replace('{{sri}}', `sha256-${sri}`);
        if (scconfig.oauth) {
            let scripts = [];
            for (let provider in scconfig.oauth) {
                let providerInfo = scconfig.oauth[provider];
                if (!providerInfo.enabled) continue;
                if (provider == 'google') {
                    scripts.push(`<script src="https://accounts.google.com/gsi/client" async></script>`);
                }
            }
            indexHtml = indexHtml.replace('{{oauth}}', scripts.join('\n'));
        }
        else {
            indexHtml = indexHtml.replace('{{oauth}}', '');
        }
        if (scconfig.bundle){
            let cid = await storage.hashContent(bundleJS);
            let sri = await storage.cidToSri(cid);
            indexHtml = indexHtml.replace('{{bundleJS}}', `<script src="${rootDir?rootDir+'/':''}bundle.js" integrity="sha256-${sri}" crossorigin="anonymous"></script>`);
        }
        else
            indexHtml = indexHtml.replace('{{bundleJS}}', ``);
        if (scconfig.ipfs == true){
            delete scconfig.ipfs;
            let idx = indexHtml.replaceAll('{{rootDir}}', rootDir?rootDir+'/':'');
            await storage.writeFile(Path.join(distDir, 'index.html'), idx);
            await storage.writeFile(Path.join(distDir, 'scconfig.json'), JSON.stringify(scconfig, null, 4));
            let cid = await storage.hashDir(distDir);            
            let d = Path.join(scRootDir, scconfig.distDir || 'dist');
            await storage.rename(distDir, Path.join(d, cid.cid));
            indexHtml = indexHtml.replaceAll('{{rootDir}}', cid.cid + '/' + (rootDir?rootDir+'/':''));            
            await storage.writeFile(Path.join(d, 'index.html'), indexHtml);
            await storage.writeFile(Path.join(Path.join(d, `${cid.cid}.json`)), JSON.stringify(cid));
        }
        else{
            indexHtml = indexHtml.replaceAll('{{rootDir}}', rootDir?rootDir+'/':'');
            await storage.writeFile(Path.join(distDir, 'index.html'), indexHtml);
            await storage.writeFile(Path.join(distDir, rootDir?rootDir+'/':'', 'scconfig.json'), JSON.stringify(scconfig, null, 4));            
        };
        
        // if (scconfig.ipfs == true){
        //     let cid = await hashDir(distDir);
        //     scconfig.ipfs = cid.cid;
        //     await Fs.writeFile(Path.join(distDir, 'scconfig.json'), JSON.stringify(scconfig, null, 4), 'utf8');
        //     await Fs.mkdir(Path.join(distDir, 'ipfs'), { recursive: true });
        //     await writeIpfs(Path.join(distDir, 'ipfs'), cid);
        // };
    };
};
// let Path: any;
// let Fs: any;
const PackageWhiteList = ['bignumber.js'];

export function resolveAbsolutePath(baseFilePath: string, relativeFilePath: string): string{    
    let basePath = baseFilePath.split('/').slice(0,-1).join('/');    
    if (basePath)
        basePath += '/';
    let fullPath = basePath + relativeFilePath;    
    return fullPath.split('/')
        .reduce((result: string[], value: string) => {
            if (value === '.'){}
            else if (value === '..') 
                result.pop()
            else
                result.push(value);
            return result;
        }, [])
        .join('/');
};
export type FileImporter = (fileName: string, isPackage?: boolean) => Promise<{fileName: string, content: string}|null>;
export type PackageImporter = (packName: string) => Promise<Types.IPackage>;
export class PackageManager{
    private packageImporter: PackageImporter | undefined;
    private tsconfig: any;
    private _packages: {[name: string]: Types.IPackage}={};

    constructor(options?: {packageImporter?: PackageImporter, tsconfig?: any}){
        this.packageImporter = options?.packageImporter;
        this.tsconfig = options?.tsconfig;
    };
    addPackage(name: string, pack: Types.IPackage){        
        if (!this._packages[name])
            this._packages[name] = pack
    };
    async buildAll(storage?: Types.IStorage): Promise<boolean>{
        for (let name in this._packages){
            let result = await this.buildPackage(name, storage);
            if (result.errors && result.errors.length > 0){
                console.error('Failed to build package: ' + name)
                // console.error(JSON.stringify(result.errors, null, 4));
                throw new Error(JSON.stringify(result.errors, null, 4));
            }
        };
        return true;
    };
    async buildPackage(name: string, storage?: Types.IStorage): Promise<Types.IPackage>{
        let pack = this._packages[name];        
        if (!pack.dts && pack.files){
            // console.dir('#Build package: ' + name);
            if (storage?.onCompile) storage.onCompile(name);
            let indexFile: string = '';
            if (pack.indexFile)
                indexFile = pack.indexFile;
            else if (pack.files['index.ts'])
                indexFile = 'index.ts'
            else if (pack.files['index.tsx'])
                indexFile = 'index.tsx';
            if (indexFile){
                let compiler = new Compiler({packageImporter: this.packageImporter, tsconfig: this.tsconfig});
                for (let n in this._packages){
                    if (this._packages[n].dts)
                        compiler.addPackage(n, this._packages[n])
                };
                await compiler.addFile(indexFile, pack.files[indexFile], async (fileName: string, isPackage?: boolean): Promise<{fileName: string, content: string}|null>=>{                    
                    if (isPackage){        
                        if (fileName && fileName.startsWith('@ijstech/components/'))
                            fileName = '@ijstech/components'; 
                        if (this._packages[fileName]){    
                            if (!this._packages[fileName].dts){
                                // console.dir('Add dependence: ' + fileName)
                                let p = await this.buildPackage(fileName);    
                                if (p.errors && p.errors.length > 0){
                                    // console.dir(p.errors)
                                    // throw new Error('Failed to build package: ' + fileName);
                                    throw new Error(JSON.stringify(p.errors, null, 4));
                                };
                            };
                            compiler.addPackage(fileName, this._packages[fileName]);
                            let dts = '';
                            let pack = this._packages[fileName];
                            if (pack.dts && pack.dts['index.d.ts'])
                                dts = pack.dts['index.d.ts'];
                            return {
                                fileName: 'index.d.ts',
                                content: dts
                            }
                        }
                        // console.dir('Add dependence: ' + fileName)                        
                        let result = await compiler.addPackage(fileName);
                        if (result)
                            return result;
                        throw new Error('Package not found: ' + fileName)
                    }
                    else{
                        let name = '';
                        if (pack.files){
                            if (pack.files[fileName])
                                name = fileName
                            else if (pack.files[fileName + '.ts'])
                                name = fileName + '.ts'
                            else if (pack.files[fileName + '.tsx'])
                                name = fileName + '.tsx'
                            else if (pack.files[fileName + '.d.ts'])
                                name = fileName + '.d.ts'
                            else if (pack.files[fileName + '/index.ts'])
                                name = fileName + '/index.ts';
                            if (name)
                                return {
                                    fileName: name,
                                    content: pack.files[name]
                                };
                        };
                        return null;
                    }
                });
                if (storage?.onCompile) storage.onCompile(name);
                let result = await compiler.compile(true);
                pack.dts = result.dts;
                pack.script = result.script;
                pack.dependencies = compiler.dependencies;
                pack.errors = result.errors;
            };
        };
        return pack;
    };
    packages(name: string): Types.IPackage{
        return this._packages[name];
    };
};
export class Compiler {
    private scriptOptions: TS.CompilerOptions;
    private dtsOptions: TS.CompilerOptions;
    private files: { [name: string]: string };
    private packageFiles: {[name: string]: string};
    private packages: {[index: string]: Types.IPackage} = {};
    private libs: {[index: string]: string};
    private fileNotExists: string;
    private resolvedFileName: string;
    public dependencies: string[] = [];
    private host: TS.CompilerHost;

    private packageImporter: PackageImporter | undefined;
    constructor(options?: {packageImporter?: PackageImporter, tsconfig?: any}) {
        this.packageImporter = options?.packageImporter;
        this.scriptOptions = options?.tsconfig || {
            allowJs: false,
            alwaysStrict: true,
            declaration: true,      
            experimentalDecorators: true,      
            resolveJsonModule: false,
            skipLibCheck: true,
            noEmitOnError: true,
            module: TS.ModuleKind.AMD,
            outFile: 'index.js',
            // module: TS.ModuleKind.CommonJS,
            target: TS.ScriptTarget.ES2020,
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
            module: TS.ModuleKind.CommonJS,
            noEmitOnError: true,
            target: TS.ScriptTarget.ES2020
        };
        this.files = {};
        this.packageFiles = {};
    };
    private async importDependencies(fileName: string, content: string, fileImporter: FileImporter, result?: string[]): Promise<string[]>{
        let ast = TS.createSourceFile(
            fileName,
            content,
            TS.ScriptTarget.ES2020,
            true
        );
        result = result || [];
        for (let i = 0; i < ast.statements.length; i ++){
            let node = ast.statements[i];                        
            if (node.kind == TS.SyntaxKind.ImportDeclaration || node.kind == TS.SyntaxKind.ExportDeclaration){
                if ((node as any).moduleSpecifier){
                    let module = (<TS.LiteralLikeNode>(node as any).moduleSpecifier).text;
                    
                    if (module.startsWith('.')){                    
                        let filePath = resolveAbsolutePath(fileName, module)                    
                        if (this.files[filePath] == undefined && this.files[filePath + '.ts'] == undefined && this.files[filePath + '.tsx'] == undefined){                        
                            let file = await fileImporter(filePath);
                            if (file){
                                result.push('./' + file.fileName);
                                this.addFile(file.fileName, file.content);
                                await this.importDependencies(file.fileName, file.content, fileImporter, result);
                            }                        
                        }
                    }
                    else{
                        if (this.dependencies.indexOf(module) < 0)
                            this.dependencies.push(module);
                        if (!this.packages[module]){
                            let isSubmodule = module.split('/').length > 2;               
                            if (!isSubmodule && this.packageImporter) {
                                let pack = await this.addPackage(module)
                                if (pack)
                                    result.push(module);
                                // let pack = await this.packageImporter(module)
                                // if (pack){
                                //     result.push(module);
                                //     this.addPackage(module, pack);
                                // };
                            }
                            else {
                                let file = await fileImporter(module, true);
                                if (file){
                                    result.push(module);
                                    let pack: Types.IPackage = {
                                        dts: {'index.d.ts': file.content}
                                    };
                                    this.addPackage(module, pack);        
                                };
                            };
                        };   
                    };
                } 
            }            
        };
        return result;
    }
    async addFile(fileName: string, content: string, dependenciesImporter?: FileImporter): Promise<string[]> {
        this.files[fileName] = content;
        if (dependenciesImporter){            
            let result = await this.importDependencies(fileName, content, dependenciesImporter);
            return result;
        }
        else
            return [];
    };
    updateFile(fileName: string, content: string){
        this.files[fileName] = content;
    };
    private getProgram(result?: Types.ICompilerResult): TS.Program{
        const host = {
            getSourceFile: this.getSourceFile.bind(this),
            getDefaultLibFileName: () => "lib.d.ts",
            writeFile: (fileName: string, content: string) => {
                if (result){
                    if (fileName.endsWith('d.ts'))
                        result.dts[fileName] = content
                    else{                    
                        result.script[fileName] = content.replace(new RegExp(/\global.\$JSX\(/, 'g'), 'this.$render(');
                    }
                };                
            },
            getCurrentDirectory: () => "",
            getDirectories: (path: string) => {
                return TS.sys.getDirectories(path)
            },
            getCanonicalFileName: (fileName: string) =>
                TS.sys && TS.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
            getNewLine: () => TS.sys && TS.sys.newLine?TS.sys.newLine:'\n',
            useCaseSensitiveFileNames: () => TS.sys && TS.sys.useCaseSensitiveFileNames?TS.sys.useCaseSensitiveFileNames:false,
            fileExists: () => true,
            readFile: this.readFile.bind(this),
            resolveModuleNames: this.resolveModuleNames.bind(this)
        };
        let fileNames = [];
        
        for (let f in this.files)
            fileNames.push(f);
        

        let program:TS.Program = TS.createProgram(fileNames, this.scriptOptions, host);
        return program;
    };
    async addPackage(packName: string, pack?: Types.IPackage): Promise<{fileName: string, content: string} | undefined>{       
        if (!pack){
            if (!this.packages[packName]){     
                if (packName == '@ijstech/eth-contract' || packName == '@ijstech/eth-wallet')
                    await this.addPackage('bignumber.js');
                if (packName == '@ijstech/eth-wallet')
                    await this.addPackage('@ijstech/eth-contract');           
                if (this.packageImporter){
                    // let pack = await storage.getPackageTypes(packName);
                    let pack = await this.packageImporter(packName);
                    if (pack?.dts){     
                        this.addPackage(packName, pack);               
                        if (pack.dependencies){
                            for (let i = 0; i < pack.dependencies.length; i ++){
                                let n = pack.dependencies[i];
                                if (PackageWhiteList.indexOf(n) > -1 || n.startsWith('@scom/') || n.startsWith('@ijstech/'))
                                    await this.addPackage(n);
                            };
                        };
                        let dts = '';
                        if (pack.dts && pack.dts['index.d.ts'])
                            dts = pack.dts['index.d.ts'];
                        return {
                            fileName: 'index.d.ts',
                            content: dts
                        };
                    };
                };                
            };
        } 
        else{
            this.packages[packName] = pack;
            if (pack.dts && pack.dts['index.d.ts'])
                this.packageFiles[packName] = pack.dts['index.d.ts'];
        };
    };
    async compile(emitDeclaration?: boolean): Promise<Types.ICompilerResult> {
        let result: Types.ICompilerResult = {
            errors: [],
            script: {},
            dts: {},
        };        
        try{
            let program = this.getProgram(result);
            const emitResult = program.emit();
            emitResult.diagnostics.forEach(item => {
                result.errors.push({
                    category: item.category,
                    code: item.code,
                    file: item.file?item.file.fileName:'',
                    length: item.length?item.length:0,
                    message: item.messageText,
                    start: item.start?item.start:0
                });
            });
            // if (emitDeclaration){
            //     program = TS.createProgram(fileNames, this.dtsOptions, host);
            //     program.emit();
            // };
        }
        catch(err){
            if (this.fileNotExists)
                console.dir('File not exists: ' + this.fileNotExists)
            else
                console.trace(err);
        };
        return result;
    };
    getSource(fileName: string): TS.SourceFile | undefined{
        let program = this.getProgram();
        program.getTypeChecker();
        const source = program.getSourceFile(fileName);
        return source;
    };
    addComponentProp(fileName: string, className: string, id: string){        
        const source = this.getSource(fileName);
        if (source){
            let result = Parser.addComponentProp(source, className, id);
            return result;
        };
    };
    addEventHandler(fileName: string, classNames: string[], func:string, params?: string): {code?: string, lineNumber?: number, columnNumber?: number,}{
        const source = this.getSource(fileName);
        if (source){
            let result = Parser.addEventHandler(source, classNames, func, params);
            return result;
        }
        else   
            return {};
    };
    locateMethod(fileName: string, funcName:string): {lineNumber?: number, columnNumber?: number,}{
        const source = this.getSource(fileName);
        if (source){
            let result = Parser.locateMethod(source, funcName);
            return result;
        }
        else   
            return {};
    };
    locateError(error: ICompilerError): {lineNumber?: number, columnNumber?: number,}{
        const fileName = error.file;
        const source = this.getSource(fileName);
        if (source){
            let result = Parser.locateError(source, error.start);
            return result;
        }
        else
            return {};
    };
    locateControl(fileName: string, control: Parser.IComponent): {lineNumber?: number, columnNumber?: number}{
        const source = this.getSource(fileName);
        if (source){
            let result = Parser.locateControl(source, control);
            return result;
        }
        else   
            return {};
    };
    renameMethod(fileName: string, fromFuncName:string, toFuncName:string): string | undefined{
        const source = this.getSource(fileName);
        if (source){
            let result = Parser.renameMethod(source, fromFuncName, toFuncName);
            return result;
        };
    };
    renameComponent(fileName: string, className: string, fromId: string, toId: string){
        const source = this.getSource(fileName);
        if (source){
            let result = Parser.renameProperty(source, className, fromId, toId);
            return result;
        }
    };
    parseUI(fileName: string, funcName?: string): Parser.IComponent | undefined{
        funcName = funcName || 'render';        
        
        let program = this.getProgram();
        program.getTypeChecker();
        const source = program.getSourceFile(fileName);
        // https://ts-ast-viewer.com/
        if (source){
            let component = Parser.parseUI(source, funcName);
            return component;
        };
        return;
    };
    renderUI(fileName: string, funcName?: string, component?: Parser.IComponent): string | undefined{
        funcName = funcName || 'render';        
        let program = this.getProgram();
        program.getTypeChecker();
        const source = program.getSourceFile(fileName);
        if (source){
            return Parser.renderUI(source, funcName, component);
        };
    };
    fileExists(fileName: string): boolean {
        let result = this.files[fileName] != undefined || this.packageFiles[fileName] != undefined;
        if (!result && fileName.endsWith('.d.ts')) {
            let packName = fileName.split('/').slice(0,2).join('/');
            let dtsFile = fileName.split('/').slice(2).join('/');
            let pack = this.packages[packName];
            if (pack && pack.dts && pack.dts[dtsFile])
                result = true;
            // result = this.packages[packName] != undefined;
        };    
        if (!result && fileName.endsWith('.ts'))
            result = this.packages[fileName.slice(0, -3)] != undefined;
        this.resolvedFileName = '';
        if (!result && this.files[fileName.slice(0, -3) + '/index.ts'] != undefined){
            result = true;
            this.resolvedFileName = fileName.slice(0, -3) + '/index.ts';
        };
        if (!result)        
            this.fileNotExists = fileName
        else
            this.fileNotExists = '';
        return result;
    };
    async getDependencies(fileName: string, content: string, fileImporter?: FileImporter, result?: string[]): Promise<string[]>{
        let ast = TS.createSourceFile(
            fileName,
            content,
            TS.ScriptTarget.ES2020,
            true
        );
        result = result || [];
        for (let i = 0; i < ast.statements.length; i ++){
            let node = ast.statements[i];                        
            if (node.kind == TS.SyntaxKind.ImportDeclaration){                
                let module = (<TS.LiteralLikeNode>(node as any).moduleSpecifier).text;   
                if (module.startsWith('@ijstech/components/'))        
                    module = '@ijstech/components';     
                if (module.startsWith('.')){
                    let filePath = resolveAbsolutePath(fileName, module)
                    if (result.indexOf(filePath) < 0 && result.indexOf(filePath + '.ts') < 0 && result.indexOf(filePath + '.tsx') < 0){
                        if (fileImporter){
                            let file = await fileImporter(filePath);
                            if (file){
                                result.push(file.fileName);
                                await this.getDependencies(filePath, file.content, fileImporter, result);
                            }
                        }
                        else
                            result.push(filePath);
                    }
                }
                else if (result.indexOf(module) < 0){
                    if (fileImporter)
                        await fileImporter(module, true);
                    result.push(module);
                }
            }
        }        
        return result;
    };
    getSourceFile(fileName: string, languageVersion: TS.ScriptTarget, onError?: (message: string) => void) {
        if (fileName == 'lib.d.ts') {            
            return TS.createSourceFile(fileName, Lib, languageVersion);
        };
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
        };
        if (!content && fileName.startsWith('@')){
            packName = fileName.split('/').slice(0,2).join('/');// slice(0, -1).join('/');
            dtsFile = fileName.split('/').slice(2).join('/');
            if (!dtsFile){
                if (packName.endsWith('.ts')){
                    packName = packName.slice(0, -3);
                    dtsFile = 'index.d.ts'; 
                }
                else            
                    dtsFile = 'index.d.ts';    
            };  
            dtsDir = dtsFile.slice(0, -5);
        };
        if (!content){
           let pack = this.packages[packName];
            if (pack && pack.dts && pack.dts[dtsFile]){
                content = pack.dts[dtsFile];
            } 
            else if (pack && pack.dts && pack.dts[dtsDir + '/index.d.ts']){
                fileName = packName + '/' + dtsDir + '/index.d.ts';
                content = pack.dts[dtsDir + '/index.d.ts'];
            }
            else {
                packName = fileName.split('/').slice(0, -1).join('/');
                for (let n in this.packages){
                    if (packName.endsWith('/' + n)){
                        let pack = this.packages[n];
                        let dts = '';
                        if (pack && pack.dts && pack.dts['index.d.ts'])
                            dts = pack.dts['index.d.ts'];
                        content = dts;
                        break;
                    };
                };
            };
        };
        if (!content){
            console.error('File not exists: ' + fileName);
            return;
        }

        return TS.createSourceFile(fileName, content, languageVersion);
    };
    readFile(fileName: string): string | undefined {
        return;
    };
    resolveModuleNames(moduleNames: string[], containingFile: string): TS.ResolvedModule[] {
        let resolvedModules: TS.ResolvedModule[] = [];
        for (const moduleName of moduleNames) {
            let result = TS.resolveModuleName(moduleName, containingFile, this.scriptOptions, {
                fileExists: this.fileExists.bind(this),
                readFile: this.readFile.bind(this)
            });
            if (result.resolvedModule) {
                if (!moduleName.startsWith('./') && !moduleName.startsWith('../')){
                    resolvedModules.push(<any>{
                        resolvedFileName: moduleName + '/index.d.ts',
                        extension: '.ts',
                        isExternalLibraryImport: true
                    });
                }
                else if (this.resolvedFileName){
                    resolvedModules.push(<any>{
                        resolvedFileName: this.resolvedFileName,
                        extension: '.ts',
                        isExternalLibraryImport: false
                    });
                }
                else{
                    let resolvedFileName = result.resolvedModule.resolvedFileName;
                    if (resolvedFileName.startsWith('@') && resolvedFileName.endsWith('.ts') && resolvedFileName.split('/').length == 2){
                        resolvedFileName = resolvedFileName.slice(0, -3) + '/index.d.ts';
                        result.resolvedModule.resolvedFileName = resolvedFileName;
                    };     
                    resolvedModules.push(result.resolvedModule);
                }
            }
            else{
                let resolvedFileName = moduleName;
                if (resolvedFileName.startsWith('.')){
                    resolvedFileName = resolveAbsolutePath(containingFile, resolvedFileName);
                    if (resolvedFileName.startsWith('@') && resolvedFileName.split('/').length == 2){ 
                        let packName = containingFile.split('/').slice(0,2).join('/');
                        resolvedFileName = packName + '/' + resolvedFileName.split('/').pop();
                    };
                };
                resolvedModules.push(<any>{
                    resolvedFileName: resolvedFileName + '/index.d.ts',
                    extension: '.ts',
                    isExternalLibraryImport: true
                });
            }
        };
        return resolvedModules;
    };
};
