import { Control, ControlElement, customElements, LibPath, RequireJS, Icon } from '@ijstech/components';
import MiniSearch from './miniSearch';
import './search.css';

export interface SearchElement extends ControlElement {}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-search']: SearchElement;
        }
    }
}

RequireJS.config({
    paths: {
        minisearch: `${LibPath}lib/minisearch`,
    },
});

@customElements('i-search')
export class Search extends Control {
    private wrapperElm: HTMLElement;
    private inputElm: HTMLElement;
    private dropdownElm: HTMLElement;
    private suggestionsElm: HTMLElement[];

    private MiniSearch: any;
    private miniSearch: any;
    private isDropdownShown: boolean = false;
    private _keyword: string = '';

    get keyword() {
        return this._keyword;
    }

    set keyword(value: string) {
        this._keyword = value;
    }

    buildIndex(documents: any[], fields: string[], storeFields?: string[]) {
        this.miniSearch = new this.MiniSearch({
            fields,
            storeFields,
            searchOptions: {
                fuzzy: 0.2,
            },
        });
        this.miniSearch.addAll(documents);
    }

    search(keyword: string) {
        return this.miniSearch.search(keyword).slice(0, 5);
    }

    autoSuggest(keyword: string) {
        return this.miniSearch.autoSuggest(keyword);
    }

    updatePath(slug: string) {
        if (slug) {
            window.history.pushState(slug, 'Title', `/${slug.toLowerCase() === 'readme' ? '' : slug}`);
            window.dispatchEvent(new Event('popstate'));
        }
    }

    private renderSuggestion(data: any[]) {
        data.sort((v1, v2) => v1[0].score >= v2[0].score ? -1 : 1)
        if (data.length) {
            if (!this.dropdownElm) {
                this.dropdownElm = this.createElement('span', this.wrapperElm);
                this.dropdownElm.classList.add('dropdown', 'dataset');
            }

            this.dropdownElm.innerHTML = '';
            const suggestionElm = this.createElement('div', this.dropdownElm);
            suggestionElm.classList.add('suggestion');

            data.map((row: any[]) => {
                // console.log('search row', row)
                const suggestionHeader = this.createElement('div', suggestionElm);
                suggestionHeader.classList.add('header');
                suggestionHeader.innerText = row[0].title;

                row.map((item) => {
                    const suggestionWrapper = this.createElement('div', suggestionElm);
                    suggestionWrapper.classList.add('wrapper');
                    suggestionWrapper.addEventListener('click', () => {
                        this.updatePath(item.slug.toLowerCase());
                        this.dropdownElm.classList.remove('show');
                    });

                    const suggestionColumn = this.createElement('div', suggestionWrapper);
                    suggestionColumn.classList.add('column');

                    const suggestionColumnText = this.createElement('span', suggestionColumn);
                    suggestionColumnText.classList.add('column-text');
                    suggestionColumnText.innerHTML = item.title;

                    const suggestionContent = this.createElement('div', suggestionWrapper);
                    suggestionContent.classList.add('content');

                    const suggestionContentText = this.createElement('span', suggestionContent);
                    suggestionContentText.classList.add('content-text');
                    suggestionContentText.innerHTML = item.title;

                    const suggestionParagraphText = this.createElement('span', suggestionContent);
                    suggestionParagraphText.classList.add('content-paragraph-text');

                    const rgxp = new RegExp('(\\S*.{0,10})?(' + Object.keys(item.match)[0] + ')(.{0,10}\\S*)?', 'ig');
                    // If you want to account for newlines, replace dots `.` with `[\\s\\S]`
                    const results: string[] = [];
                    item.text.replace(rgxp, function (match: any, $1: any, $2: any, $3: any) {
                        results.push(
                            ($1 ? '…' + $1 : '') + "<b class='highlight'>" + $2 + '</b>' + ($3 ? $3 + '…' : '')
                        );
                    });
                    suggestionParagraphText.innerHTML = results.join(' ');
                });
            });

            this.dropdownElm.classList.add('show');
        }
    }

    private async initMiniSearch() {
        return new Promise<void>((resolve, reject) => {
            try {
                RequireJS.require([`minisearch/index.min`], (minisearch: MiniSearch) => {
                    this.MiniSearch = minisearch;
                    resolve();
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    async init() {
        if (!this.wrapperElm) {
            this.wrapperElm = this.createElement('span', this);
            this.wrapperElm.classList.add('search', 'autocomplete');

            const icon = new Icon(this, { name: 'search', fill: '#55f' });
            this.wrapperElm.appendChild(icon);

            this.inputElm = this.createElement('input', this.wrapperElm);
            this.inputElm.setAttribute('placeholder', 'Search');
            this.inputElm.setAttribute('autocomplete', 'off');

            this.inputElm.addEventListener('input', () => {
                const input = document.querySelector('i-search input') as HTMLInputElement;
                const results = this.search(input.value);
                const groupResult = Object.values(
                    results.reduce((acc: any[], result: any) => {
                        acc[result.id] = acc[result.id] || [];
                        acc[result.id].push(result);
                        return acc;
                    }, Object.create(null))
                );
                this.renderSuggestion(groupResult);
            });

            await this.initMiniSearch();
            document.addEventListener('click', (e) => {
                if (!this._enabled) return false;
                if (!this.contains(e.target as HTMLElement)) {
                    // Clicked outside the box
                    if (this.dropdownElm) this.dropdownElm.classList.remove('show');
                }
            });
        }
    }

    static async create(options?: SearchElement, parent?: Control) {
        let component = new this(parent, options);
        await component.init();
        return component;
    }
}
