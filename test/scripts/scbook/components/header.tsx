import {
    Control,
    ControlElement,
    customElements,
    IMenuItem,
    Module,
    Styles,
    Switch,
    LibPath,
    RequireJS,
    Image,
} from '@ijstech/components';
import { Menu } from '@ijstech/*menu/src/menu';
import { Label } from '@ijstech/*label/src/label';
import './header.css';

import { Search } from './search';
export { Search } from './search';

export interface DocsHeaderElement extends ControlElement {
    onClickEdit?: any;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-docs-header']: DocsHeaderElement;
        }
    }
}

const menusJson: IMenuItem[] = [
    {
        caption: 'Swap',
        href: 'https://www.openswap.xyz/#/swap',
    },
    {
        caption: 'Pool',
        href: 'https://www.openswap.xyz/#/pool',
    },
    {
        caption: 'Earn',
        href: 'https://www.openswap.xyz/#/earn',
    },
    {
        caption: 'Community',
        href: 'https://t.me/openswapdex',
    },
];

const moonIcon =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="%23fff" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>';
const sunIcon =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="%23fff" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>';

@customElements('i-docs-header')
export class DocsHeader extends Module {
    private searchBar: Search;
    private btnChangeTheme: Switch;
    private _menu: any[];
    private imgLogo: Image;
    private menuItem: IMenuItem[] = [];
    private scbookMenu: Menu;
    private logoAltText: string;
    private logoText: Label;
    private searchIndex: any[];

    constructor(parent: Control, options: any) {
        super();
    }

    get menu() {
        return this._menu;
    }

    set menu(value: any[]) {
        this._menu = value;
        if (this._menu && this._menu.length) {
            RequireJS.require([`${LibPath}lib/marked/marked.umd.js`], async (marked: any) => {
                const acc: any[] = [];
                for (const item of this._menu) {
                    if (item.text) {
                        // const markdown = await this.loadMarkdown(
                        //   `./dist/markdown/${item.file}`
                        // )
                        const htmlText: string = marked.parse(item.text);

                        /**
                         * <h[\d].*?> : detect the open tag
                         * ([^<]+) : group and catch the subTitle
                         * <\/h[\d]> : detect the close tag
                         * ([\s\S]*?) : group and catch the paragraph ungreedy
                         * (?=(?:<h[\d].*?>|$)) : detect the end point of paragraph
                         */
                        htmlText.replace(
                            /<h[\d].*?>([^<]+)<\/h[\d]>([\s\S]*?)(?=(?:<h[\d].*?>|$))/gi,
                            (str, subTitle, paragraph) => {
                                let cloneItem = Object.assign({}, item);
                                cloneItem.subTitle = subTitle;
                                const paraDom = document.createElement('div');
                                paraDom.innerHTML = paragraph;
                                cloneItem.paragraph = paraDom.innerText.replace(/\n/g, '');
                                if (cloneItem.subTitle && cloneItem.paragraph) acc.push(cloneItem);
                                return str;
                            }
                        );
                    }
                }
                let keys: string[] = [];
                // if (acc && acc.length > 0) keys = Object.keys(acc[0]);
                // console.log('acc', acc)
                let id = 0;
                for (const index of this.searchIndex) {
                    index['slug'] = index['slug'].replace('.md', '').toLowerCase().replace('/readme', '');
                    index['id'] = ++id;
                }
                this.searchBar.buildIndex(this.searchIndex, ['title', 'text'], ['title', 'text', 'slug']);

                console.log('build index search index', this.searchIndex);
                console.log('keys', keys);
            });
        }
    }

    private async loadSearchIndex(entrypoint: string) {
        const request = new Request(`${entrypoint}/.scbook/searchindex.json`);
        const response = await fetch(request);
        const searchIndex = await response.json();
        this.searchIndex = searchIndex;
        return searchIndex;
    }

    private async loadMarkdown(src: string): Promise<string> {
        const mdRequest = new Request(src, {
            headers: new Headers({ accept: 'application/vnd.github.v3.raw' }),
        });
        const response = await fetch(mdRequest);
        if (!response.ok) return '# There was error with your response, please check the details and try again';
        return response.text();
    }

    btnChangeThemeClick(target: Control, event: Event) {
        if (this.btnChangeTheme.checked) {
            this.btnChangeTheme.checked = false;
            Styles.Theme.applyTheme(Styles.Theme.defaultTheme);
        } else {
            this.btnChangeTheme.checked = true;
            Styles.Theme.applyTheme(Styles.Theme.darkTheme);
        }
    }

    async init() {
        super.init();
    }

