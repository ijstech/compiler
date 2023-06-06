#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashDir = exports.hashFile = exports.hashItems = void 0;
const path_1 = __importDefault(require("path"));
const compiler_1 = require("@ijstech/compiler");
const fs_1 = require("fs");
const storage_1 = require("./storage");
const solc_1 = require("./solc");
const ipfs_js_1 = __importDefault(require("./ipfs.js"));
const RootPath = process.cwd();
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
    let file = (0, fs_1.createReadStream)(filePath);
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
async function main() {
    let storage = new storage_1.Storage(RootPath);
    let scconfig = await storage.getSCConfig();
    if (scconfig?.type) {
        switch (scconfig?.type) {
            case 'dapp':
                await (0, compiler_1.bundleDapp)(storage);
                break;
            case 'contract':
                await (0, compiler_1.bundleContract)(new solc_1.Solc(), storage);
                break;
            case 'widget':
                await (0, compiler_1.bundleWidget)(storage);
                break;
            default:
                await (0, compiler_1.bundleDapp)(storage);
                break;
        }
    }
    else {
        await (0, compiler_1.bundleWidget)(storage);
    }
    ;
}
;
main();
