#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalScripts = exports.getLocalPackageTypes = exports.getLocalPackage = exports.getLocalPackagePath = exports.hashDir = exports.hashFile = exports.hashItems = void 0;
const path_1 = __importDefault(require("path"));
const compiler_1 = require("@ijstech/compiler");
const fs_1 = require("fs");
const ipfs_js_1 = __importDefault(require("./ipfs.js"));
const RootPath = process.cwd();
const SourcePath = process.argv[2];
async function hashItems(items, version) {
    return await ipfs_js_1.default.hashItems(items || [], version);
}
exports.hashItems = hashItems;
;
async function hashFile(filePath, version, options) {
    if (version == undefined)
        version = 1;
    let size;
    let stat = await fs_1.promises.stat(filePath);
    size = stat.size;
    let file = fs_1.createReadStream(filePath);
    let cid;
    let result;
    if (size == 0) {
        cid = await ipfs_js_1.default.hashContent('', version);
        return {
            cid,
            size
        };
    }
    else if (version == 1) {
        result = await ipfs_js_1.default.hashFile(file, version, ipfs_js_1.default.mergeOptions({
            rawLeaves: true,
            maxChunkSize: 1048576,
            maxChildrenPerNode: 1024
        }, options || {}));
    }
    else
        result = await ipfs_js_1.default.hashFile(file, version);
    return result;
}
exports.hashFile = hashFile;
async function hashDir(dirPath, version, excludes) {
    if (version == undefined)
        version = 1;
    let files = await fs_1.promises.readdir(dirPath);
    let items = [];
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let path = path_1.default.join(dirPath, file);
        if (!excludes || excludes.indexOf(path) < 0) {
            let stat = await fs_1.promises.stat(path);
            if (stat.isDirectory()) {
                let result = await hashDir(path, version, excludes);
                result.name = file;
                items.push(result);
            }
            else {
                try {
                    let result = await hashFile(path, version);
                    items.push({
                        cid: result.cid,
                        name: file,
                        size: result.size,
                        type: 'file'
                    });
                }
                catch (err) {
                    console.dir(path);
                }
            }
        }
    }
    ;
    let result = await hashItems(items, version);
    return {
        cid: result.cid,
        name: '',
        size: result.size,
        type: 'dir',
        links: items
    };
}
exports.hashDir = hashDir;
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
            let pack = JSON.parse(await fs_1.promises.readFile(path_1.default.join(name, 'package.json'), 'utf8'));
            let dts = await fs_1.promises.readFile(path_1.default.join(name, pack.pluginTypes || pack.types || pack.typings || 'index.d.ts'), 'utf8');
            return {
                dts: dts
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
        return JSON.parse(JSON.stringify(JSON.parse(await fs_1.promises.readFile(path_1.default.join(path, 'scconfig.json'), 'utf-8'))));
    }
    catch (err) { }
}
;
async function readPackageConfig(path) {
    try {
        return JSON.parse(JSON.stringify(JSON.parse(await fs_1.promises.readFile(path_1.default.join(path, 'package.json'), 'utf-8'))));
    }
    catch (err) { }
}
;
async function writeIpfs(distDir, cid) {
    let links = [];
    if (cid.links) {
        for (let i = 0; i < cid.links.length; i++) {
            let item = cid.links[i];
            links.push({
                cid: item.cid,
                name: item.name,
                size: item.size,
                type: item.type
            });
            if (item.type == 'dir')
                await writeIpfs(distDir, item);
        }
        ;
        let item = {
            cid: cid.cid,
            name: cid.name,
            size: cid.size,
            type: cid.type,
            links: links
        };
        await fs_1.promises.writeFile(path_1.default.join(distDir, `${cid.cid}`), JSON.stringify(item), 'utf8');
    }
}
;
;
class Storage {
    constructor() {
        this.copied = {};
    }
    async copyAssets(sourceDir, targetDir) {
        copyAssets(sourceDir, targetDir);
    }
    ;
    async copyPackage(packName, targetDir) {
        let pack = await getLocalPackage(packName);
        if (pack && !this.copied[packName]) {
            let path = pack.path;
            console.dir('#Copy dependence: ' + packName);
            let distFile = pack.plugin || pack.browser;
            if (distFile && distFile.endsWith('.js')) {
                await fs_1.promises.mkdir(targetDir, { recursive: true });
                await fs_1.promises.copyFile(path_1.default.join(path, distFile), path_1.default.join(targetDir, 'index.js'));
            }
            else
                await fs_1.promises.cp(path_1.default.join(path, 'dist'), targetDir, { recursive: true });
        }
        ;
        return pack;
    }
    ;
    getSCConfig() {
        let scRootDir = RootPath;
        if (SourcePath)
            scRootDir = path_1.default.relative(scRootDir, SourcePath);
        return readSCConfig(scRootDir);
    }
    ;
    getPackage(packName) {
        return getLocalPackage(packName);
    }
    ;
    getPackageConfig() {
        let scRootDir = RootPath;
        if (SourcePath)
            scRootDir = path_1.default.relative(scRootDir, SourcePath);
        return readPackageConfig(scRootDir);
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
    async mkdir(dir) {
        await fs_1.promises.mkdir(dir, { recursive: true });
    }
    ;
    readFile(fileName) {
        return fs_1.promises.readFile(fileName, 'utf8');
    }
    ;
    async writeFile(fileName, content) {
        await fs_1.promises.writeFile(fileName, content, 'utf8');
    }
}
async function main() {
    let storage = new Storage();
    compiler_1.bundle(storage, RootPath, SourcePath);
}
;
main();
