"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigProject = exports.Config = exports.buildTact = exports.compileTactContract = void 0;
const tact_compiler_1 = require("./lib/tact-compiler");
Object.defineProperty(exports, "Config", { enumerable: true, get: function () { return tact_compiler_1.Config; } });
Object.defineProperty(exports, "ConfigProject", { enumerable: true, get: function () { return tact_compiler_1.ConfigProject; } });
class OverwritableVirtualFileSystem {
    constructor(root = '/') {
        this.overwrites = new Map();
        this.files = new Map();
        this.root = this.normalizePath(root);
    }
    normalizePath(path) {
        return path.replace(/\\/g, '/').replace(/\/+$/, '');
    }
    resolvePath(...pathSegments) {
        const pathParts = this.root.split('/');
        for (const pathSegment of pathSegments) {
            const normalizedSegment = this.normalizePath(pathSegment);
            const parts = normalizedSegment.split('/');
            for (const part of parts) {
                if (part === '..') {
                    if (pathParts.length > 0) {
                        pathParts.pop();
                    }
                }
                else if (part !== '.' && part !== '') {
                    pathParts.push(part);
                }
            }
        }
        return pathParts.join('/');
    }
    resolve(...path) {
        return this.resolvePath(...path);
    }
    readFile(path) {
        const resolvedPath = this.resolvePath(path);
        return this.overwrites.get(resolvedPath) ?? this.files.get(resolvedPath) ?? Buffer.from('');
    }
    writeFile(path, content) {
        const resolvedPath = this.resolvePath(path);
        const bufferContent = typeof content === 'string' ? Buffer.from(content, 'utf-8') : content;
        this.overwrites.set(resolvedPath, bufferContent);
    }
    writeContractFile(path, content) {
        const resolvedPath = this.resolvePath(path);
        const bufferContent = typeof content === 'string' ? Buffer.from(content, 'utf-8') : content;
        this.files.set(resolvedPath, bufferContent);
    }
    exists(path) {
        const resolvedPath = this.resolvePath(path);
        return this.files.has(resolvedPath) || this.overwrites.has(resolvedPath);
        ;
    }
    cleanup() {
        for (let [key, value] of this.overwrites) {
            this.overwrites.delete(key);
        }
        this.overwrites = new Map();
        for (let [key, value] of this.files) {
            this.files.delete(key);
        }
        this.files = new Map();
    }
}
let fs;
function getFs() {
    if (!fs) {
        fs = new OverwritableVirtualFileSystem(`/`);
    }
    return fs;
}
async function buildTact(storage, projectConfig) {
    if (!projectConfig)
        throw new Error('Error while building');
    const filesToProcess = [projectConfig.path];
    const fs = getFs();
    while (filesToProcess.length !== 0) {
        const fileToProcess = filesToProcess.pop();
        const fileContent = await storage.readFile(fileToProcess);
        if (fileContent) {
            fs.writeContractFile(fileToProcess, fileContent);
        }
    }
    try {
        const response = await (0, tact_compiler_1.build)({
            config: projectConfig,
            project: fs,
            stdlib: '@stdlib',
            logger: null
        });
        if (!response.ok) {
            throw new Error('Error while building');
        }
        let output = {};
        for (let [key, value] of fs.overwrites) {
            if (key.startsWith('/'))
                key = key.substring(1);
            output[key] = value ? value.toString() : '';
        }
        return output;
    }
    catch (error) {
        return null;
    }
    finally {
        fs.cleanup();
    }
}
exports.buildTact = buildTact;
async function compileTactContract(storage, config) {
    try {
        let result = {};
        const { projects } = config;
        for (const project of projects) {
            const built = await buildTact(storage, project);
            if (built)
                result = { ...result, ...built };
        }
        return result;
    }
    catch (error) {
        console.error('Compilation failed:', error);
        return {};
    }
    finally {
        fs?.cleanup();
        fs = undefined;
    }
}
exports.compileTactContract = compileTactContract;
