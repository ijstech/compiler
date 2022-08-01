import {
    customElements,
    customModule,
    Module,
    TreeView,
    TreeNode,
    Control,
    Markdown,
    LibPath,
    RequireJS,
    Iframe,
    Styles,
} from '@ijstech/components';

export { DocsHeader } from './components/header';
export { DocsNavigator } from './components/navigator';
export { DocsPaging } from './components/paging';
import './index.css';
const Theme = Styles.Theme.ThemeVars;

const slugify = (str: string) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

RequireJS.config({
    paths: {
        'ipfs-verifier': `${LibPath}lib/ipfs-verifier`,
        highlightjs: `${LibPath}lib/highlightjs`,
    },
});

// class GitHubAPI {
//     private owner: string;
//     private repo: string;
//     private _headers: any;
//
//     constructor(owner: string, repo: string, authToken: string) {
//         this.owner = owner;
//         this.repo = repo;
//         this._headers = {
//             "Accept": `application/vnd.github+json`,
//             'Authorization': `token ${authToken}`
//         };
//     }
//
//     async getFileTree(commitSHA: string): Promise<any> {
//         return new Promise((resolve, reject) => {
//             fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/trees/${commitSHA}?recursive=1`, {
//                 method: 'GET',
//                 headers: this._headers
//             }).then(res => res.json()).then(res => {
//                 resolve(res);
//             }).catch((error) => {
//                 reject(error);
//             })
//         })
//     }
//
//     async getFile(path: string): Promise<any> {
//         return new Promise((resolve, reject) => {
//             fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`, {
//                 method: 'GET',
//                 headers: this._headers
//             }).then(res => res.json()).then(res => {
//                 resolve(res);
//             }).catch((error) => {
//                 reject(error);
//             })
//         })
//     }
//
//     async createFile(path: string, content: string, message: string): Promise<any> {
//         return new Promise((resolve, reject) => {
//             fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`, {
//                 body: JSON.stringify({
//                     content,
//                     message
//                 }),
//                 headers: this._headers,
//                 method: 'PUT'
//             }).then(res => res.json()).then(res => {
//                 resolve(res);
//             }).catch((error) => {
//                 reject(error);
//             })
//         })
//     }
//
//     async updateFile(path: string, commitSHA: string, content: string, message: string): Promise<any> {
//         return new Promise((resolve, reject) => {
//             fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`, {
//                 body: JSON.stringify({
//                     content,
//                     message,
//                     sha: commitSHA
//                 }),
//                 method: 'PUT',
//                 headers: this._headers
//             }).then(res => res.json()).then(res => {
//                 resolve(res);
//             }).catch((error) => {
//                 reject(error);
//             })
//         })
//     }
//
//     async deleteFile(path: string, commitSHA: string, message: string): Promise<any> {
//         return new Promise((resolve, reject) => {
//             fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`, {
//                 body: JSON.stringify({
//                     message,
//                     sha: commitSHA
//                 }),
//                 method: 'DELETE',
//                 headers: this._headers
//             }).then(res => res.json()).then(res => {
//                 resolve(res);
//             }).catch((error) => {
//                 reject(error);
//             })
//         })
//     }
//
//     encodeBase64(data: string) {
//         return btoa(data);
//     }
//
//     decodeBase64(data: string) {
//         return atob(data);
//     }
// }

@customModule
@customElements('i-docs-site')
export class DocsSite extends Module {
    private docsHeader: any; // DocsHeader;
    private docsNavigator: any; // DocsNavigation;
    private docsPaging: any;
    private treeData: any[] = [];
    private entrypoint: string;
    private flatTree: Array<any>;
    private rightNavAnchors: Array<string> = [];
    // private hash: string;
    private mdViewer: Markdown;
    private isNavOpened = true;
    private forceUpdate: boolean = true;
    private runFrame: Iframe;
    private isPageLoading: boolean = false;
    private pageLoadingCounter: number = 0;
    private hljs: any;

