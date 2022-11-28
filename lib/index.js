"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = exports.PackageManager = exports.resolveAbsolutePath = exports.getLocalPackagePath = exports.getLocalPackageTypes = void 0;
const lib_1 = __importDefault(require("./lib"));
const typescript_1 = __importDefault(require("typescript"));
let isNode = false;
if (typeof process === 'object') {
    if (typeof process.versions === 'object') {
        if (typeof process.versions.node !== 'undefined') {
            isNode = true;
        }
    }
}
;
;
;
;
let Path;
let Fs;
const PackageWhiteList = ['bignumber.js'];
async function getLocalPackageTypes(name) {
    let path = await getLocalPackagePath(name);
    if (path) {
        try {
            let pack = JSON.parse(await Fs.readFile(Path.join(path, 'package.json'), 'utf8'));
            let dts = await Fs.readFile(Path.join(path, pack.pluginTypes || pack.types || pack.typings || 'index.d.ts'), 'utf8');
            let dependencies = [];
            for (let n in pack.dependencies) {
                if (PackageWhiteList.indexOf(n) > -1 || n.startsWith('@scom/') || n.startsWith('@ijstech/'))
                    dependencies.push(n);
            }
            return {
                dts: dts,
                dependencies: dependencies
            };
        }
        catch (err) { }
    }
    return {};
}
exports.getLocalPackageTypes = getLocalPackageTypes;
;
async function getLocalPackagePath(name) {
    if (isNode) {
        try {
            if (!Path) {
                Path = require('path');
                Fs = require('fs').promises;
            }
            ;
            let path = '';
            if (name[0] != '/')
                path = Path.dirname(require.resolve(name + '/package.json'));
            else
                path = Path.dirname(name);
            if (path && path != '/') {
                try {
                    let stat = await Fs.stat(Path.join(path, 'package.json'));
                    if (stat.isFile())
                        return path;
                    else
                        return getLocalPackagePath(path);
                }
                catch (err) {
                    return getLocalPackagePath(path);
                }
                ;
            }
            ;
        }
        catch (err) {
            console.dir(err);
            return '';
        }
        ;
    }
    ;
    return '';
}
exports.getLocalPackagePath = getLocalPackagePath;
;
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
class PackageManager {
    constructor() {
        this._packages = {};
    }
    addPackage(name, pack) {
        if (!this._packages[name])
            this._packages[name] = pack;
    }
    ;
    async buildAll() {
        for (let name in this._packages) {
            let result = await this.buildPackage(name);
            if (result.errors && result.errors.length > 0)
                return false;
        }
        ;
        return true;
    }
    ;
    async buildPackage(name) {
        let pack = this._packages[name];
        if (!pack.dts && pack.files) {
            console.dir('#Build package: ' + name);
            let indexFile = '';
            if (pack.files['index.ts'])
                indexFile = 'index.ts';
            else if (pack.files['index.tsx'])
                indexFile = 'index.tsx';
            if (indexFile) {
                let compiler = new Compiler();
                for (let n in this._packages) {
                    if (this._packages[n].dts)
                        compiler.addPackage(n, this._packages[n]);
                }
                ;
                await compiler.addFile(indexFile, pack.files[indexFile], async (fileName, isPackage) => {
                    if (isPackage) {
                        if (this._packages[fileName]) {
                            if (!this._packages[fileName].dts) {
                                console.dir('Add dependence: ' + fileName);
                                let p = await this.buildPackage(fileName);
                                if (p.errors && p.errors.length > 0) {
                                    console.dir(p.errors);
                                    throw new Error('Failed to build package: ' + fileName);
                                }
                                ;
                            }
                            ;
                            compiler.addPackage(fileName, this._packages[fileName]);
                            return {
                                fileName: 'index.d.ts',
                                content: this._packages[fileName].dts || ''
                            };
                        }
                        let result = await compiler.addPackage(fileName);
                        if (result)
                            return result;
                        console.dir('Package not found: ' + fileName);
                        return null;
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
                            if (name)
                                return {
                                    fileName: name,
                                    content: pack.files[name]
                                };
                        }
                        return null;
                    }
                });
                let result = await compiler.compile(true);
                pack.dts = result.dts['index.d.ts'];
                pack.script = result.script['index.js'];
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
    constructor() {
        this.packages = {};
        this.dependencies = [];
        this.scriptOptions = {
            allowJs: false,
            alwaysStrict: true,
            declaration: true,
            experimentalDecorators: true,
            resolveJsonModule: false,
            skipLibCheck: true,
            noEmitOnError: true,
            module: typescript_1.default.ModuleKind.AMD,
            outFile: 'index.js',
            target: typescript_1.default.ScriptTarget.ES2017,
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
            target: typescript_1.default.ScriptTarget.ES2017
        };
        this.files = {};
        this.packageFiles = {};
    }
    ;
    async importDependencies(fileName, content, fileImporter, result) {
        let ast = typescript_1.default.createSourceFile(fileName, content, typescript_1.default.ScriptTarget.ES2017, true);
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
                                await this.importDependencies(filePath, file.content, fileImporter, result);
                            }
                        }
                    }
                    else {
                        if (this.dependencies.indexOf(module) < 0)
                            this.dependencies.push(module);
                        if (!this.packages[module]) {
                            let file = await fileImporter(module, true);
                            if (file) {
                                result.push(module);
                                let pack = {
                                    dts: file.content
                                };
                                this.addPackage(module, pack);
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
    async addPackage(packName, pack) {
        if (!pack) {
            if (!this.packages[packName]) {
                let pack = await getLocalPackageTypes(packName);
                if (pack.dts) {
                    if (pack.dependencies) {
                        for (let i = 0; i < pack.dependencies.length; i++)
                            await this.addPackage(pack.dependencies[i]);
                    }
                    ;
                    this.addPackage(packName, pack);
                    return {
                        fileName: 'index.d.ts',
                        content: pack.dts
                    };
                }
                ;
            }
            ;
        }
        else {
            this.packages[packName] = pack;
            if (pack.dts)
                this.packageFiles[packName] = pack.dts;
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
        const host = {
            getSourceFile: this.getSourceFile.bind(this),
            getDefaultLibFileName: () => "lib.d.ts",
            writeFile: (fileName, content) => {
                if (fileName.endsWith('d.ts'))
                    result.dts[fileName] = content;
                else {
                    result.script[fileName] = content.replace(new RegExp(/\global.\$JSX\(/, 'g'), 'this.$render(');
                }
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
        try {
            let program = typescript_1.default.createProgram(fileNames, this.scriptOptions, host);
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
        return result;
    }
    ;
    fileExists(fileName) {
        let result = this.files[fileName] != undefined || this.packageFiles[fileName] != undefined;
        if (!result && fileName.endsWith('/index.d.ts')) {
            let packName = fileName.split('/').slice(0, -1).join('/');
            result = this.packages[packName] != undefined;
        }
        ;
        if (!result && fileName.endsWith('.ts'))
            result = this.packages[fileName.slice(0, -3)] != undefined;
        if (!result)
            this.fileNotExists = fileName;
        else
            this.fileNotExists = '';
        return result;
    }
    ;
    async getDependencies(fileName, content, fileImporter, result) {
        let ast = typescript_1.default.createSourceFile(fileName, content, typescript_1.default.ScriptTarget.ES2017, true);
        result = result || [];
        for (let i = 0; i < ast.statements.length; i++) {
            let node = ast.statements[i];
            if (node.kind == typescript_1.default.SyntaxKind.ImportDeclaration) {
                let module = node.moduleSpecifier.text;
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
        if (!content && fileName.endsWith('/index.d.ts')) {
            let packName = fileName.split('/').slice(0, -1).join('/');
            if (this.packages[packName]) {
                content = this.packages[packName].dts || '';
            }
            else {
                for (let n in this.packages) {
                    if (packName.endsWith('/' + n)) {
                        content = this.packages[n].dts || '';
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
            console.dir('File not exists: ' + fileName);
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
                if (!moduleName.startsWith('./')) {
                    resolvedModules.push({
                        resolvedFileName: moduleName + '/index.d.ts',
                        extension: '.ts',
                        isExternalLibraryImport: true
                    });
                }
                else
                    resolvedModules.push(result.resolvedModule);
            }
            ;
        }
        ;
        return resolvedModules;
    }
    ;
}
exports.Compiler = Compiler;
;
