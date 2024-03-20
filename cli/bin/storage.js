"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = exports.writePackageConfig = exports.readPackageConfig = exports.writeSCConfig = exports.readSCConfig = exports.getLocalScripts = exports.getLocalPackageTypes = exports.getLocalPackage = exports.getLocalPackagePath = exports.copyAssets = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const ipfs_js_1 = __importDefault(require("./ipfs.js"));
;
;
;
;
;
async function copyAssets(sourceDir, targetDir) {
    let files = await fs_1.promises.readdir(sourceDir, { withFileTypes: true });
    for (let file of files) {
        if (file.isDirectory()) {
            copyAssets(path_1.default.join(sourceDir, file.name), path_1.default.join(targetDir, file.name));
        }
        else {
            if (!file.name.endsWith('.ts') && !file.name.endsWith('.tsx')) {
                await fs_1.promises.mkdir(targetDir, { recursive: true });
                fs_1.promises.copyFile(path_1.default.join(sourceDir, file.name), path_1.default.join(targetDir, file.name));
            }
            ;
        }
        ;
    }
    ;
}
exports.copyAssets = copyAssets;
;
async function getLocalPackagePath(name) {
    if (name[0] != '/')
        name = path_1.default.dirname(require.resolve(name));
    let path = path_1.default.dirname(name);
    if (path && path != '/') {
        try {
            let stat = await fs_1.promises.stat(path_1.default.join(name, 'package.json'));
            if (stat.isFile())
                return name;
            else
                return getLocalPackagePath(path);
        }
        catch (err) {
            return getLocalPackagePath(path);
        }
        ;
    }
    else
        return '';
}
exports.getLocalPackagePath = getLocalPackagePath;
;
let packages = {};
async function getLocalPackage(name) {
    if (packages[name])
        return packages[name];
    let path = await getLocalPackagePath(name);
    if (path) {
        let pack = JSON.parse(await fs_1.promises.readFile(path_1.default.join(path, 'package.json'), 'utf8'));
        pack.path = path;
        packages[name] = pack;
        return pack;
    }
    ;
}
exports.getLocalPackage = getLocalPackage;
;
async function getLocalPackageTypes(name, packName) {
    packName = packName || name;
    if (name[0] != '/')
        name = path_1.default.dirname(require.resolve(name));
    let path = path_1.default.dirname(name);
    if (path && path != '/') {
        try {
            let dependencies = [];
            let pack = JSON.parse(await fs_1.promises.readFile(path_1.default.join(name, 'package.json'), 'utf8'));
            let distPath = 'dist';
            if (pack.main)
                distPath = path_1.default.dirname(pack.main);
            try {
                let scconfig = JSON.parse(await fs_1.promises.readFile(path_1.default.join(name, distPath, 'scconfig.json'), 'utf8'));
                dependencies = scconfig.dependencies || [];
            }
            catch (err) { }
            ;
            if (dependencies.length == 0) {
                for (let name in pack.dependencies) {
                    dependencies.push(name);
                }
            }
            ;
            let typesIndex = path_1.default.join(name, pack.pluginTypes || pack.types || pack.typings || 'index.d.ts');
            let typesDir = path_1.default.dirname(typesIndex);
            let dts = {};
            dts['index.d.ts'] = await fs_1.promises.readFile(path_1.default.join(name, pack.pluginTypes || pack.types || pack.typings || 'index.d.ts'), 'utf8');
            async function readDir(dir) {
                let files = await fs_1.promises.readdir(dir);
                for (let file of files) {
                    let filepath = path_1.default.join(dir, file);
                    let stat = await fs_1.promises.stat(filepath);
                    if (stat.isDirectory()) {
                        await readDir(filepath);
                    }
                    else {
                        if (file.endsWith('.d.ts')) {
                            let packFileName = filepath.slice(typesDir.length + 1);
                            dts[packFileName] = await fs_1.promises.readFile(filepath, 'utf8');
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            ;
            await readDir(typesDir);
            return {
                dts: dts,
                dependencies: dependencies
            };
        }
        catch (err) {
            return getLocalPackageTypes(path, packName);
        }
    }
    else {
        throw new Error('Failed to get package: ' + packName);
    }
}
exports.getLocalPackageTypes = getLocalPackageTypes;
;
async function getLocalScripts(path) {
    let result = {};
    let files = await fs_1.promises.readdir(path, { withFileTypes: true });
    for (let file of files) {
        if (file.isDirectory()) {
            let r = await getLocalScripts(path_1.default.join(path, file.name));
            for (let name in r) {
                result[file.name + '/' + name] = r[name];
            }
        }
        else {
            if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
                result[file.name] = await fs_1.promises.readFile(path_1.default.join(path, file.name), 'utf8');
            }
        }
    }
    ;
    return result;
}
exports.getLocalScripts = getLocalScripts;
;
async function readSCConfig(path) {
    try {
        return JSON.parse(await fs_1.promises.readFile(path_1.default.join(path, 'scconfig.json'), 'utf-8'));
    }
    catch (err) { }
}
exports.readSCConfig = readSCConfig;
;
async function writeSCConfig(path, config) {
    try {
        return await fs_1.promises.writeFile(path_1.default.join(path, 'scconfig.json'), JSON.stringify(config, null, 4), 'utf-8');
    }
    catch (err) { }
}
exports.writeSCConfig = writeSCConfig;
;
async function readPackageConfig(path) {
    try {
        return JSON.parse(await fs_1.promises.readFile(path_1.default.join(path, 'package.json'), 'utf-8'));
    }
    catch (err) { }
}
exports.readPackageConfig = readPackageConfig;
;
async function writePackageConfig(path, config) {
    try {
        return await fs_1.promises.writeFile(path_1.default.join(path, 'package.json'), JSON.stringify(config, null, 4), 'utf-8');
    }
    catch (err) { }
}
exports.writePackageConfig = writePackageConfig;
;
class Storage {
    constructor(rootPath) {
        this.copied = {};
        this.rootPath = rootPath;
    }
    ;
    async cidToSri(value) {
        return ipfs_js_1.default.cidToSri(value);
    }
    ;
    async copyAssets(sourceDir, targetDir) {
        copyAssets(sourceDir, targetDir);
    }
    ;
    async copyPackage(packName, targetDir) {
        let pack = await getLocalPackage(packName);
        if (pack && !this.copied[packName]) {
            let path = pack.path;
            this.copied[packName] = true;
            console.dir('#Copy dependence: ' + packName);
            let distFile = pack.plugin || pack.browser;
            let targetPackDir = targetDir;
            if (!targetPackDir.endsWith(packName))
                targetPackDir = path_1.default.join(targetDir, packName);
            if (distFile && distFile.endsWith('.js')) {
                await fs_1.promises.mkdir(targetPackDir, { recursive: true });
                await fs_1.promises.copyFile(path_1.default.join(path, distFile), path_1.default.join(targetPackDir, 'index.js'));
            }
            else {
                await fs_1.promises.cp(path_1.default.join(path, 'dist'), targetPackDir, { recursive: true });
                try {
                    let scconfig = JSON.parse(await fs_1.promises.readFile(path_1.default.join(path, 'dist', 'scconfig.json'), 'utf8'));
                    if (scconfig?.dependencies) {
                        pack.dependencies = {};
                        scconfig.dependencies.forEach((name) => {
                            pack.dependencies[name] = '*';
                            if (targetDir != targetPackDir) {
                                this.copyPackage(name, path_1.default.join(targetDir, name));
                            }
                            ;
                        });
                    }
                    ;
                }
                catch (err) { }
            }
        }
        ;
        return pack;
    }
    ;
    getSCConfig() {
        return readSCConfig(this.rootPath);
    }
    ;
    getPackage(packName) {
        return getLocalPackage(packName);
    }
    ;
    getPackageConfig() {
        return readPackageConfig(this.rootPath);
    }
    ;
    getPackageTypes(packName) {
        return getLocalPackageTypes(packName);
    }
    ;
    getFiles(dir) {
        return getLocalScripts(dir);
    }
    ;
    async hashContent(content) {
        return ipfs_js_1.default.hashContent(content, 1);
    }
    ;
    async hashDir(dir) {
        let files = await fs_1.promises.readdir(dir);
        let items = [];
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let path = path_1.default.join(dir, file);
            let stat = await fs_1.promises.stat(path);
            if (stat.isDirectory()) {
                let result = await this.hashDir(path);
                result.name = file;
                items.push(result);
            }
            else {
                try {
                    let result = await ipfs_js_1.default.hashFile(path, 1);
                    items.push({
                        cid: result.cid,
                        name: file,
                        size: result.size,
                        type: 'file'
                    });
                }
                catch (err) {
                    console.dir(path);
                    console.dir(err);
                }
            }
        }
        ;
        let result = await ipfs_js_1.default.hashItems(items, 1);
        return {
            cid: result.cid,
            name: '',
            size: result.size,
            type: 'dir',
            links: items
        };
    }
    ;
    async isDirectory(dir) {
        try {
            return (await fs_1.promises.stat(dir)).isDirectory();
        }
        catch (err) {
            return false;
        }
        ;
    }
    ;
    async isFile(filePath) {
        try {
            return (await fs_1.promises.stat(filePath)).isFile();
        }
        catch (err) {
            return false;
        }
        ;
    }
    ;
    async isFileExists(filePath) {
        try {
            await fs_1.promises.stat(filePath);
            return true;
        }
        catch (err) {
            return false;
        }
        ;
    }
    ;
    async readDir(dir) {
        if (dir[0] != '/')
            dir = path_1.default.join(this.rootPath, dir);
        return fs_1.promises.readdir(dir);
    }
    ;
    async readFile(fileName) {
        if (fileName[0] == '@')
            fileName = path_1.default.join(this.rootPath, 'node_modules', fileName);
        else if (fileName[0] != '/')
            fileName = path_1.default.join(this.rootPath, fileName);
        return fs_1.promises.readFile(fileName, 'utf8');
    }
    ;
    async rename(oldPath, newPath) {
        await fs_1.promises.rename(oldPath, newPath);
    }
    ;
    async updateSCConfig(config) {
        await writeSCConfig(this.rootPath, config);
    }
    ;
    async updatePackageConfig(config) {
        await writePackageConfig(this.rootPath, config);
    }
    ;
    async writeFile(fileName, content) {
        if (fileName[0] != '/')
            fileName = path_1.default.join(this.rootPath, fileName);
        let dir = path_1.default.dirname(fileName);
        await fs_1.promises.mkdir(dir, { recursive: true });
        await fs_1.promises.writeFile(fileName, content, 'utf8');
    }
}
exports.Storage = Storage;
;
