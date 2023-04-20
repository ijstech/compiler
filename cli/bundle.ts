#!/usr/bin/env node
import Path from 'path';
import { PackageManager, IPackage } from '@ijstech/compiler';
import { promises as Fs, createReadStream} from 'fs';
import IPFS from './ipfs.js';

const RootPath = process.cwd();
const SourcePath = process.argv[2];

export interface ICidInfo {
    cid: string;
    links?: ICidInfo[];
    name?: string;
    size: number;
    type?: 'dir' | 'file'
}
export async function hashItems(items?: ICidInfo[], version?: number): Promise<ICidInfo> {
    return await IPFS.hashItems(items || [], version);
};
export async function hashFile(filePath: string, version?: number, options?: {
    rawLeaves?: boolean,
    minChunkSize?: number,
    maxChunkSize?: number,
    avgChunkSize?: number,
    maxChildrenPerNode?: number
}): Promise<{cid: string, size: number}> {
    if (version == undefined)
        version = 1;
    let size: number;
    let stat = await Fs.stat(filePath);
    size = stat.size;    
    let file = createReadStream(filePath);
    let cid: string;
    let result;
    if (size == 0){
        cid = await IPFS.hashContent('', version);    
        return {
            cid,
            size
        };
    }
    else if (version == 1){
        result = await IPFS.hashFile(file, version, IPFS.mergeOptions({ //match web3.storage default parameters, https://github.com/web3-storage/web3.storage/blob/3f6b6d38de796e4758f1dffffe8cde948d2bb4ac/packages/client/src/lib.js#L113
            rawLeaves: true,
            maxChunkSize: 1048576,
            maxChildrenPerNode: 1024
        }, options || {}))
    }
    else
        result = await IPFS.hashFile(file, version);
    return result;
}
export async function hashDir(dirPath: string, version?: number, excludes?: string[]): Promise<ICidInfo> {
    if (version == undefined)
        version = 1;
    let files = await Fs.readdir(dirPath);
    let items: ICidInfo[] = [];
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let path = Path.join(dirPath, file);
        if (!excludes || excludes.indexOf(path) < 0){
            let stat = await Fs.stat(path)
            if (stat.isDirectory()) {
                let result = await hashDir(path, version, excludes);
                result.name = file;
                items.push(result);
            }
            else {
                try{
                    let result = await hashFile(path, version);
                    items.push({
                        cid: result.cid,
                        name: file,
                        size: result.size,
                        type: 'file'
                    })
                }
                catch(err){
                    console.dir(path)
                }
            }
        }
    };
    let result = await hashItems(items, version);
    return {
        cid: result.cid,
        name: '',
        size: result.size,
        type: 'dir',
        links: items
    };
};
async function copyAssets(sourceDir: string, targetDir: string){
    let files = await Fs.readdir(sourceDir, { withFileTypes: true });
    for (let file of files) {
        if (file.isDirectory()) {
            copyAssets(Path.join(sourceDir, file.name), Path.join(targetDir, file.name));            
        }
        else {
            if (!file.name.endsWith('.ts') && !file.name.endsWith('.tsx')){
                await Fs.mkdir(targetDir, { recursive: true });
                Fs.copyFile(Path.join(sourceDir, file.name), Path.join(targetDir, file.name))
            };
        };
    };
};
export async function getLocalPackagePath(name: string): Promise<string> {
    if (name[0] != '/')
        name = Path.dirname(require.resolve(name))
    let path = Path.dirname(name);
    if (path && path != '/') {
        try {
            let stat = await Fs.stat(Path.join(name, 'package.json'))
            if (stat.isFile())
                return name
            else
                return getLocalPackagePath(path);
        }
        catch (err) {
            return getLocalPackagePath(path);
        };
    }
    else
        return '';
};
export async function getLocalPackageTypes(name: string, packName?: string): Promise<IPackage> {
    packName = packName || name;
    if (name[0] != '/')
        name = Path.dirname(require.resolve(name));
    let path = Path.dirname(name);
    if (path && path != '/') {
        try {
            let pack = JSON.parse(await Fs.readFile(Path.join(name, 'package.json'), 'utf8'))
            let dts = await Fs.readFile(Path.join(name, pack.pluginTypes || pack.types || pack.typings || 'index.d.ts'), 'utf8');
            return {
                dts: dts
            };
        }
        catch (err) {
            return getLocalPackageTypes(path, packName);
        }
    }
    else{
        throw new Error('Failed to get package: ' + packName);
    }
};
export async function getLocalScripts(path: string): Promise<{ [filePath: string]: string }> {
    let result: { [filePath: string]: string } = {};
    let files = await Fs.readdir(path, { withFileTypes: true });
    for (let file of files) {
        if (file.isDirectory()) {
            let r = await getLocalScripts(Path.join(path, file.name));
            for (let name in r) {
                result[file.name + '/' + name] = r[name];
            }
        }
        else {
            if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')){
                result[file.name] = await Fs.readFile(Path.join(path, file.name), 'utf8')
            }
        }
    };
    return result;
};
async function readSCConfig(path: string): Promise<any>{
    try{
        return JSON.parse(JSON.stringify(JSON.parse(await Fs.readFile(Path.join(path, 'scconfig.json'), 'utf-8'))));
    }
    catch(err){}
};
async function readPackageConfig(path: string): Promise<any>{
    try{
        return JSON.parse(JSON.stringify(JSON.parse(await Fs.readFile(Path.join(path, 'package.json'), 'utf-8'))));
    }
    catch(err){}
};
async function writeIpfs(distDir: string, cid: ICidInfo){
    let links: ICidInfo[] = [];
    if (cid.links){
        for (let i = 0; i < cid.links.length; i ++){
            let item = cid.links[i]
            links.push({
                cid: item.cid,
                name: item.name,
                size: item.size,
                type: item.type
            });
            if (item.type == 'dir')
                await writeIpfs(distDir, item)
        };
        let item = {
            cid: cid.cid,
            name: cid.name,
            size: cid.size,
            type: cid.type,
            links: links
        };
        await Fs.writeFile(Path.join(distDir, `${cid.cid}`), JSON.stringify(item), 'utf8');
    }
};
async function bundle() {
    let scRootDir = RootPath;
    if (SourcePath)
        scRootDir = Path.relative(scRootDir, SourcePath);
    
    let scconfig = await readSCConfig(scRootDir);
    let packageConfig = await readPackageConfig(scRootDir);
    if (scconfig){
        let moduleDir = scRootDir;
        if (scconfig.moduleDir)
            moduleDir = Path.join(scRootDir, scconfig.moduleDir);

        let packages = {};
        for (let name in scconfig.modules) {
            packages[name] = Path.join(moduleDir, scconfig.modules[name].path);
        };
        let packageManager = new PackageManager({
            packageImporter: async (packName: string) => {
                let pack = await getLocalPackageTypes(packName);
                return pack;
            }
        });
        packageManager.addPackage('@ijstech/components', await getLocalPackageTypes('@ijstech/components'));
        if (scconfig.networks){
            packageManager.addPackage('bignumber.js', await getLocalPackageTypes('bignumber.js'));
            packageManager.addPackage('@ijstech/eth-wallet', await getLocalPackageTypes('@ijstech/eth-wallet'));
            packageManager.addPackage('@ijstech/eth-contract', await getLocalPackageTypes('@ijstech/eth-contract'));
        };
        for (let n in scconfig.dependencies){
            if (!packageManager.packages[n])
                packageManager.addPackage(n, await getLocalPackageTypes(n));  
        };
        
        for (let name in packages){
            let pack = { files: await getLocalScripts(packages[name]) };
            for (let n in pack.files){
                if (n == 'index.ts' || n == 'index.tsx')
                    pack.files[n] = `///<amd-module name='${name}'/> \n` + pack.files[n];
                else
                    pack.files[n] = `///<amd-module name='${name}/${n}'/> \n` + pack.files[n];
            };
            packageManager.addPackage(name, pack);
        };

        await packageManager.buildAll();

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
        let distModuleDir = Path.join(distDir, 'modules');
        // let distModuleDir = Path.join(distDir, 'libs/' + packageConfig.name);//'modules');
                
        for (let name in scconfig.modules) {
            let pack = packageManager.packages(name);
            let module = scconfig.modules[name];
            module.dependencies = [];
            pack.dependencies?.forEach((item) => {
                if (item != '@ijstech/components' && !item.startsWith('@ijstech/components/')){
                    module.dependencies.push(item);
                    if (!scconfig.modules[item] && !scconfig.dependencies[item])
                        scconfig.dependencies[item] = '*';
                };
            });
            let moduleDir = Path.join(distModuleDir, module.path);
            copyAssets(Path.join(scRootDir, scconfig.rootDir || scconfig.moduleDir || 'modules', module.path), moduleDir);
            await Fs.mkdir(moduleDir, { recursive: true });
            Fs.writeFile(Path.join(moduleDir, 'index.js'), pack.script || '');
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
        let deps = ['@ijstech/components'];
        let path = await getLocalPackagePath('@ijstech/components');
        if (path)
            await Fs.cp(Path.join(path, 'dist'), Path.join(distDir, 'libs/@ijstech/components'), {recursive: true});
        
        async function copyDependencies(dependencies: any, all?: boolean){
            dependencies = dependencies || {};
            for (let name in dependencies){
                if (name.startsWith('@ijstech/components/'))
                    name = '@ijstech/components';
                if (!deps[name] && (all || name.startsWith('@ijstech/') || name.startsWith('@scom/'))){
                    console.dir('#Copy dependence: ' + name);
                    let path = await getLocalPackagePath(name);
                    if (path){
                        deps.unshift(name)
                        let pack = JSON.parse(await Fs.readFile(Path.join(path, 'package.json'), 'utf8'));
                        let distFile: string = pack.plugin || pack.browser;
                        if (distFile && distFile.endsWith('.js')){
                            await Fs.mkdir(Path.join(distDir, 'libs', name), {recursive: true});
                            await Fs.copyFile(Path.join(path, distFile), Path.join(distDir, 'libs', name, 'index.js'))
                        }
                        else
                            await Fs.cp(Path.join(path, 'dist'), Path.join(distDir, 'libs', name), {recursive: true});
                        await copyDependencies(pack.dependencies);                    
                    }
                };
            };
        };
        scconfig.dependencies = scconfig.dependencies || {};
        if (scconfig.main && !scconfig.modules[scconfig.main] && !scconfig.dependencies[scconfig.main])
            scconfig.dependencies[scconfig.main] = '*';
        await copyDependencies(scconfig.dependencies, true); 
        scconfig.dependencies = {};
        deps.forEach((name)=>{
            if (name != '@ijstech/components' && !name.startsWith('@ijstech/components/'))
                scconfig.dependencies[name] = '*'
        });

        delete scconfig['distDir'];
        scconfig.moduleDir = 'modules';
        // scconfig.moduleDir = 'libs/' + packageConfig.name;//'modules';

        await Fs.writeFile(Path.join(distDir, 'scconfig.json'), JSON.stringify(scconfig, null, 4), 'utf8')

        //generate index.html
        let indexHtml = await Fs.readFile(Path.join(__dirname, 'index.template.html'), 'utf8');
        indexHtml = indexHtml.replace('{{main}}', `${scconfig.main || '@scom/dapp'}`);
        indexHtml = indexHtml.replace('{{scconfig}}', JSON.stringify(scconfig, null, 4));
        await Fs.writeFile(Path.join(scRootDir, scconfig.distDir || 'dist', 'index.html'), indexHtml);
        if (scconfig.ipfs == true){
            let cid = await hashDir(distDir);
            scconfig.ipfs = cid.cid;
            await Fs.writeFile(Path.join(distDir, 'scconfig.json'), JSON.stringify(scconfig, null, 4), 'utf8');
            await Fs.mkdir(Path.join(distDir, 'ipfs'), { recursive: true });
            await writeIpfs(Path.join(distDir, 'ipfs'), cid);
        };
    }
    else {        
        if (packageConfig){
            let packageManager = new PackageManager();
            // packageManager.addPackage('@ijstech/components', await getLocalPackageTypes('@ijstech/components'));            
            let pack:IPackage = { files: await getLocalScripts(Path.join(scRootDir, 'src'))};
            for (let n in pack.files){
                if (n == 'index.ts' || n == 'index.tsx')
                    pack.files[n] = `///<amd-module name='${packageConfig.name}'/> \n` + pack.files[n];
                else
                    pack.files[n] = `///<amd-module name='${packageConfig.name}/${n}'/> \n` + pack.files[n];
            };
                // if (pack.files['index.ts']){
                //     pack.files['index.ts'] = `///<amd-module name='${packageConfig.name}'/> \n` + pack.files['index.ts']
                // }
                // else if (pack.files['index.tsx'])
                //     pack.files['index.tsx'] = `///<amd-module name='${packageConfig.name}'/> \n` + pack.files['index.tsx']
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
            await Fs.mkdir(distDir, { recursive: true });
            await Fs.mkdir(typesDir, { recursive: true });
            copyAssets(Path.join(scRootDir, 'src'), distDir);            
            Fs.writeFile(Path.join(distDir, 'index.js'), pack.script || '');
            Fs.writeFile(Path.join(typesDir, 'index.d.ts'), pack.dts || '');
        };
    };
};
bundle();