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
define("editor.css", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_1.Styles.Theme.ThemeVars;
    components_1.Styles.cssRule('i-module--1', {
        $nest: {
            '#header': {
                backgroundColor: '#3c3c3c',
            },
            '#toolbarTabs': {
                $nest: {
                    '.tabs-nav-wrap': {
                        background: '#333',
                    },
                    'i-tab': {
                        background: 'transparent',
                        border: 0,
                        borderLeftWidth: '2px',
                        borderLeftStyle: 'solid',
                        borderLeftColor: 'transparent',
                        opacity: 0.65,
                        $nest: {
                            '&:not(.disabled).active': {
                                opacity: 1,
                                backgroundColor: 'transparent',
                                borderLeftColor: '#fff',
                            },
                            '.tab-item': {
                                justifyContent: 'center',
                                width: '48px',
                                height: '48px',
                                padding: 0,
                            },
                        },
                    },
                    '.tabs-content': {
                        background: '#252526',
                        $nest: {
                            '.toolbar-label': {
                                padding: '0 8px',
                                $nest: {
                                    div: {
                                        paddingLeft: '12px',
                                        fontSize: '11px',
                                        color: 'rgb(187, 187, 187)',
                                        lineHeight: '35px',
                                    },
                                },
                            },
                            '.toolbar-workspace': {
                                padding: '0 20px',
                                $nest: {
                                    div: {
                                        fontSize: '12px',
                                        lineHeight: '22px',
                                        fontWeight: 700,
                                        color: '#ccc',
                                    },
                                },
                            },
                            '.project-sidebar': {
                                $nest: {
                                    'i-tree-view': {
                                        paddingLeft: '4px',
                                        $nest: {
                                            'i-tree-node': {
                                                paddingLeft: '14px',
                                            },
                                            '.i-tree-node_content': {
                                                lineHeight: '22px',
                                                paddingLeft: 0,
                                            },
                                            '.i-tree-node_label': {
                                                paddingLeft: '4px',
                                                fontSize: '13.5px',
                                                color: '#ccc',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });
});
define("github/GitHubAPI", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GitHubAPI = void 0;
    class GitHubAPI {
        constructor(owner, repo, authToken, branch) {
            this.owner = owner;
            this.repo = repo;
            if (branch)
                this.branch = branch;
            this._headers = {
                "Accept": `application/vnd.github+json`,
                'Authorization': `token ${authToken}`
            };
        }
        async getFileTree(commitSHA, recursive = false) {
            let queryString = recursive ? "?recursive=1" : "";
            if (this.branch) {
                queryString += `${queryString ? '&' : ''}ref=${this.branch}`;
            }
            return new Promise((resolve, reject) => {
                fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/trees/${commitSHA}${queryString}`, {
                    method: 'GET',
                    headers: this._headers
                }).then(res => res.json()).then(res => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
        async getFile(path) {
            let queryString = this.branch ? `?ref=${this.branch}` : "";
            return new Promise((resolve, reject) => {
                fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}${queryString}`, {
                    method: 'GET',
                    headers: this._headers
                }).then(res => res.json()).then(res => {
                    if (res.content && res.encoding === 'base64') {
                        res.content = this.decodeBase64(res.content);
                    }
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
        async createFile(path, content, message) {
            let queryString = this.branch ? `?ref=${this.branch}` : "";
            return new Promise((resolve, reject) => {
                fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}${queryString}`, {
                    body: JSON.stringify({
                        content,
                        message
                    }),
                    headers: this._headers,
                    method: 'PUT'
                }).then(res => res.json()).then(res => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
        async updateFile(path, commitSHA, content, message) {
            let queryString = this.branch ? `?ref=${this.branch}` : "";
            return new Promise((resolve, reject) => {
                fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}${queryString}`, {
                    body: JSON.stringify({
                        content,
                        message,
                        sha: commitSHA
                    }),
                    method: 'PUT',
                    headers: this._headers
                }).then(res => res.json()).then(res => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
        async deleteFile(path, commitSHA, message) {
            let queryString = this.branch ? `?ref=${this.branch}` : "";
            return new Promise((resolve, reject) => {
                fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}${queryString}`, {
                    body: JSON.stringify({
                        message,
                        sha: commitSHA
                    }),
                    method: 'DELETE',
                    headers: this._headers
                }).then(res => res.json()).then(res => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
        async createBlob(content, encoding = "utf-8") {
            let queryString = this.branch ? `?ref=${this.branch}` : "";
            if (encoding === 'base64') {
                content = this.encodeBase64(content);
            }
            return new Promise((resolve, reject) => {
                fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/blobs${queryString}`, {
                    body: JSON.stringify({
                        content,
                        encoding
                    }),
                    method: 'POST',
                    headers: this._headers
                }).then(res => res.json()).then(res => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
        async createTree(tree, baseTreeSHA) {
            let queryString = this.branch ? `?ref=${this.branch}` : "";
            return new Promise((resolve, reject) => {
                const data = baseTreeSHA ? { base_tree: baseTreeSHA, tree } : { tree };
                fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/trees${queryString}`, {
                    body: JSON.stringify(data),
                    method: 'POST',
                    headers: this._headers
                }).then(res => res.json()).then(res => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
        async createCommit(message, treeSHA, parents) {
            let queryString = this.branch ? `?ref=${this.branch}` : "";
            return new Promise((resolve, reject) => {
                fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/commits${queryString}`, {
                    body: JSON.stringify({
                        message,
                        tree: treeSHA,
                        parents: parents
                    }),
                    method: 'POST',
                    headers: this._headers
                }).then(res => res.json()).then(res => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
        async getReference(branch) {
            const ref = `heads/${branch}`;
            return new Promise((resolve, reject) => {
                fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/ref/${ref}`, {
                    method: 'GET',
                    headers: this._headers
                }).then(res => res.json()).then(res => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
        async updateReference(branch, refSHA) {
            const ref = `heads/${branch}`;
            return new Promise((resolve, reject) => {
                fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/refs/${ref}`, {
                    method: 'PATCH',
                    headers: this._headers,
                    body: JSON.stringify({
                        sha: refSHA
                    })
                }).then(res => res.json()).then(res => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
        async getCommitList(branch, size = 1) {
            let queryString = branch ? `&sha=${branch}` : "";
            if (size > 30)
                size = 30;
            return new Promise((resolve, reject) => {
                fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/commits?per_page=${size}${queryString}`, {
                    method: 'GET',
                    headers: this._headers
                }).then(res => res.json()).then(res => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
        async handleCommit(branch, commitSHA, modifiedFiles, deletedFilePaths, commitMsg) {
            try {
                const repoTree = await this.getFileTree(commitSHA, true);
                const handledFilePaths = deletedFilePaths || [];
                const treeList = [];
                for (const file of modifiedFiles) {
                    const blob = await this.createBlob(file.content, "base64");
                    treeList.push({
                        path: file.path,
                        mode: "100644",
                        type: "blob",
                        sha: blob.sha
                    });
                    handledFilePaths.push(file.path);
                }
                for (const tree of repoTree.tree) {
                    if (handledFilePaths.includes(tree.path) ||
                        tree.type != 'blob')
                        continue;
                    treeList.push(tree);
                }
                const tree = await this.createTree(treeList);
                const ref = await this.getReference(branch);
                const parentSHA = ref.object.sha;
                const commit = await this.createCommit(commitMsg, tree.sha, [parentSHA]);
                const newRef = await this.updateReference(branch, commit.sha);
            }
            catch (err) {
                console.error(err);
            }
        }
        async createUserRepository(repoName, isPrivate = false, description, homepage) {
            return new Promise((resolve, reject) => {
                fetch(`https://api.github.com/user/repos`, {
                    body: JSON.stringify({
                        name: repoName,
                        description: description || "",
                        homepage: homepage || "",
                        private: isPrivate,
                        auto_init: true
                    }),
                    method: 'POST',
                    headers: this._headers
                }).then(res => res.json()).then(res => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
        async createOrgsRepository(org, repoName, isPrivate = false, description, homepage) {
            return new Promise((resolve, reject) => {
                fetch(`https://api.github.com/orgs/${org}/repos`, {
                    body: JSON.stringify({
                        name: repoName,
                        description: description || "",
                        homepage: homepage || "",
                        private: isPrivate,
                        auto_init: true
                    }),
                    method: 'POST',
                    headers: this._headers
                }).then(res => res.json()).then(res => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
        async createRepository(repoName, isPrivate = false, org, description, homepage) {
            if (!org)
                return this.createUserRepository(repoName, isPrivate, description, homepage);
            else
                return this.createOrgsRepository(org, repoName, isPrivate, description, homepage);
        }
        encodeBase64(data) {
            return btoa(data);
        }
        decodeBase64(data) {
            return atob(data);
        }
    }
    exports.GitHubAPI = GitHubAPI;
});
define("editor", ["require", "exports", "@ijstech/components", "@ijstech/compiler", "samples", "editor.css"], function (require, exports, components_2, compiler_1, samples_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    samples_1 = __importDefault(samples_1);
    components_2.Styles.Theme.applyTheme(components_2.Styles.Theme.darkTheme);
    const Theme = components_2.Styles.Theme.ThemeVars;
    class CodeEditorModule extends components_2.Module {
        async run() {
            await this.ifrPreview.reload();
            let compiler = new compiler_1.Compiler();
            await compiler.addFile('src/index.tsx', samples_1.default['src/index.tsx'], this.fileImporter);
            let result = await compiler.compile();
            console.dir(result);
            let contentWindow = this.ifrPreview.iframeElm.contentWindow;
            contentWindow.postMessage(JSON.stringify({ script: result.script['index.js'] }));
        }
        async handleTreeViewClick() {
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
                            this.edtCodeTemp = new components_2.CodeEditor(this.tabCodeTemp);
                            this.edtCodeTemp.onChange = this.handleFileChange;
                            this.edtCodeTemp.dock = 'fill';
                        }
                        ;
                        let model = await components_2.CodeEditor.getFileModel(tag.fileName);
                        if (!model) {
                            let deps = await this.compiler.getDependencies(tag.fileName, tag.content, this.fileImporter);
                            model = await components_2.CodeEditor.addFile(tag.fileName, tag.content);
                        }
                        ;
                        this.tabCodeTemp.title = tag.fileName;
                        this.tabCodeTemp.tag = { treeNode: this.tvFiles.activeItem };
                        this.edtCodeTemp.tag = { fileName: tag.fileName };
                        this.edtCodeTemp.loadContent(tag.content, 'typescript', tag.fileName);
                        this.tabCodeTemp.caption = tag.fileName.split('/').pop() || 'Untitled';
                        this.tabCodeTemp.active();
                    }
                }
            }
        }
        async fileImporter(fileName) {
            if (fileName == '@ijstech/components') {
                let res = await fetch('/dist/lib/components/index.d.ts');
                let content = await res.text();
                components_2.CodeEditor.addLib(fileName, content);
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
                components_2.CodeEditor.addFile(fileName, samples_1.default[fileName]);
                return {
                    fileName: fileName,
                    content: samples_1.default[fileName]
                };
            }
            ;
        }
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
        }
        ;
        handleFileChange(target, event) {
            var _a;
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
        init() {
            super.init();
            this.loadFiles();
        }
        render() {
            return (this.$render("i-panel", { id: "pnlMain", dock: "fill" },
                this.$render("i-panel", { id: "header", height: 30, dock: "top" },
                    this.$render("i-panel", { dock: "right" },
                        this.$render("i-button", { caption: "Run", icon: { name: "caret-right" }, height: 30, width: 100, margin: { top: 5, left: 4 }, onClick: this.run })),
                    this.$render("i-panel", { dock: "right", width: 140, padding: { top: 4, bottom: 4 } },
                        this.$render("i-hstack", null,
                            this.$render("i-label", { caption: "Preview", width: 60 }),
                            this.$render("i-switch", { checkedText: "on", uncheckedText: "off", id: "swPreview", width: 80, checked: true, onChanged: this.handleTogglePreview })))),
                this.$render("i-panel", { id: "toolbarTabs", dock: "left", width: 348, resizer: true },
                    this.$render("i-tabs", { mode: "vertical", dock: "fill", width: 80 },
                        this.$render("i-tab", { icon: { name: 'file-code', fill: 'white', width: 20, height: 20 } },
                            this.$render("i-vstack", null,
                                this.$render("i-hstack", null,
                                    this.$render("i-label", { class: "toolbar-label", caption: "EXPLORER" })),
                                this.$render("i-hstack", null,
                                    this.$render("i-label", { class: "toolbar-workspace", caption: "WORKSPACE" })),
                                this.$render("i-vstack", { class: "project-sidebar", width: "100%", height: "calc(100vh - 22px - 35px - 30px)" },
                                    this.$render("i-tree-view", { id: "tvFiles", dock: "fill", onClick: this.handleTreeViewClick, onDblClick: this.handleTreeViewDblClick })))),
                        this.$render("i-tab", { icon: { name: 'search', fill: 'white', width: 20, height: 20 } },
                            this.$render("i-vstack", null,
                                this.$render("i-hstack", null,
                                    this.$render("i-label", { class: "toolbar-label", caption: "SEARCH" })),
                                this.$render("i-vstack", { class: "project-sidebar", width: "100%", height: "calc(100vh - 22px - 35px - 30px)" }))),
                        this.$render("i-tab", { icon: {
                                name: 'code-branch',
                                fill: 'white',
                                width: 20,
                                height: 20,
                            } }))),
                this.$render("i-panel", { id: "pnlCode", dock: "fill" },
                    this.$render("i-tabs", { id: "tsEditors", dock: "fill", draggable: true, closable: true, onCloseTab: this.handleEditorTabClose },
                        this.$render("i-tab", { id: "tabCodeTemp", caption: "untitled" },
                            this.$render("i-code-editor", { id: "edtCodeTemp", dock: "fill", onChange: this.handleFileChange })))),
                this.$render("i-panel", { id: "pnlPreview", dock: "right", width: "35%", resizer: true },
                    this.$render("i-panel", { dock: "top", height: 30, padding: { top: 5, bottom: 5 } },
                        this.$render("i-panel", { dock: "left", width: 80 },
                            this.$render("i-button", { icon: { name: "angle-left" }, width: 20, height: 20 }),
                            this.$render("i-button", { icon: { name: "angle-right" }, margin: { left: 4 }, width: 20, height: 20 }),
                            this.$render("i-button", { icon: { name: "redo" }, margin: { left: 4 }, width: 20, height: 20, onClick: this.reload })),
                        this.$render("i-input", { dock: "fill", value: "https://localhost", margin: { right: 10 } })),
                    this.$render("i-iframe", { id: "ifrPreview", url: "/launcher.html", dock: "fill" }))));
        }
    }
    exports.default = CodeEditorModule;
});