    constructor(parent?: Control, options?: any) {
        super();
        this.entrypoint = options.entrypoint;
        if (window.localStorage) {
            const entrypoint = window.localStorage.getItem('$$scbook_entrypoint');
            if (entrypoint == this.entrypoint) this.forceUpdate = false;
        }
    }

    toggleNav() {
        this.isNavOpened = !this.isNavOpened;
        this.docsNavigator.toggleNav(this.isNavOpened);
    }

    async retryLoadFile(path: string): Promise<Response> {
        return new Promise((resolve, reject) => {
            const load = async (p: string) => {
                try {
                    const request = new Request(path);
                    const response = await fetch(request);
                    if (response.ok) {
                        resolve(response);
                    } else {
                        setTimeout(() => {
                            load(p);
                        }, 5000);
                    }
                } catch (e) {
                    console.log('load file catch', e);
                    setTimeout(() => {
                        load(p);
                    }, 5000);
                }
            };
            load(path);
        });
    }

    flattenTree(tree: Array<any>) {
        const clonetTree: any[] = JSON.parse(JSON.stringify(tree));
        return clonetTree.reduce((acc, cur) => {
            if (cur.children) {
                const temp = cur.children;
                Reflect.deleteProperty(cur, 'children');
                acc.push(cur);
                acc.push(this.flattenTree(temp));
            } else {
                acc.push(cur);
            }
            return acc.flat();
        }, []);
    }

    async compileScript(filePath: string) {
        try {
            // Load script file
            const request = new Request(`${this.entrypoint}/${filePath}`);
            const response = await fetch(request);
            const script = await response.text();

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

            // compiler.addPackage('@ijstech/components', {
            //     dts: {
            //         'index.d.ts': dts,
            //     },
            //     version: '',
            // });
            // compiler.addContent('index.tsx', script);
            let result = await compiler.compile();
            console.log('result', result)
            return result.script['index.js'];
        } catch (e) {
            console.log(e);
        }
    }

    addBtnEvent() {
        const editBtns = document.querySelectorAll('.edit-btn');
        const runBtns = document.querySelectorAll('.run-btn');
        const copyBtns = document.querySelectorAll('.copy-btn');
        const self = this;
        const lgRegex = new RegExp(/language-(.*?) .*$/gi);

        Array.from(editBtns)?.map((btn) =>
            btn.addEventListener('click', async (e: any) => {
                const parentNode = e.target.closest('pre');
                const code = parentNode.querySelector('code');
                const lg = code.className.replace(lgRegex, (_: string, lg: string) => lg);
                const filePath = lg.substr(lg.indexOf('(') + 1, lg.indexOf(')') - lg.indexOf('(') - 1);
                const request = new Request(`${this.entrypoint}/${filePath}`);
                const response = await fetch(request);
                const script = await response.text();
                window.localStorage.setItem('$$scbook_edit_language', lg);
                window.localStorage.setItem('$$scbook_edit_code', script);
                window?.open('/edit.html', '_blank')?.focus();
            })
        );

        Array.from(runBtns)?.map((btn) =>
            btn.addEventListener('click', async (e: any) => {
                try {
                    const parentNode = e.target.closest('pre');
                    const code = parentNode.querySelector('code');

                    const lg = code.className.replace(lgRegex, (_: string, lg: string) => lg);
                    const iframeWindow = self.runFrame['iframeElm'].contentWindow;
                    const filePath = lg.substr(lg.indexOf('(') + 1, lg.indexOf(')') - lg.indexOf('(') - 1);

                    const script = await this.compileScript(filePath);
                    iframeWindow.executeCode(script);
                } catch (e) {
                    console.log(e);
                }
            })
        );
        Array.from(copyBtns)?.map((btn) =>
            btn.addEventListener('click', (e: any) => {
                const parentNode = e.target.closest('pre');
                const code = parentNode.querySelector('code')?.innerText;
                navigator.clipboard.writeText(code);
                e.target.innerText = 'Copied';
                setTimeout(() => (e.target.innerText = 'Copy'), 1000);
            })
        );
    }

