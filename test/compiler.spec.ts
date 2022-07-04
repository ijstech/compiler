import 'mocha';
import * as assert from 'assert';
import {Compiler} from '../src/compiler';
import Fs from 'fs';
import Path from 'path';

function getFileContent(fileName: string): string {
    let filePath = Path.resolve(__dirname, fileName);    
    try{
        return Fs.readFileSync(filePath, 'utf8');
    }
    catch(err){
        return ''
    }
};
function getScript(fileName: string): string {
    let filePath = Path.join(__dirname, 'scripts', fileName);
    try{
        return Fs.readFileSync(filePath, 'utf8');
    }
    catch(err){
        return ''
    }
};
function setScriptContent(fileName: string, content: string) {
    let filePath = Path.join(__dirname, 'scripts', fileName);
    Fs.writeFileSync(filePath, content, 'utf8');
};
describe('Compiler', async function(){    
    this.timeout(60000);
    it('hello.ts', async ()=>{
        let compiler = new Compiler();
        compiler.addContent('hello.ts', getScript('hello.ts'));        
        let result = await compiler.compile(true)
        assert.strictEqual(result.errors.length, 0);
        let exp = getScript('hello.js')
        if (exp)
            assert.strictEqual(result.script['index.js'], exp)
        else
            setScriptContent('hello.js', result.script['index.js']);
    });
    it('form.tsx', async ()=>{        
        let compiler = new Compiler();
        compiler.addPackage('@ijstech/components', {
            dts: {
                'index.d.ts': getFileContent('../packages/components/types/index.d.ts')
            },
            version: ''
        });
        compiler.addContent('hello.ts', getScript('hello.ts'));
        compiler.addContent('form.tsx', getScript('form.tsx'));
        let result = await compiler.compile(true)
        assert.strictEqual(result.errors.length, 0);
        let exp = getScript('form.js')
        if (exp)
            assert.strictEqual(result.script['index.js'], exp)
        else
            setScriptContent('form.js', result.script['index.js']);
    });
});