    async checkLogoExists(entrypoint: string, logoPath: string) {
        if (logoPath.indexOf('https://') >= 0 || logoPath.indexOf('http://') >= 0) {
            this.imgLogo.url = logoPath;
            return;
        }
        if (logoPath) {
            const request = new Request(`${entrypoint}/${logoPath}`);
            const response = await fetch(request);
            if (!response.ok) {
                this.imgLogo.classList.add('hidden');
                this.logoText.classList.remove('hidden');
            } else this.imgLogo.url = `${entrypoint}/${logoPath}`;
        } else {
            this.imgLogo.classList.add('hidden');
            this.logoText.classList.remove('hidden');
        }
    }

    async loadFile(path: string): Promise<Response> {
        return new Promise((resolve, reject) => {
            const load = async (p: string) => {
                try {
                    const request = new Request(path);
                    const response = await fetch(request);
                    if (response.ok) {
                        resolve(response);
                    } else if (response.status == 404) {
                        resolve(response);
                    } else {
                        setTimeout(() => {
                            load(p);
                        }, 5000);
                    }
                } catch (e) {
                    setTimeout(() => {
                        load(p);
                    }, 5000);
                }
            };
            load(path);
        });
    }

    async loadHeader(entrypoint: string, forceUpdate?: boolean) {
        let header;
        const KEY = '$$scbook_header';
        if (!forceUpdate) {
            if (window.localStorage) {
                header = localStorage.getItem(KEY);
            }
        }
        if (forceUpdate || !header) {
            try {
                // const request = new Request(`${entrypoint}/HEADER.md`);
                // const response = await fetch(request);
                const response = await this.loadFile(`${entrypoint}/HEADER.md`);
                if (response.ok) {
                    header = await response.text();
                    if (window.localStorage) {
                        window.localStorage.setItem(KEY, header);
                    }
                }
            } catch (err) {}
        }
        const menu = [];
        if (header) {
            for (const line of header.split('\n')) {
                if (line.trim().indexOf('#') == 0) {
                    // Logo alternative text
                    const logoData = getData(line);
                    let [logoTitle, logoPath] = logoData;
                    this.checkLogoExists(entrypoint, logoPath);
                    this.logoText.caption = logoTitle;
                    continue;
                }
                const data = getData(line);
                const [title, link] = data;
                let item: IMenuItem = {
                    caption: '',
                };
                if (title) {
                    item.caption = title;
                    if (link) item.href = link;
                    menu.push(item);
                }
            }
        }
        this.menuItem = menu;
        this.scbookMenu.items = menu;

        // Load search index
        await this.loadSearchIndex(entrypoint);

        function getData(str: string) {
            return [
                str.substr(str.indexOf('[') + 1, str.indexOf(']') - (str.indexOf('[') + 1)).trim(),
                str.substr(str.indexOf('(') + 1, str.indexOf(')') - (str.indexOf('(') + 1)).trim(),
            ];
        }
    }

    toggleMenu() {
        const navigator = document.querySelector('#docsNavigator');
        if (navigator) {
            navigator.classList.contains('show') ? navigator.classList.remove('show') : navigator.classList.add('show');
        }
    }

    toggleEditMode() {
        const editor = document.querySelector('#docsEditor');
        const mdViewer = document.querySelector('#mdViewer');
        if (editor) {
            if (editor.classList.contains('show')) {
                editor.classList.remove('show');
                mdViewer?.classList.remove('hide');
            } else {
                editor.classList.add('show');
                mdViewer?.classList.add('hide');
            }
        }
    }

    render() {
        this.style.width = '100%';
        this.style.height = 'auto';

        return (
            <i-panel class="header">
                <i-panel class="container">
                    <i-label id="logoText" class="heading hidden"></i-label>
                    <i-image id="imgLogo" class="logo"></i-image>
                    <i-panel id="btnMenu" onClick={this.toggleMenu}>
                        <i-icon name="bars" fill="#fff"></i-icon>
                    </i-panel>
                    <i-menu id="scbookMenu" items={this.menuItem}></i-menu>
                    <i-panel id="btnEdit" onClick={this.toggleEditMode} class="hidden">
                        <i-icon name="pencil-alt" fill="#fff"></i-icon>
                    </i-panel>
                    <i-panel class="search">
                        <i-search id="searchBar"></i-search>
                        <i-switch
                            id="btnChangeTheme"
                            checkedThumbColor="#fff"
                            uncheckedThumbColor="#fff"
                            checkedThumbIcon={moonIcon}
                            uncheckedThumbIcon={sunIcon}
                            checkedTrackColor="#070707"
                            uncheckedTrackColor="#c5c5c5"
                            onClick={this.btnChangeThemeClick}
                        ></i-switch>
                    </i-panel>
                </i-panel>
            </i-panel>
        );
    }
}
