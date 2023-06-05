import 'mocha'
import * as assert from 'assert'
import {Compiler, Parser} from '../src'
import * as Utils from './utils';

describe('Parser', async function () {
    it('addEventHandler', async()=>{
        let compiler = new Compiler()
        await compiler.addFile(
            'form.tsx',
            (
                await Utils.getScript('form.tsx')
            ).content,
            Utils.getScript
        );
        let source = compiler.getSource('form.tsx');
        if (source){
            let result = Parser.addEventHandler(source, ['Button'], 'button1Click');
            if (result && result.code)
                await Utils.writeScript('modified/addEventHandler.tsx', result.code);
            assert.strictEqual(result.code, (await Utils.getScript('modified/addEventHandler.tsx')).content);
        };
    });
    it('renameProperty', async()=>{
        let compiler = new Compiler()
        await compiler.addFile(
            'form.tsx',
            (
                await Utils.getScript('form.tsx')
            ).content,
            Utils.getScript
        );
        let source = compiler.getSource('form.tsx');
        if (source){
            let result = Parser.renameProperty(source, 'Panel', 'panel1', 'renamedPanel');
            // if (result)
            //     await Utils.writeScript('modified/renameProperty.tsx', result);
            assert.strictEqual(result, (await Utils.getScript('modified/renameProperty.tsx')).content);
        };
    });
    it('renameMethod', async()=>{
        let compiler = new Compiler()
        await compiler.addFile(
            'form.tsx',
            (
                await Utils.getScript('form.tsx')
            ).content,
            Utils.getScript
        );
        let source = compiler.getSource('form.tsx');
        if (source){
            let result = Parser.renameMethod(source, 'render', 'renameMethod');
            // if (result)
            //     await Utils.writeScript('modified/renameMethod.tsx', result);
            assert.strictEqual(result, (await Utils.getScript('modified/renameMethod.tsx')).content);
        };
    });
    it('addComponent', async()=>{
        let compiler = new Compiler()
        await compiler.addFile(
            'form.tsx',
            (
                await Utils.getScript('form.tsx')
            ).content,
            Utils.getScript
        );
        let source = compiler.getSource('form.tsx');
        if (source){
            let pos = Parser.findComponentImportNodeIfNotExists(source, 'Panel');
            assert.strictEqual(pos == undefined, true);
            let classNode = Parser.findModuleClassNode(source);
            if (classNode)
                pos = Parser.findComponentPropertyNodeIfNotExists(classNode, 'panel1');
            assert.strictEqual(pos == undefined, true);
            pos = Parser.findComponentImportNodeIfNotExists(source, 'Button');
            assert.strictEqual(pos, 8);
            if (classNode)
                pos = Parser.findComponentPropertyNodeIfNotExists(classNode, 'button1');
            assert.strictEqual(pos, 115);
            let result = Parser.addComponentProp(source, 'Button', 'button1');
            // console.dir(result);
            // if (result)
            //     await Utils.writeScript('modified/addComponent.tsx', result);
            assert.strictEqual(result, (await Utils.getScript('modified/addComponent.tsx')).content);
        };
    });
    it('addComponent', async()=>{
        let compiler = new Compiler()
        await compiler.addFile(
            'form.tsx',
            (
                await Utils.getScript('form.tsx')
            ).content,
            Utils.getScript
        );
        let source = compiler.getSource('form.tsx');
        assert.strictEqual(source != undefined, true);
        if (source){
            let result = Parser.addComponentProp(source, 'Button', 'button1');
            // console.dir(result);
            // if (result)
            //     await Utils.writeScript('modified/addComponent.tsx', result);
            assert.strictEqual(result, (await Utils.getScript('modified/addComponent.tsx')).content);
        };
    });
})

