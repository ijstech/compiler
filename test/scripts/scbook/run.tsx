import {application, customModule, customElements, Module, Panel, Control} from '@ijstech/components';
import './index.css';

@customModule
@customElements('i-run')
export class DocsRun extends Module {
    private runBlock: Panel;

    constructor(parent?: Control, options?: any) {
        super(parent, options);

    }

    async init() {
        super.init();
        this.setupAPI();
    }

    setupAPI() {
        window['executeCode'] = this.executeCode;
    }

    async executeCode(script: any) {
        try {

        // let script = '';
        // try {
        //     if (loadFromIPFS) {
        //         const request = new Request(src);
        //         const response = await fetch(request);
        //         script = await response.text();
        //     } else {
        //         script = src;
        //     }
        //     let content = await fetch('/dist/lib/compiler/lib/components/index.d.ts');
        //     let dts = await content.text();
        //     const Compiler = require('@ijstech/compiler').Compiler;
        //     const compiler = new Compiler();
        //     compiler.addPackage('@ijstech/components', {
        //         dts: {
        //             'index.d.ts': dts,
        //         },
        //         version: '',
        //     });
        //     compiler.addContent('index.tsx', script);
        //     let result = await compiler.compile();
            await application.loadModule('', {
                script,
            });
            for(let i = 0; i < document.body.children.length; i++) {
                const child = document.body.children[i];
                if(child.tagName.toLowerCase().indexOf('i-module') >= 0 && i != document.body.children.length - 1)
                    child.remove();
            }
        } catch (e) {
            console.log('e', e);
        }
    }

    render() {
        return <i-panel id="runBlock" height="auto" width="100%"></i-panel>;
    }
}
