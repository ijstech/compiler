var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("samples", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let samples = {};
    samples['package.json'] = `{
    "name": "demo1",
    "main": "src/index.tsx"
}`;
    samples['src/index.tsx'] = `//index.tsx
import {Module, Button} from '@ijstech/components';
import {hello} from './lib/hello';

export default class Test extends Module{
  private btnHello: Button;
  handleButtonClick(){
    this.btnHello.caption = hello();
  }
  render(){
    return <i-panel>
      <i-button id="btnHello" caption="hello" onClick={this.handleButtonClick}></i-button>
    </i-panel>
  }
}`;
    samples['src/lib/hello.ts'] = `//hello.ts
export function hello(){
  return 'hello world!';
}`;
    exports.default = samples;
});
define("editor", ["require", "exports", "@ijstech/components", "@ijstech/compiler", "samples"], function (require, exports, components_1, compiler_1, samples_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    samples_1 = __importDefault(samples_1);
    components_1.Styles.Theme.applyTheme(components_1.Styles.Theme.darkTheme);
    class CodeEditorModule extends components_1.Module {
        async loadFiles() {
            this.tvFiles.clear();
            let fileNodes = {};
            let self = this;
            async function addFileNode(paths) {
                let name = '';
                let node = null;
                for (let i = 0; i < paths.length; i++) {
                    name = name + '/' + paths[i];
                    if (!fileNodes[name]) {
                        node = await self.tvFiles.add(node, paths[i]);
                        fileNodes[name] = node;
                    }
                    else
                        node = fileNodes[name];
                }
                ;
                return node;
            }
            let files = [];
            for (let fileName in samples_1.default)
                files.push({
                    paths: fileName.split('/'),
                    content: samples_1.default[fileName]
                });
            files.sort((item1, item2) => {
                if (item1.paths.length > item2.paths.length)
                    return -1;
                else if (item1.paths.length < item2.paths.length)
                    return 1;
                else
                    return 0;
            });
            for (let i = 0; i < files.length; i++) {
                let node = await addFileNode(files[i].paths);
                if (node)
                    node.tag = {
                        fileName: files[i].paths.join('/'),
                        content: files[i].content
                    };
            }
            ;
            console.log('tv', this.tvFiles);
        }
        ;
        async fileImporter(fileName) {
            if (fileName == '@ijstech/components') {
                let res = await fetch('/dist/lib/components/index.d.ts');
                let content = await res.text();
                components_1.CodeEditor.addLib(fileName, content);
                return {
                    fileName: 'index.d.ts',
                    content: content
                };
            }
            else {
                if (samples_1.default[fileName + '.ts'])
                    fileName = fileName + '.ts';
                else if (samples_1.default[fileName + '.tsx'])
                    fileName = samples_1.default[fileName + '.tsx'];
                else if (samples_1.default[fileName + '.d.ts'])
                    fileName = samples_1.default[fileName + '.d.ts'];
                else
                    return null;
                components_1.CodeEditor.addFile(fileName, samples_1.default[fileName]);
                return {
                    fileName: fileName,
                    content: samples_1.default[fileName]
                };
            }
            ;
        }
        handleFileChange(target, event) {
            var _a;
            console.dir(target);
            console.dir(event);
            let fileName = (_a = target.tag) === null || _a === void 0 ? void 0 : _a.fileName;
            if (fileName)
                samples_1.default[fileName] = target.value;
        }
        handleTogglePreview() {
            this.pnlPreview.visible = this.swPreview.checked;
            this.refresh();
        }
        get compiler() {
            if (!this._compiler)
                this._compiler = new compiler_1.Compiler();
            return this._compiler;
        }
        getLanguageByFileName(fileName) {
            let language = 'txt';
            const extension = fileName.substr(fileName.lastIndexOf('.'));
            switch (extension) {
                case '.txt':
                    language = 'txt';
                    break;
                case '.css':
                case '.sass':
                case '.scss':
                case '.less':
                    language = 'css';
                    break;
                case '.json':
                    language = 'json';
                    break;
                case '.js':
                case '.jsx':
                    language = 'javascript';
                    break;
                case '.ts':
                case '.tsx':
                    language = 'typescript';
                    break;
                case '.sol':
                    language = 'solidity';
                    break;
                case '.md':
                    language = 'markdown';
                    break;
                case '.html':
                    language = 'html';
                    break;
                case '.xml':
                    language = 'xml';
                    break;
                default:
                    language = 'txt';
                    break;
            }
            return language;
        }
        async handleTreeViewClick() {
            console.log('handleTreeViewClick');
            if (this.tvFiles.activeItem) {
                let tag = this.tvFiles.activeItem.tag;
                if (tag && tag.fileName) {
                    if (tag.tab)
                        return tag.tab.active();
                    else {
                        if (!this.tsEditors.activeTab || !this.tabCodeTemp) {
                            this.tabCodeTemp = this.tsEditors.add();
                        }
                        ;
                        if (!this.edtCodeTemp) {
                            this.edtCodeTemp = new components_1.CodeEditor(this.tabCodeTemp);
                            this.edtCodeTemp.onChange = this.handleFileChange;
                            this.edtCodeTemp.dock = 'fill';
                        }
                        ;
                        let model = await components_1.CodeEditor.getFileModel(tag.fileName);
                        if (!model) {
                            let deps = await this.compiler.getDependencies(tag.fileName, tag.content, this.fileImporter);
                            model = await components_1.CodeEditor.addFile(tag.fileName, tag.content);
                        }
                        ;
                        this.tabCodeTemp.title = tag.fileName;
                        this.tabCodeTemp.tag = { treeNode: this.tvFiles.activeItem };
                        this.edtCodeTemp.tag = { fileName: tag.fileName };
                        const language = this.getLanguageByFileName(tag.fileName);
                        this.edtCodeTemp.loadContent(tag.content, language, tag.fileName);
                        this.tabCodeTemp.caption = tag.fileName.split('/').pop() || 'Untitled';
                        this.tabCodeTemp.active();
                    }
                }
            }
        }
        async run() {
            await this.ifrPreview.reload();
            let compiler = new compiler_1.Compiler();
            await compiler.addFile('src/index.tsx', samples_1.default['src/index.tsx'], this.fileImporter);
            let result = await compiler.compile();
            console.dir(result);
            let contentWindow = this.ifrPreview.iframeElm.contentWindow;
            contentWindow.postMessage(JSON.stringify({ script: result.script['index.js'] }));
        }
        handleTreeViewDblClick() {
            var _a;
            let nodeData = (_a = this.tvFiles.activeItem) === null || _a === void 0 ? void 0 : _a.tag;
            if (this.tabCodeTemp && nodeData && !nodeData.tab) {
                this.tabCodeTemp.font.style = 'normal';
                nodeData.tab = this.tabCodeTemp;
                nodeData.editor = this.edtCodeTemp;
                this.tabCodeTemp = undefined;
                this.edtCodeTemp = undefined;
            }
        }
        handleEditorTabClose(target, tab) {
            if (tab.tag && tab.tag.treeNode) {
                tab.tag.treeNode.tag.tab = null;
            }
            if (!this.tsEditors.activeTab) {
                this.tabCodeTemp = undefined;
                this.edtCodeTemp = undefined;
            }
        }
        reload() {
            this.ifrPreview.reload();
        }
        async init() {
            await super.init();
            this.loadFiles();
        }
        render() {
            console.log('editor render');
            return (this.$render("i-panel", { id: 'pnlMain', dock: 'fill' },
                this.$render("i-panel", { height: 40, dock: 'top' },
                    this.$render("i-panel", { dock: 'left' },
                        this.$render("i-button", { caption: "Run", icon: "caret-right", height: 30, width: 140, margin: { top: 5, left: 4 }, onClick: this.run })),
                    this.$render("i-panel", { dock: 'right', width: 140, padding: { top: 4, bottom: 4 } },
                        this.$render("i-hstack", null,
                            this.$render("i-label", { caption: 'Preview', width: 60 }),
                            this.$render("i-switch", { checkedText: 'on', uncheckedText: 'off', id: 'swPreview', width: 80, checked: true, onChanged: this.handleTogglePreview })))),
                this.$render("i-panel", { dock: 'left', width: 180, resizer: true },
                    this.$render("i-tabs", { mode: 'vertical', dock: 'fill', width: 80 },
                        this.$render("i-tab", { icon: { name: 'file-code', fill: 'white' } },
                            this.$render("i-tree-view", { id: 'tvFiles', dock: 'fill', onClick: this.handleTreeViewClick, onDblClick: this.handleTreeViewDblClick })),
                        this.$render("i-tab", { icon: { name: 'search', fill: 'white' } }),
                        this.$render("i-tab", { icon: { name: 'code-branch', fill: 'white' } }))),
                this.$render("i-panel", { id: 'pnlCode', dock: 'fill' },
                    this.$render("i-tabs", { id: 'tsEditors', dock: 'fill', draggable: true, closable: true, onTabClosed: this.handleEditorTabClose },
                        this.$render("i-tab", { id: 'tabCodeTemp', caption: 'untitled' },
                            this.$render("i-code-editor", { id: "edtCodeTemp", dock: 'fill', onChange: this.handleFileChange })))),
                this.$render("i-panel", { id: 'pnlPreview', dock: 'right', width: '50%', resizer: true },
                    this.$render("i-panel", { dock: 'top', height: 30, padding: { top: 5, bottom: 5 } },
                        this.$render("i-panel", { dock: 'left', width: 80 },
                            this.$render("i-button", { icon: 'angle-left', width: 20, height: 20 }),
                            this.$render("i-button", { icon: 'angle-right', margin: { left: 4 }, width: 20, height: 20 }),
                            this.$render("i-button", { icon: 'redo', margin: { left: 4 }, width: 20, height: 20, onClick: this.reload })),
                        this.$render("i-input", { dock: 'fill', value: 'https://localhost', margin: { right: 10 } })),
                    this.$render("i-iframe", { id: 'ifrPreview', url: '/launcher.html', dock: 'fill' }))));
        }
        ;
    }
    exports.default = CodeEditorModule;
    ;
});