    async processGitbook(content: string, filePath: string) {
        const fileRegex = new RegExp(/{% file src="([^#&?]*)" %}/gi);
        const embedRegex = new RegExp(/{% embed url="<a href=".*?">(.*?)"<\/a> %}/gi);
        const contentRefRegex = new RegExp(
            /<p>(.*?):<\/p>[\n]<p>[\n]*{% content-ref url="(.*?)" %}[\n].*?[\n]{% endcontent-ref %}[\n]*<\/p>/gi
        );
        const hintRegex = new RegExp(/{% hint style="(.*?)" %}(.*?){% endhint %}/gis);

        const tabsRegex = new RegExp(/<p>{% tabs %}(.+?){% endtabs %}<\/p>/gis);
        const tabRegex = new RegExp(/{% tab title="(.*?)" %}<\/p>(.+?)<p>{% endtab %}/gis);

        const anchorRegex = new RegExp(/<a href="(.*?)">(.*?)<\/a>/gm);
        const preRegex = new RegExp(/<pre>(.*?)<\/pre>/gis);

        if (preRegex.test(content)) {
            content = content.replace(preRegex, (_, html: string) => {
                let ddBtn = `<i-dropdown-button visible={false} caption="Actions">`;
                // const editBtn = `<i-button caption="Edit" class="edit-btn"></i-button>`;
                const runBtn = `<i-dropdown-item caption="Run" class="run-btn"></i-dropdown-item>`;
                const copyBtn = `<i-dropdown-item caption="Copy" class="copy-btn"></i-dropdown-item>`;
                ddBtn += runBtn;
                ddBtn += copyBtn;
                ddBtn += `</i-dropdown-button>`;

                // html += editBtn;
                // html += runBtn;
                // html += copyBtn;
                html += ddBtn;
                return `<pre>${html}</pre>`;
            });
        }

        if (fileRegex.test(content)) {
            const sclinkPath = `${this.entrypoint}/${filePath}`;
            const request = new Request(sclinkPath);
            const result = await fetch(request);
            if (result.ok) {
                const sclinkData = await result.json();

                content = content.replace(fileRegex, (_, src: string) => {
                    const { size, filename } = sclinkData.filedata[src];
                    const link = `${this.entrypoint}/${src.replace('../', '')}`;
                    return `<div class="sc-link">                    
                    <a href="${link}" download>
                      <div class="sc-link-icon">
                        <div class="icon-wrapper">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" preserveAspectRatio="xMidYMid meet" style="height: 20.8px; vertical-align: middle; width: 20.8px;"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"></path></svg>
                        </div>
                      </div>
                      <div class="sc-link-content">
                        <div class="info">
                          <div class="title">${filename}</div>
                          <div class="subtitle">${size}KB</div>
                        </div>
                        <div class="type">Binary</div>
                      </div>
                    </a>
                    </div>`;
                });
            }
        }

        if (embedRegex.test(content)) {
            const sclinkPath = `${this.entrypoint}/${filePath}`;
            const request = new Request(sclinkPath);
            const result = await fetch(request);
            if (result.ok) {
                const sclinkData = await result.json();

                content = content.replace(embedRegex, (_, url: string) => {
                    const { title, siteName, icon } = sclinkData.metadata[url];
                    return `<div class="sc-link">                    
                    <a href="${url}" target="_blank">
                      <div class="sc-link-icon">
                        <div class="icon-wrapper">
                          <img alt src="${icon}"/>
                        </div>
                      </div>
                      <div class="sc-link-content">
                        <div class="info">
                          <div class="title">${title}</div>
                        </div>
                        <div class="type">${siteName}</div>
                      </div>
                    </a>
                    </div>`;
                });
            }
        }

        if (hintRegex.test(content)) {
            content = content.replace(hintRegex, (_, style: string, hint: string) => {
                const icon: { [index: string]: string } = {
                    warning: `<svg viewBox="0 0 16 16" fill="none" preserveAspectRatio="xMidYMid meet" class="r-1vzi8xi" style="color: rgb(185, 94, 4); height: 20px; width: 20px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 8.96V3.29h1v5.67h-1z" fill="currentColor"></path><path d="M8 12.5a1 1 0 110-2 1 1 0 010 2z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" fill="currentColor"></path></svg>`,
                    danger: `<svg viewBox="0 0 16 16" fill="none" preserveAspectRatio="xMidYMid meet" class="r-1vzi8xi" style="color: rgb(211, 61, 61); height: 20px; width: 20px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 1a.5.5 0 01.424.235l7.5 12A.5.5 0 0115.5 14H.5a.5.5 0 01-.424-.765l7.5-12A.5.5 0 018 1zM1.402 13h13.196L8 2.443 1.402 13z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 9.41V6.12h1v3.29h-1z" fill="currentColor"></path><path d="M8 11.67a.76.76 0 110-1.52.76.76 0 010 1.52z" fill="currentColor"></path></svg>`,
                    info: `<svg viewBox="0 0 16 16" fill="none" preserveAspectRatio="xMidYMid meet" class="r-1vzi8xi" style="color: rgb(52, 109, 219); height: 20px; width: 20px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 6.37H8a.5.5 0 01.5.5v5.5h-1v-5h-1v-1z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 12.37h-3v-1h3v1z" fill="currentColor"></path><path d="M7.74 5.16a.77.77 0 01-.76-.77.76.76 0 011.52 0 .77.77 0 01-.76.77z" fill="currentColor"></path></svg>`,
                    success: `<svg viewBox="0 0 16 16" fill="none" preserveAspectRatio="xMidYMid meet" class="r-1vzi8xi" style="color: rgb(0, 136, 71); height: 20px; width: 20px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.677 6.16l-4.443 4.444a.5.5 0 01-.708 0L4.323 8.4l.707-.707 1.85 1.85 4.09-4.09.707.707z" fill="currentColor"></path></svg>`,
                };

                return `<div class="sc-hint ${style}">
                  <div class="sc-hint-icon">
                    ${icon[style]}
                  </div>
                  <div class="sc-hint-content">${hint}</div>
                </div>`;
            });
        }

        if (contentRefRegex.test(content)) {
            content = content.replace(contentRefRegex, (_, title: string, url: string) => {
                return `<li class="sc-content-ref">
                  <a href="${url}">
                    ${title}
                  </a>
                </li>`;
            });
        }

        if (tabsRegex.test(content)) {
            content = content.replace(tabsRegex, (_, tabsContent: string) => {
                let tabsElm = `<i-tabs class="sc-tabs" width="auto" activePageIndex="0">`;

                const tabs: any[] = [];
                tabsContent.replace(tabRegex, (_, title: string, content: string) => {
                    tabs.push({ title, content });
                    return _;
                });

                for (let tab of tabs) {
                    tabsElm += `<i-tab tabSheetId="${tab.title}">${tab.title}</i-tab>`;
                }
                for (let tab of tabs) {
                    tabsElm += `<i-tab-sheet id="${tab.title}"><div>${tab.content}</div></i-tab-sheet>`;
                }

                tabsElm += '</i-tabs>';
                return tabsElm;
            });
        }

        if (anchorRegex.test(content)) {
            content = content.replace(anchorRegex, (_: string, href: string, text: string) => {
                if (href.indexOf(window.location.host) < 0) return _;
                // if(href.indexOf('.md') < 0) return _;
                const slug = this.docsPaging.currentNode.slug;
                const newSlug = href
                    .substr(href.toLowerCase().lastIndexOf('/') + 1)
                    // @ts-ignore
                    .replaceAll('.md', '')
                    .replaceAll('/readme', '');
                // return `<a onclick="((e) => {console.log(e);e.preventDefault();window.history.pushState('${slug}/${newSlug}', 'Title', '/${slug}/${newSlug}')})()">${text}</a>`;
                return `<a class="internal-link" slug="${slug}/${newSlug}">${text}</a>`;
            });
        }

        return content;
    }

