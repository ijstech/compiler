import 'mocha'
import * as assert from 'assert'
import {Compiler} from '../src'
import {promises as Fs} from 'fs'
import Path from 'path'
import * as fs from 'fs';

async function getFileContent(fileName: string): Promise<string> {
    let filePath = Path.resolve(__dirname, fileName)
    try {
        return Fs.readFile(filePath, 'utf8')
    } catch (err) {
        return ''
    }
}

async function checkFileExists(path: string): Promise<boolean> {
    try {
        await Fs.stat(path)
        return true
    } catch (err) {
        return false
    }
}

async function getScript(
    fileName: string
): Promise<{ fileName: string; content: string }> {
    if (fileName == '@ijstech/components') {
        return {
            fileName: 'index.d.ts',
            content: await getFileContent('../packages/components/types/index.d.ts'),
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

async function fileImporter(
    fileName: string
): Promise<{ fileName: string; content: string }> {
    if (fileName == '@ijstech/components') {
        return {
            fileName: 'index.d.ts',
            content: await getFileContent('../packages/components/types/index.d.ts'),
        }
    }
    let filePath = Path.join(__dirname, 'scripts', fileName);
    console.log('fileName', fileName, 'filePath', filePath);
    try {
        if (await checkFileExists(filePath)) {
            console.log('1 exist');
            return {
                fileName: fileName,
                content: await Fs.readFile(filePath, 'utf8'),
            }
        }
        else if (await checkFileExists(filePath + '.ts')) {
            console.log('2 exist');
            return {
                fileName: fileName + '.ts',
                content: await Fs.readFile(filePath + '.ts', 'utf8'),
            }
        }
        else if (await checkFileExists(filePath + '.tsx')) {
            console.log('3 exist');
            return {
                fileName: fileName + '.tsx',
                content: await Fs.readFile(filePath + '.tsx', 'utf8'),
            }
        }
        else if (await checkFileExists(filePath + '.d.ts')) {
            console.log('4 exist');
            return {
                fileName: fileName + '.d.ts',
                content: await Fs.readFile(filePath + '.d.ts', 'utf8'),
            }
        }
        else {
            console.log('not exist', fileName);
            return {
                fileName,
                content: '',
            }
        }
    } catch (err) {
        console.log('error', err)
        return {
            fileName,
            content: '',
        }
    }
}

async function setScriptContent(fileName: string, content: string) {
    let filePath = Path.join(__dirname, 'scripts', fileName)
    await Fs.writeFile(filePath, content, 'utf8')
}

describe('Compiler', async function () {
    this.timeout(60000)
    it('getDependencies', async () => {
        let compiler = new Compiler()
        let deps = await compiler.getDependencies(
            'form.tsx',
            (
                await getScript('form.tsx')
            ).content
        )
        assert.deepStrictEqual(deps, ['@ijstech/components', 'hello'])
    })
    it('getDependencies with FileImporter', async () => {
        let compiler = new Compiler()
        let deps = await compiler.getDependencies(
            'form.tsx',
            (
                await getScript('form.tsx')
            ).content,
            getScript
        )
        assert.deepStrictEqual(deps, [
            '@ijstech/components',
            'hello.ts',
            'test1.ts',
            'lib/test2.ts',
        ])
    })
    it('hello.ts', async () => {
        let compiler = new Compiler()
        await compiler.addFile(
            'hello.ts',
            (
                await getScript('hello.ts')
            ).content,
            getScript
        )
        let result = await compiler.compile(true)
        assert.strictEqual(result.errors.length, 0)
        if (result.errors.length) console.dir(result.errors)
        let exp = (await getScript('hello.js')).content
        if (exp) assert.strictEqual(result.script['index.js'], exp)
        else await setScriptContent('hello.js', result.script['index.js'])
    })
    it('form.tsx', async () => {
        let compiler = new Compiler()
        await compiler.addFile(
            'form.tsx',
            (
                await getScript('form.tsx')
            ).content,
            getScript
        )
        let result = await compiler.compile(true)
        if (result.errors.length) console.dir(result.errors)
        assert.strictEqual(result.errors.length, 0)
        let exp = (await getScript('form.js')).content
        if (exp) assert.strictEqual(result.script['index.js'], exp)
        else await setScriptContent('form.js', result.script['index.js'])
    });
    it('scbook project', async () => {
        let compiler = new Compiler();
        const indexPath = 'scbook/index.tsx';
        const content = fs.readFileSync(Path.join(process.cwd(), 'test', 'scripts', indexPath)).toString();
        await compiler.addFile(indexPath, content, fileImporter);
        const result = await compiler.compile();
        console.log('Compilation result', result);
    })
})

