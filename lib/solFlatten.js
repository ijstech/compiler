"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = void 0;
const path_1 = __importDefault(require("./path"));
async function flatten(sources, file) {
    let license = '';
    let result = '';
    let processedFiles = [];
    async function flattenDependencies(sources, file) {
        let source = sources[file];
        let result = '';
        if (source) {
            let importRegex = /^\s*import\s+(?:"([^"]+)"|'([^']+)')./gm;
            let licenseRegex = /\/\/\s+SPDX-License-Identifier:.*/gm;
            let importMatch;
            processedFiles.push(file);
            while ((importMatch = importRegex.exec(source.content))) {
                const importPath = importMatch[1] || importMatch[2];
                let importFilePath;
                if (importPath.startsWith('.')) {
                    importFilePath = path_1.default.resolve(path_1.default.dirname(file), importPath);
                }
                else {
                    importFilePath = importPath;
                }
                ;
                if (!processedFiles.includes(importFilePath)) {
                    processedFiles.push(importFilePath);
                    result += await flattenDependencies(sources, importFilePath);
                }
                ;
            }
            ;
            result += source.content.replace(licenseRegex, '');
            ;
        }
        ;
        return result;
    }
    ;
    let source = sources[file];
    if (source) {
        let licenseRegex = /\/\/\s+SPDX-License-Identifier:.*/gm;
        let importRegex = /^\s*import\s+(?:"([^"]+)"|'([^']+)')./gm;
        const licenseMatch = licenseRegex.exec(source.content);
        if (licenseMatch)
            license = licenseMatch[0];
        result = license + '\n' + await flattenDependencies(sources, file);
        result = result.replace(importRegex, '');
    }
    ;
    return result;
}
exports.flatten = flatten;
;