    activeNode(target: any, event?: Event) {
        const treeNodes = Array.from(document.querySelectorAll('.right-nav i-tree-view-node')) as TreeNode[];
        treeNodes.forEach((treeNode) => (treeNode.active = false));
        const treeViewNode = target as TreeNode;
        treeViewNode.active = true;
        if (event?.type === 'click') {
            // document.querySelector(`#${treeViewNode.id}`)?.scrollIntoView({
            //     behavior: 'smooth',
            // });
            const node: any = document.querySelector(`#${treeViewNode.id}`);
            window.scrollTo(0, node.offsetTop - 100);
        }
    }

    activeRightNodeOnScroll() {
        const passedAnchor = this.rightNavAnchors.reduce((acc: any, id: any) => {
            const elementTarget = document.getElementById(id);
            if (elementTarget)
                if (window.scrollY > elementTarget.offsetTop + elementTarget.offsetHeight) {
                    acc.push(id);
                }
            return acc;
        }, []);

        const treeNode = document.querySelector(`.right-nav #${passedAnchor[passedAnchor.length - 1]}`);
        if (treeNode) this.activeNode(treeNode);
    }

    bindEvents() {
        window.addEventListener('popstate', async (e) => {
            await this.loadPage();
            await this.sleep(100);
            this.setActiveNav();
            const navigator = document.querySelector('#docsNavigator');
            if (navigator) navigator.classList.remove('show');
            await this.loadLib();
        });

        window.addEventListener('scroll', () => {
            this.activeRightNodeOnScroll();
        });
    }

