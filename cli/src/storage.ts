import { promises as Fs} from 'fs';
import Path from 'path';
import IPFS from './ipfs.js';

export interface ICidInfo {
    cid: string;
    links?: ICidInfo[];
    name?: string;
    size: number;
    type?: 'dir' | 'file'
};
export interface IStorage{
    rootPath: string;
    cidToSri(cid: string): Promise<string>;
    copyAssets(sourceDir: string, targetDir: string): Promise<void>;
    copyPackage(packName: string, targetDir: string): Promise<any>;
    getSCConfig(): Promise<any>;
    getPackage(packName: string): Promise<any>;
    getPackageConfig(): Promise<any>;
    getPackageTypes(packName: string): Promise<IPackage>;
    getFiles(dir: string): Promise<{ [filePath: string]: string }>;
    hashContent(content: string): Promise<string>;
    hashDir(dir: string): Promise<ICidInfo>;
    isDirectory(dir: string): Promise<boolean>;
    isFile(filePath: string): Promise<boolean>;
    isFileExists(filePath: string): Promise<boolean>;
    readDir(dir: string): Promise<string[]>;
    readFile(fileName: string): Promise<string>;
    rename(oldPath: string, newPath: string): Promise<void>;
    writeFile(fileName: string, content: string): Promise<void>;
};

