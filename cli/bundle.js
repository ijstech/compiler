#!/usr/bin/env node
const Path = require('path');
const { PackageManager } = require('@ijstech/compiler');
const { promises:Fs } = require('fs');
const RootPath = process.cwd();
const SourcePath = process.argv[2];

async function copyAssets(sourceDir, targetDir){
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
async function getLocalPackagePath(name){
    if (name[0] != '/')
        name = Path.dirname(require.resolve(name))
    let path = Path.dirname(name);
    if (path) {
        try {
            let stat = await Fs.stat(Path.join(path, 'package.json'))
            if (stat.isFile())
                return path
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
async function getLocalPackageTypes(name){
    if (name[0] != '/')
        name = Path.dirname(require.resolve(name));
    let path = Path.dirname(name);
    if (path) {
        try {
            let pack = JSON.parse(await Fs.readFile(Path.join(path, 'package.json'), 'utf8'))
            let dts = await Fs.readFile(Path.join(path, pack.pluginTypes || pack.types || 'index.d.ts'), 'utf8');
            return {
                dts: dts
            };
        }
        catch (err) {
            return getLocalPackageTypes(path);
        }
    }
    else
        return {}
};
async function getLocalScripts(path){
    let result = {};
    let files = await Fs.readdir(path, { withFileTypes: true });
    for (let file of files) {
        if (file.isDirectory()) {
            let r = await getLocalScripts(Path.join(path, file.name));
            for (let name in r) {
                result[file.name + '/' + name] = r[name];
            }
        }
        else {
            if (file.name.endsWith('.ts') || file.name.endsWith('.tsx'))
                result[file.name] = await Fs.readFile(Path.join(path, file.name), 'utf8')
        }
    };
    return result;
};
async function bundle() {
    let scRootDir = RootPath;
    if (SourcePath)
        scRootDir = Path.relative(scRootDir, SourcePath);
    let scconfig = JSON.parse(JSON.stringify(JSON.parse(await Fs.readFile(Path.join(scRootDir, 'scconfig.json'), 'utf-8'))));
    let moduleDir = scRootDir;
    if (scconfig.moduleDir)
        moduleDir = Path.join(scRootDir, scconfig.moduleDir);

    let packages = {};
    for (let name in scconfig.modules) {
        packages[name] = Path.join(moduleDir, scconfig.modules[name].path);
    }
    let packageManager = new PackageManager();
    packageManager.addPackage('@ijstech/components', await getLocalPackageTypes('@ijstech/components'))
    for (let name in packages){
        let pack = { files: await getLocalScripts(packages[name]) };
        if (pack.files['index.ts']){
            pack.files['index.ts'] = `///<amd-module name='${name}'/> \n` + pack.files['index.ts']
        }
        else if (pack.files['index.tsx'])
            pack.files['index.tsx'] = `///<amd-module name='${name}'/> \n` + pack.files['index.tsx']
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
    let mainPath = Path.join(scconfig.rootDir || 'modules', scconfig.modules[scconfig.main].path, 'index.js');
    for (let name in scconfig.modules) {
        let pack = packageManager.packages(name);
        let module = scconfig.modules[name];
        module.dependencies = [];
        pack.dependencies?.forEach((item) => {
            if (item != '@ijstech/components'){
                module.dependencies.push(item);
                if (!scconfig.modules[item] && !scconfig.dependencies[item])
                    scconfig.dependencies[item] = '*';
            };
        });
        let moduleDir = Path.join(distModuleDir, module.path);
        copyAssets(Path.join(scRootDir, scconfig.rootDir || 'modules', module.path), moduleDir);
        await Fs.mkdir(moduleDir, { recursive: true });
        Fs.writeFile(Path.join(moduleDir, 'index.js'), pack.script || '');
    };
    delete scconfig['distDir'];
    scconfig.moduleDir = 'modules';
    await Fs.writeFile(Path.join(distModuleDir, 'scconfig.json'), JSON.stringify(scconfig, null, 4), 'utf8')

    //generate index.html
    let indexHtml = await Fs.readFile(Path.join(__dirname, 'index.template.html'), 'utf8');
    indexHtml = indexHtml.replace('{{main}}', `"${scconfig.main}"`);
    indexHtml = indexHtml.replace('{{scconfig}}', JSON.stringify(scconfig, null, 4));
    await Fs.writeFile(Path.join(scRootDir, scconfig.distDir || 'dist', 'index.html'), indexHtml);

    //copy @ijstech/components
    let path = await getLocalPackagePath('@ijstech/components');
    if (path)
        await Fs.cp(Path.join(path, 'dist'), distDir, {recursive: true});
};
bundle();