    setActiveNav() {
        // setTimeout(() => {
        //     let treeView: TreeView = this.docsNavigator.treeView;
        //     console.log('hash', this.hash)
        //     console.log('treeview items', treeView.items)
        //     treeView.items.map((v) => {
        //         console.log(v.tag.slug)
        //     })
        // }, 500)
        // const currentActiveNode = document.querySelector('i-tree-view-node.active');
        // if (currentActiveNode) currentActiveNode.classList.remove('active');
        // const activeNode = document.querySelector('i-tree-view-node[slug="' + (this.hash || 'README') + '"]');
        // if (activeNode) {
        //     activeNode.classList.add('active');
        //     if (
        //         activeNode.classList.contains('level-1') &&
        //         activeNode.parentNode &&
        //         activeNode.parentNode.parentNode &&
        //         activeNode.parentNode.parentNode.children[0]
        //     ) {
        //         const input: any = activeNode.parentNode.parentNode.children[0];
        //         input.checked = true;
        //     }
        // }
    }

    async init() {
        super.init();
        this.hljs = await this.loadLib();
        if (this.forceUpdate) {
            // Remove all scbook keys from localStorage
            for (let keys in localStorage) {
                if (keys.indexOf('$$scbook') >= 0) localStorage.removeItem(keys);
            }
            window.localStorage.setItem('$$scbook_entrypoint', this.entrypoint);
        }
        await this.docsHeader.loadHeader(this.entrypoint);
        await this.loadPage();
        this.bindEvents();
        this.setActiveNav();
        await this.loadLib();
    }

    async loadLib() {
        return new Promise((resolve, reject) => {
            RequireJS.require([`highlightjs/app.bundle`], (hljs: any) => {
                // console.log('hljs.highlightAll')
                // hljs.highlightAll();
                resolve(hljs);
            });
        });
    }

    // async buildSearchIndex(forceUpdate?: boolean) {
    //     // for (let node of this.flatTree) {
    //     //     await this.loadFile(node, forceUpdate);
    //     // }
    //     let node = this.flatTree.find((node) => {
    //         return node.slug === this.hash;
    //     });
    //     if (!node) {
    //         node = this.flatTree.find((node) => {
    //             return !!node.file;
    //         });
    //     }
    //     if (node) await this.loadFile(node, forceUpdate);
    // }