export interface ICompilerError {
    file: string;
    start: number;
    length: number;
    message: any;
    category: number;
    code: number;
};
export interface ICompilerResult {
    errors: ICompilerError[];
    script: {[file: string]: string};
    dts: {[file: string]: string};
};
export type IPackageFiles = {[filePath: string]: string};
export interface IPackage{
    files?:IPackageFiles;
    path?: string;
    errors?: ICompilerError[];
    script?: {[file: string]: string};
    dts?: {[file: string]: string};
    dependencies?: string[];
};
export async function copyAssets(sourceDir: string, targetDir: string){
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
let packages: { [name: string]: any } = {};
export async function getLocalPackage(name: string): Promise<any>{
    if (packages[name])
        return packages[name];
    let path = await getLocalPackagePath(name);
    if (path){
        let pack = JSON.parse(await Fs.readFile(Path.join(path, 'package.json'), 'utf8'));
        pack.path = path;
        packages[name] = pack;
        return pack;
    };
};
export async function getLocalPackageTypes(name: string, packName?: string): Promise<IPackage> {
    packName = packName || name;
    if (name[0] != '/')
        name = Path.dirname(require.resolve(name));
    let path = Path.dirname(name);
    if (path && path != '/') {
        try {
            let dependencies = [];
            let pack = JSON.parse(await Fs.readFile(Path.join(name, 'package.json'), 'utf8'));
            let distPath = 'dist';
            if (pack.main)
                distPath = Path.dirname(pack.main);
            try{
                let scconfig = JSON.parse(await Fs.readFile(Path.join(name, distPath, 'scconfig.json'), 'utf8'));
                dependencies = scconfig.dependencies || [];
            }
            catch(err){};
            if (dependencies.length == 0){        
                for (let name in pack.dependencies) {
                    dependencies.push(name);
                }
            };
            let typesIndex = Path.join(name, pack.pluginTypes || pack.types || pack.typings || 'index.d.ts');
            let typesDir = Path.dirname(typesIndex);
            let dts: {[file: string]: string} = {};
            dts['index.d.ts'] = await Fs.readFile(Path.join(name, pack.pluginTypes || pack.types || pack.typings || 'index.d.ts'), 'utf8');
            async function readDir(dir: string){
                let files = await Fs.readdir(dir);
                for (let file of files) {
                    let filepath = Path.join(dir, file);
                    let stat = await Fs.stat(filepath);
                    if (stat.isDirectory()) {
                        await readDir(filepath);
                    }
                    else {
                        if (file.endsWith('.d.ts')){
                            let packFileName = filepath.slice(typesDir.length + 1);
                            dts[packFileName] = await Fs.readFile(filepath, 'utf8');
                        };
                    };
                };
            };
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
export async function readSCConfig(path: string): Promise<any>{
    try{
        return JSON.parse(await Fs.readFile(Path.join(path, 'scconfig.json'), 'utf-8'));
    }
    catch(err){}
};
export async function writeSCConfig(path: string, config: any): Promise<any>{
    try{
        return await Fs.writeFile(Path.join(path, 'scconfig.json'), JSON.stringify(config, null, 4), 'utf-8');
    }
    catch(err){} 
};
export async function readPackageConfig(path: string): Promise<any>{
    try{
        return JSON.parse(await Fs.readFile(Path.join(path, 'package.json'), 'utf-8'));
    }
    catch(err){}
};
export async function writePackageConfig(path: string, config: any): Promise<any>{
    try{
        return await Fs.writeFile(Path.join(path, 'package.json'), JSON.stringify(config, null, 4), 'utf-8');
    }
    catch(err){}
};
export class Storage implements IStorage{
    public rootPath: string;
    copied: {[packName: string]: boolean} = {};
    constructor(rootPath: string){
        this.rootPath = rootPath;
    };
    async cidToSri(value: string): Promise<string>{
        return IPFS.cidToSri(value)
    };
    async copyAssets(sourceDir: string, targetDir: string): Promise<void>{
        copyAssets(sourceDir, targetDir);
    };
    async copyPackage(packName: string, targetDir: string): Promise<any>{
        let pack = await getLocalPackage(packName);
        if (pack && !this.copied[packName]){
            let path = pack.path;
            this.copied[packName] = true;
            console.dir('#Copy dependence: ' + packName);
            let distFile: string = pack.plugin || pack.browser;
            let targetPackDir = targetDir;
            if (!targetPackDir.endsWith(packName))
                targetPackDir = Path.join(targetDir, packName);
            if (distFile && distFile.endsWith('.js')){
                await Fs.mkdir(targetPackDir, {recursive: true});
                await Fs.copyFile(Path.join(path, distFile), Path.join(targetPackDir, 'index.js'));                                
            }
            else{
                await Fs.cp(Path.join(path, 'dist'), targetPackDir, {recursive: true});
                try{
                    let scconfig = JSON.parse(await Fs.readFile(Path.join(path, 'dist', 'scconfig.json'), 'utf8'));
                    if (scconfig?.dependencies){
                        pack.dependencies = {};
                        scconfig.dependencies.forEach((name: string) => {
                            pack.dependencies[name] = '*';
                            if (targetDir != targetPackDir){
                                this.copyPackage(name, Path.join(targetDir, name));
                            };
                        });
                        
                    };
                }
                catch(err){}
            }
        };
        return pack;
    };
    getSCConfig(): Promise<any>{
        return readSCConfig(this.rootPath);
    };
    getPackage(packName: string): Promise<any>{
        return getLocalPackage(packName);
    };
    getPackageConfig(): Promise<any>{
        return readPackageConfig(this.rootPath);
    };
    getPackageTypes(packName: string): Promise<IPackage>{
        return getLocalPackageTypes(packName);
    };
    getFiles(dir: string): Promise<{ [filePath: string]: string }>{
        return getLocalScripts(dir);
    };
    async hashContent(content: string): Promise<string> {
        return IPFS.hashContent(content, 1);
    };
    async hashDir(dir: string): Promise<ICidInfo> {
        let files = await Fs.readdir(dir);
        let items:ICidInfo[] = [];
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let path = Path.join(dir, file);
            let stat = await Fs.stat(path)
            if (stat.isDirectory()) {
                let result = await this.hashDir(path);
                result.name = file;
                items.push(result);
            }
            else {
                try{
                    let result = await IPFS.hashFile(path, 1);
                    items.push({
                        cid: result.cid,
                        name: file,
                        size: result.size,
                        type: 'file'
                    })
                }
                catch(err){
                    console.dir(path)
                    console.dir(err)
                }
            }
        };
        let result = await IPFS.hashItems(items, 1);
        return {
            cid: result.cid,
            name: '',
            size: result.size,
            type: 'dir',
            links: items
        };
    };
    async isDirectory(dir: string): Promise<boolean>{
        try{
            return (await Fs.stat(dir)).isDirectory();
        }
        catch(err){
            return false;
        };
    };
    async isFile(filePath: string): Promise<boolean>{
        try{
            return (await Fs.stat(filePath)).isFile();
        }
        catch(err){
            return false;
        };
    };
    async isFileExists(filePath: string): Promise<boolean>{
        try{
            await Fs.stat(filePath);
            return true;
        }
        catch(err){
            return false;
        };
    };
    async readDir(dir: string): Promise<string[]>{
        if (dir[0] != '/')
            dir = Path.join(this.rootPath, dir);
        return Fs.readdir(dir);
    };
    async readFile(fileName: string): Promise<string>{
        if (fileName[0] == '@')
            fileName = Path.join(this.rootPath, 'node_modules', fileName);
        else if (fileName[0] != '/')
            fileName = Path.join(this.rootPath, fileName);
        return Fs.readFile(fileName, 'utf8');
    };
    async rename(oldPath: string, newPath: string): Promise<void>{
        await Fs.rename(oldPath, newPath);
    };
    async updateSCConfig(config: any){
        await writeSCConfig(this.rootPath, config);
    };
    async updatePackageConfig(config: any){
        await writePackageConfig(this.rootPath, config);
    };
    async writeFile(fileName: string, content: string): Promise<void>{
        if (fileName[0] != '/')
            fileName = Path.join(this.rootPath, fileName);
        let dir = Path.dirname(fileName);
        await Fs.mkdir(dir, { recursive: true });
        await Fs.writeFile(fileName, content, 'utf8');
    }
};