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
}
async function buildTact(storage, projectConfig) {
    if (!projectConfig)
        throw new Error('Error while building');
    try {
        const filesToProcess = [projectConfig.path];
        const fs = new OverwritableVirtualFileSystem(`/`);
        while (filesToProcess.length !== 0) {
            const fileToProcess = filesToProcess.pop();
            const fileContent = await storage.readFile(fileToProcess);
            if (fileContent) {
                fs.writeContractFile(fileToProcess, fileContent);
            }
        }
        const response = await (0, tact_compiler_1.build)({
            config: projectConfig,
            project: fs,
            stdlib: '@stdlib',
        });
        if (!response.ok) {
            throw new Error('Error while building');
        }
        return fs.overwrites;
    }
    catch (error) {
        return null;
    }
}
exports.buildTact = buildTact;
async function compileTactContract(storage, config) {
    try {
        let result = new Map();
        const { projects } = config;
        for (let project of projects) {
            const built = await buildTact(storage, project);
            if (built) {
                for (let [key, value] of built) {
                    result.set(key, value);
                }
            }
        }
        return result;
    }
    catch (error) {
        console.error('Compilation failed:', error);
    }
}
exports.compileTactContract = compileTactContract;
