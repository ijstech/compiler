import 'mocha'
import * as assert from 'assert'
import {Compiler} from '../src'
import * as Utils from './utils';

describe('Compiler', async function () {
    this.timeout(60000)
    it('renderUI', async()=>{
        let compiler = new Compiler()
        await compiler.addFile(
            'form.tsx',
            (
                await Utils.getScript('form.tsx')
            ).content,
            Utils.getScript
        );
        let result = compiler.renderUI('form.tsx', 'renderUI', {
            name: 'i-panel',
            items: [
                {
                  name: 'i-button',
                  props: { id: '"button1"',caption: '"Hello"', onClick: '{this.hello}', top: '{10}' },
                  items: undefined
                }
            ]
        });
        // if (result)
        //     await Utils.writeScript('modified/renderUI.tsx', result);
        let script = await Utils.getScript('modified/renderUI.tsx');
        assert.strictEqual(result, script.content);
    });
    it('parseUI', async () => {
        let compiler = new Compiler()
        await compiler.addFile(
            'form.tsx',
            (
                await Utils.getScript('form.tsx')
            ).content,
            Utils.getScript
        );
        let result = compiler.parseUI('form.tsx', 'render');
        assert.deepStrictEqual(result, {
            name: 'i-panel',
            props: {},
            items: [
              {
                name: 'i-button',
                props: { caption: '"Hello"', onClick: '{this.hello}', top: '{10}' },
                items: undefined
              }
            ]
          }
        );

        compiler = new Compiler()
        await compiler.addFile(
            'form.tsx',
            (
                await Utils.getScript('form.tsx')
            ).content,
            Utils.getScript
        );
        result = compiler.parseUI('form.tsx', 'render1');
        assert.strictEqual(result, undefined);

        compiler = new Compiler()
        await compiler.addFile(
            'form.tsx',
            (
                await Utils.getScript('form.tsx')
            ).content,
            Utils.getScript
        );
        result = compiler.parseUI('form.tsx', 'render2');
        assert.deepStrictEqual(result, {
            name: 'i-panel',
            props: {},
            items: [
              {
                name: 'i-button',
                props: { caption: '"Hello"', onClick: '{this.hello}', top: '{10}' },
                items: undefined
              }
            ]
          }
        );
    });
    it('getDependencies', async () => {
        let compiler = new Compiler()
        let deps = await compiler.getDependencies(
            'form.tsx',
            (
                await Utils.getScript('form.tsx')
            ).content
        )
        assert.deepStrictEqual(deps, ['@ijstech/components', 'hello'])
    });    
    it('getDependencies with FileImporter', async () => {
        let compiler = new Compiler()
        let deps = await compiler.getDependencies(
            'form.tsx',
            (
                await Utils.getScript('form.tsx')
            ).content,
            Utils.getScript
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
                await Utils.getScript('hello.ts')
            ).content,
            Utils.getScript
        )
        let result = await compiler.compile(true)
        // Utils.writeScript('hello.js', result.script['index.js'])
        assert.strictEqual(result.errors.length, 0)
        if (result.errors.length) 
            console.dir(result.errors)
        let exp = (await Utils.getScript('hello.js')).content
        if (exp) assert.strictEqual(result.script['index.js'], exp)
        else await Utils.setScriptContent('hello.js', result.script['index.js'])
    })
    it('form.tsx', async () => {
        let compiler = new Compiler()
        await compiler.addFile(
            'form.tsx',
            (
                await Utils.getScript('form.tsx')
            ).content,
            Utils.getScript
        )
        let result = await compiler.compile(true)
        // Utils.writeScript('form.js', result.script['index.js'])
        if (result.errors.length) 
            console.dir(result.errors)
        assert.strictEqual(result.errors.length, 0)
        let exp = (await Utils.getScript('form.js')).content
        if (exp) assert.strictEqual(result.script['index.js'], exp)
        else await Utils.setScriptContent('form.js', result.script['index.js'])
    });
})