    // async loadMarkdownFromIPFS(file: string, slug: string) {
    //     let text = '';
    //     this.showSpinner();
    //     this.retryLoadFile(`${this.entrypoint}/${file}`).then((result) => {
    //         if (result.ok) {
    //             text = await result.text();
    //             window.localStorage.setItem(`$$scbook_${slug}`, text);
    //         }
    //     });
    //     this.hideSpinner();
    // }

    async loadPage() {
        this.isPageLoading = true;
        await this.loadMenu();
        this.loadContent(this.currentNode.tag.file, this.currentNode.tag.slug).then(async () => {
            const contentElm = document.querySelector('i-panel.docs-module i-panel.content') as HTMLElement;
            if (!contentElm) return;
            this.docsPaging.currentNode = this.currentNode;
            const md = await this.mdViewer.load(this.currentNode.text);
            const processedMd = await this.processGitbook(md, `${this.currentNode.slug}.sclink`);
            this.mdViewer.beforeRender(processedMd);
            await this.sleep(200);
            this.addBtnEvent();
            if(this.hljs)
                this.hljs.highlightAll();
            for (const ref of document.querySelectorAll('a.internal-link')) {
                ref.addEventListener('click', (e) => {
                    e.preventDefault();
                    const slug = ref.getAttribute('slug');
                    window.history.pushState(slug, 'Title', `/${slug}`);
                    window.dispatchEvent(new Event('popstate'));
                });
            }
            if (this.isPageLoading == true) {
                setTimeout(() => {
                    const h1 = this.querySelector('i-markdown h1:first-child');
                    if (h1) this.mdViewer.insertBefore(this.createElement('hr'), h1.nextSibling);
                }, 5);
                this.isPageLoading = false;
            }
            this.loadRightNav();

        });
    }

    // async loadHeader() {
    //     return new Promise(async(resolve, reject) => {
    //         const response = await this.retryLoadFile(`${this.entrypoint}/HEADER.md`);
    //         const text = await response.text();
    //
    //     })
    // }

    processMenu(menuText: string, trimSpace = 0, space = 2) {
        return new Promise<TreeNode[]>(async (resolve, reject) => {
            let dataArr = menuText.split('\n');
            const beginWithAsteriskReg = /^[\s]*\*/;

            dataArr = dataArr.reduce((acc, str) => {
                if (beginWithAsteriskReg.test(str)) {
                    str = str.slice(trimSpace);
                    acc.push(str);
                }
                return acc;
            }, [] as any[]);

            let result: any[] = [];
            let indexes = [0];
            let lastLevel = -1;
            const spaceReg = /^\s*/;
            const captionReg = /\[(.*?)\]/;
            const fileReg = /\((.*?)\)/;

            let id = 1;
            for (let item of dataArr) {
                const level = item.match(spaceReg)![0].length / space;
                const caption = item?.match(captionReg)![1];
                const file = item?.match(fileReg)![1];
                const slug = file.replace('.md', '').toLowerCase().replace('/readme', '');

                if (level === 0) {
                    result.push({
                        id: ++id,
                        caption,
                        file,
                        slug,
                        expanded: true,
                        tag: { file, slug },
                    });
                    if (lastLevel >= 0) {
                        indexes.length = 1;
                        indexes[0]++;
                    }
                    lastLevel = 0;
                }

                if (level > 0) {
                    indexes[level] >= 0 ? indexes[level]++ : (indexes[level] = 0);
                    indexes.length = level + 1;
                    lastLevel = level;

                    let item: any = {};
                    for (const [i, index] of indexes.entries()) {
                        if (Object.keys(item).length === 0) {
                            item = result[index];
                        } else {
                            if (!item.hasOwnProperty('children')) {
                                item['children'] = [
                                    {
                                        id: ++id,
                                        caption,
                                        file,
                                        slug,
                                        expanded: true,
                                        tag: { file, slug },
                                    },
                                ];
                            } else {
                                if (i === indexes.length - 1) {
                                    item.children.push({
                                        id: ++id,
                                        caption,
                                        file,
                                        slug,
                                        expanded: true,
                                        tag: { file, slug },
                                    });
                                }
                                item = item['children'][index];
                            }
                        }
                    }
                }
            }
            resolve(result);
        });
    }

