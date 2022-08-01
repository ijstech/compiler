import {customModule, customElements, Module, CodeEditor, Iframe, Control} from '@ijstech/components';
import './edit.css';

@customModule
@customElements('i-edit')
export class DocsEdit extends Module {
    private mdEditor: CodeEditor;
    private runFrame: Iframe;

    constructor(parent?: Control, options?: any) {
        super(parent, options);
    }

    sleep(time: number) {
        return new Promise((res, rej) => {
            setTimeout(res, time);
        });
    }

    async init() {
        super.init();
        let res = await fetch('/dist/lib/compiler/lib/components/index.d.ts');
        let content = await res.text();
        CodeEditor.addLib('@ijstech/components', content)
        const language = window.localStorage.getItem('$$scbook_edit_language') || 'markdown';
        const code = window.localStorage.getItem('$$scbook_edit_code') || '';
        await this.sleep(1000);
        this.mdEditor.language = 'typescript';//language as Components.LanguageType;
        this.mdEditor.value = code;
        const iframeWindow = this.runFrame['iframeElm'].contentWindow;
        const script = await this.compileScript(code);
        await iframeWindow.executeCode(script);
    }

    async btnRunOnClick() {
        const code = this.mdEditor.value;
        const iframeWindow = this.runFrame['iframeElm'].contentWindow;
        const script = await this.compileScript(code);
        iframeWindow.executeCode(script);
    }

    async compileScript(script: string) {
        try {
            const Compiler = require('@ijstech/compiler').Compiler;
            const compiler = new Compiler();
            await compiler.addFile('index.tsx', script, async (fileName: string, contnet: string) => {
                if (fileName == '@ijstech/components'){
                    let res = await fetch('/dist/lib/compiler/lib/components/index.d.ts');
                    let content = await res.text();
                    // CodeEditor.addLib(fileName, content);
                    return {
                        fileName: 'index.d.ts',
                        content: content
                    }
                }
            })
            let result = await compiler.compile();
            console.log('result', result);
            return result.script['index.js'];
        }
        catch(e) {
            console.log(e);
        }
    }

    render() {
        return (
            <i-panel id="container" height="100vh" width="100%">
                <i-panel id="toolbar">
                    <i-button id="btnRun" caption="Run" onClick={this.btnRunOnClick}></i-button>
                </i-panel>
                <i-panel id="textareacontainer" width="50%" height="100%">
                    <i-code-editor id="mdEditor" width="100%" height="100%" language="markdown"></i-code-editor>
                </i-panel>
                <i-panel id="iframecontainer" width="50%" height="100%">
                    <i-iframe id="runFrame" url="/run.html" width="100%" height="100%"></i-iframe>
                </i-panel>
            </i-panel>
        );
    }
}
