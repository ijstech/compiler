import 'mocha'
import * as assert from 'assert'
import {Types, bundleDapp, bundleContract, EPackageType} from '../src';
import Path from 'path';
import { promises as Fs} from 'fs';
import {copyAssets, getLocalPackage, readSCConfig, readPackageConfig, getLocalPackageTypes, getLocalScripts} from '../cli/src/storage';
import {Solc} from '../cli/src/solc';

let bundleResult: {[fileName: string]: string} = {};
class Storage implements Types.IStorage{
    public rootPath: string;
    copied: {[packName: string]: boolean} = {};
    constructor(rootPath: string){
        this.rootPath = rootPath;
    };
    async copyAssets(sourceDir: string, targetDir: string): Promise<void>{
        // copyAssets(sourceDir, targetDir);
    };
    async copyPackage(packName: string, targetDir: string): Promise<any>{
        let pack = await getLocalPackage(packName);
        if (pack && !this.copied[packName]){
            this.copied[packName] = true;
            // let path = pack.path;
            // console.dir('#Copy dependence: ' + packName);
            // let distFile: string = pack.plugin || pack.browser;
            // if (distFile && distFile.endsWith('.js')){
            //     await Fs.mkdir(targetDir, {recursive: true});
            //     await Fs.copyFile(Path.join(path, distFile), Path.join(targetDir, 'index.js'));                                
            // }
            // else
            //     await Fs.cp(Path.join(path, 'dist'), targetDir, {recursive: true});
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
    getPackageTypes(packName: string): Promise<Types.IPackage>{
        return getLocalPackageTypes(packName);
    };
    getFiles(dir: string): Promise<{ [filePath: string]: string }>{
        return getLocalScripts(dir);
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
    readDir(dir: string): Promise<string[]>{
        return Fs.readdir(dir);
    };
    readFile(fileName: string): Promise<string>{
        if (fileName[0] == '@')
            fileName = Path.join(this.rootPath, 'node_modules', fileName);
        else if (fileName[0] != '/')
            fileName = Path.join(this.rootPath, fileName);
        return Fs.readFile(fileName, 'utf8');
    };
    async writeFile(fileName: string, content: string): Promise<void>{
        console.dir('#Write file: ' + fileName)
        let f = fileName.replace(this.rootPath, '');
        bundleResult[f] = content;
    };
};
describe('Bundle', async function () {
    this.timeout(60000)
    it('Contract', async()=>{
        bundleResult = {};
        let rootDir = Path.join(__dirname, 'contract');
        let storage = new Storage(rootDir);
        await bundleContract(new Solc(), storage, rootDir);    
        assert.equal(typeof(bundleResult['/dist/index.js']), 'string');
        for (let fileName in bundleResult){
            let content = bundleResult[fileName];
            let targetFile = Path.join(rootDir, fileName);
            let targetContent = await Fs.readFile(targetFile, 'utf8');
            assert.equal(content, targetContent, fileName + ' is not equal');
        }
    });
    it('dApp', async()=>{
        bundleResult = {};
        let rootDir = Path.join(__dirname, 'dapp');
        let storage = new Storage(rootDir);
        await bundleDapp(storage, rootDir);    
        assert.equal(typeof(bundleResult['/dist/modules/main/index.js']), 'string');
        for (let fileName in bundleResult){
            let content = bundleResult[fileName];
            let targetFile = Path.join(rootDir, fileName);
            let targetContent = await Fs.readFile(targetFile, 'utf8');
            assert.equal(content, targetContent, fileName + ' is not equal');
        }
    });
})