    async loadMenu() {
        return new Promise(async (resolve, reject) => {
            let menuText: any = '';
            if (this.forceUpdate || !window.localStorage?.getItem('$$scbook_menu')) {
                const response = await this.retryLoadFile(`${this.entrypoint}/SUMMARY.md`);
                menuText = await response.text();
                window.localStorage?.setItem(`$$scbook_menu`, menuText);
            } else {
                menuText = window.localStorage?.getItem('$$scbook_menu');
            }

            this.processMenu(menuText).then((treeData) => {
                this.treeData = treeData;
                if (!this.docsNavigator.treeData) {
                    this.docsNavigator.treeData = this.treeData;
                }
                this.flatTree = this.flattenTree(this.treeData);
                this.docsPaging.flatTree = this.flatTree;
                this.docsHeader.menu = this.flatTree;
            });

            resolve(menuText);
        });
    }

    async loadContent(file: string, slug: string) {
        console.log('loadContent', file);
        return new Promise(async (resolve, reject) => {
            let text: any = '';
            if (this.forceUpdate || !window.localStorage?.getItem(`$$scbook_${slug}`)) {
                const response = await this.retryLoadFile(`${this.entrypoint}/${file}`);
                text = await response.text();
                window.localStorage?.setItem(`$$scbook_${slug}`, text);
            } else {
                text = window.localStorage?.getItem(`$$scbook_${slug}`);
            }

            // Replace root file from
            const regex = /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g;
            const linkRegex = /\*\s*?\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g;

            text = text.replace(regex, (string: string, filename: string) => {
                if (string.indexOf('http://') >= 0 || string.indexOf('https://') >= 0) return string;
                const newFileName = `${this.entrypoint}/${encodeURIComponent(
                    filename.replace('/..//g', '').replace('/\\/g', '')
                )}`;
                return string.replace(filename, newFileName);
            });
            // Link
            text = text.replace(linkRegex, (string: string, filename: string) => {
                if (string.indexOf('http://') >= 0 || string.indexOf('https://') >= 0 || string.indexOf('.md') < 0)
                    return string;
                const newFileName = `${window.location.href}/${encodeURIComponent(
                    filename.replace('/\\/g', '').replace('.md', '')
                )}`;
                return string.replace(filename, newFileName);
            });
            this.currentNode.text = text;

            const typescriptRegex = new RegExp(/\`\`\`typescript\((.*?)\)(.*?)\`\`\`/gis);
            const isTS = typescriptRegex.test(text);
            const rightNav = document.querySelector('.right-nav');
            const runFrame = document.querySelector('#runFrame');
            if (isTS) {
                rightNav?.classList.remove('show');
                runFrame?.classList.add('show');
            } else {
                rightNav?.classList.add('show');
                runFrame?.classList.remove('show');
            }

            resolve(text);
        });
    }

    loadRightNav() {
        let toc = '';
        let level = 0;
        this.rightNavAnchors = [];
        const content = document.querySelector('.docs-container .content');
        if (content) {
            // @ts-ignore
            const a = content.innerHTML.replaceAll('<strong>', '').replaceAll('</strong>', '');
            // @ts-ignore
            a.replace(/<h([\d])(.*)>([^<]+)<\/h([\d])>/gi, (str, openLevel, temp, titleText, closeLevel) => {
                if (openLevel != closeLevel || openLevel == 1) {
                    return str;
                }

                if (openLevel > level) {
                    toc += new Array(openLevel - level + 1).join('<i-tree-view>');
                } else if (openLevel < level) {
                    toc += new Array(level - openLevel + 1).join('</i-tree-view>');
                }

                level = parseInt(openLevel);

                let anchor = titleText.replace(/\W/g, '-').toLowerCase();
                if (anchor[anchor.length - 1] == '-') anchor = anchor.substr(0, anchor.length - 1);
                this.rightNavAnchors.push(anchor);
                toc += `<i-tree-view-node id='${anchor}' caption='${titleText}' useIcon='false' ></i-tree-view-node>`;

                return `<h${openLevel}><a class='anchor' aria-hidden='true' id=' {anchor}'></a>${titleText}</h${closeLevel}>`;
            });
        }

        if (level) {
            toc += new Array(level + 1).join('</i-tree-view>');
        }

        const right = document.querySelector('.right-nav');
        if (right) right.innerHTML = toc;

        const treeNodes = Array.from(document.querySelectorAll('.right-nav i-tree-view-node')) as TreeNode[];
        treeNodes.forEach((treeNode) => (treeNode.onClick = this.activeNode));

        this.activeRightNodeOnScroll();
    }

    // async loadFile(node: any, forceUpdate?: boolean) {
    //     if (!node.file) return;
    //     let text: string;
    //     if (forceUpdate || !window.localStorage || !!!window.localStorage.getItem(`$$scbook_${node.slug}`)) {
    //         const path = `${this.entrypoint}/${node.file}`;
    //         const request = new Request(path);
    //         const result = await fetch(request);
    //         if (result.ok) {
    //             text = await result.text();
    //             window.localStorage.setItem(`$$scbook_${node.slug}`, text);
    //         }
    //     } else {
    //         text = window.localStorage.getItem(`$$scbook_${node.slug}`) || '';
    //     }
    //     // Replace root file from
    //     const regex = /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g;
    //     const linkRegex = /\*\s*?\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g;
    //     // @ts-ignore
    //     text = text.replace(regex, (string, filename) => {
    //         if (string.indexOf('http://') >= 0 || string.indexOf('https://') >= 0) return string;
    //         const newFileName = `${this.entrypoint}/${encodeURIComponent(
    //             filename.replaceAll('../', '').replaceAll('\\', '')
    //         )}`;
    //         return string.replace(filename, newFileName);
    //     });
    //     // Link
    //     text = text.replace(linkRegex, (string, filename) => {
    //         if (string.indexOf('http://') >= 0 || string.indexOf('https://') >= 0 || string.indexOf('.md') < 0)
    //             return string;
    //         const newFileName = `${window.location.href}/${encodeURIComponent(
    //             filename.replaceAll('\\', '').replace('.md', '')
    //         )}`;
    //         return string.replace(filename, newFileName);
    //     });
    //     node.text = text;
    // }

    render() {
        return (
            <i-panel class="docs-module" height="auto" width="100%">
                <i-docs-header id="docsHeader"></i-docs-header>
                <i-icon name="bars" fill="#55f" class="icon" onClick={this.toggleNav}></i-icon>
                <i-panel class="docs-wrapper">
                    <i-docs-navigator id="docsNavigator"></i-docs-navigator>
                    <i-panel class="docs-container">
                        <i-panel class="content">
                        </i-panel>

                        <i-panel class="right-nav"></i-panel>
                        <i-iframe id="runFrame" url="/run.html" width="400px" height="100%"></i-iframe>
                    </i-panel>
                </i-panel>
            </i-panel>
        );
    }

    sleep(time: number) {
        return new Promise((res, rej) => {
            setTimeout(res, time);
        });
    }

    get currentNode() {
        let node = this.flatTree.find((node) => {
            return node.slug === (this.hash === '' ? 'readme' : this.hash);
        });
        if (!node)
            node = this.flatTree.find((node) => {
                return !!node.text;
            });
        return node;
        // return this.docsNavigator.currentNode;
    }

    get hash() {
        return decodeURI(window.location.pathname.substr(1));
    }

    // getLocationHash() {
    //     return decodeURI(window.location.pathname.substr(1));
    // }
}
