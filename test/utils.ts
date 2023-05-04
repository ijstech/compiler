import {promises as Fs} from 'fs'
import Path from 'path'
import * as fs from 'fs';

export async function getFileContent(fileName: string): Promise<string> {
    let filePath = Path.resolve(__dirname, fileName)
    try {
        return Fs.readFile(filePath, 'utf8')
    } catch (err) {
        return ''
    }
}

export async function checkFileExists(path: string): Promise<boolean> {
    try {
        await Fs.stat(path)
        return true
    } catch (err) {
        return false
    }
}

export async function getScript(
    fileName: string
): Promise<{ fileName: string; content: string }> {
    if (fileName == '@ijstech/components') {
        return {
            fileName: 'index.d.ts',
            content: await getFileContent('../node_modules/@ijstech/components/types/index.d.ts'),
        }
    }
    let filePath = Path.join(__dirname, 'scripts', fileName)
    try {
        if (await checkFileExists(filePath))
            return {
                fileName: fileName,
                content: await Fs.readFile(filePath, 'utf8'),
            }
        else if (await checkFileExists(filePath + '.ts'))
            return {
                fileName: fileName + '.ts',
                content: await Fs.readFile(filePath + '.ts', 'utf8'),
            }
        else if (await checkFileExists(filePath + '.tsx'))
            return {
                fileName: fileName + '.tsx',
                content: await Fs.readFile(filePath + '.tsx', 'utf8'),
            }
        else
            return {
                fileName,
                content: '',
            }
    } catch (err) {
        return {
            fileName,
            content: '',
        }
    }
}

export async function fileImporter(
    fileName: string
): Promise<{ fileName: string; content: string }> {    
    if (fileName == '@ijstech/components') {
        return {
            fileName: 'index.d.ts',
            content: await getFileContent('../node_modules/@ijstech/components/types/index.d.ts'),
        }
    };
    let filePath = Path.join(__dirname, 'scripts/scbook', fileName);    
    try {
        if (await checkFileExists(filePath)) {
            return {
                fileName: fileName,
                content: await Fs.readFile(filePath, 'utf8'),
            }
        }
        else if (await checkFileExists(filePath + '.ts')) {
            return {
                fileName: fileName + '.ts',
                content: await Fs.readFile(filePath + '.ts', 'utf8'),
            }
        }
        else if (await checkFileExists(filePath + '.tsx')) {
            return {
                fileName: fileName + '.tsx',
                content: await Fs.readFile(filePath + '.tsx', 'utf8'),
            }
        }
        else if (await checkFileExists(filePath + '.d.ts')) {
            return {
                fileName: fileName + '.d.ts',
                content: await Fs.readFile(filePath + '.d.ts', 'utf8'),
            }
        }
        else {
            return {
                fileName,
                content: '',
            }
        }
    } catch (err) {
        return {
            fileName,
            content: '',
        }
    }
}

export async function setScriptContent(fileName: string, content: string) {
    let filePath = Path.join(__dirname, 'scripts', fileName)
    await Fs.writeFile(filePath, content, 'utf8')
}
export async function writeScript(
    fileName: string, content: string
): Promise<boolean> {    
    let filePath = Path.join(__dirname, 'scripts', fileName)
    try {
        await Fs.writeFile(filePath, content, 'utf8')
        return true;
    } catch (err) {
        return false
    }
}