import { Control, ControlElement, customElements, Module, Styles, TreeView, TreeNode, Icon } from '@ijstech/components';

const Theme = Styles.Theme.ThemeVars;
import './navigator.css';

export interface DocsNavigatorElement extends ControlElement {
    onClose?: any;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-docs-navigator']: DocsNavigatorElement;
        }
    }
}

const slugify = (str: string) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

@customElements('i-docs-navigator')
export class DocsNavigator extends Module {
    private treeElm: HTMLElement;
    private treeView: TreeView;
    private _treeData: any;
    private isNavOpened = true;
    private _currentNode: TreeNode | undefined;

    constructor(parent?: Control, options?: any) {
        // super(parent, options);
        super();
        this.activeNode = this.activeNode.bind(this);
    }

    get treeData() {
        return this._treeData;
    }

    set treeData(value: any) {
        this._treeData = value;
        if (this._treeData) {
            this.renderTree();
        }
    }

    handleActive(parent: TreeView, prevNode?: TreeNode) {
        // const url: string = parent.activeItem?.order || '';
        this._currentNode = parent.activeItem;
        const url: string = parent.activeItem?.tag.slug;
        this.updatePath(url);
    }

    activeNode(target: any, event: Event) {
        const treeNodes = Array.from(document.querySelectorAll('i-tree-view-node')) as TreeNode[];
        treeNodes.forEach((treeNode) => (treeNode.active = false));
        const treeViewNode = target as TreeNode;
        treeViewNode.active = true;
        const slug = treeViewNode.getAttribute('slug');
        this.updatePath(slug);
    }

    updatePath(slug: string) {
        if (slug) {
            window.history.pushState(slug, 'Title', `/${slug.toLowerCase() === 'readme' ? '' : slug}`);
            window.dispatchEvent(new Event('popstate'));
        }
    }

    toggleNav(isNavOpened: boolean) {
        const navElm = document.querySelector('i-docs-navigator') as HTMLElement;
        this.isNavOpened = isNavOpened;
        if (navElm) {
            this.isNavOpened ? navElm.classList.remove('hide') : navElm.classList.add('hide');
        }
    }

    // renderTreeNode(node: any, level: number = 0) {
    //     const emojiRegex =
    //         /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
    //     let treeNode = this.createElement('i-tree-view-node') as TreeNode;
    //     treeNode.setAttribute('caption', node.title);
    //     treeNode.setAttribute('useIcon', 'false');
    //     if (node.slug) treeNode.setAttribute('slug', node.slug);

    //     if (node.file || node.children) {
    //         treeNode.onClick = this.activeNode;
    //         treeNode.classList.add(`level-${level}`);
    //     } else {
    //         treeNode.classList.add('menu-title');
    //     }

    //     if (node.children) {
    //         treeNode.setAttribute('useIconRight', 'true');
    //         treeNode.setAttribute('collapsible', 'true');
    //         treeNode.setAttribute('expanded', 'true');

    //         node.children.map((child: any) => {
    //             let childNode = this.renderTreeNode(child, level + 1);
    //             treeNode.appendChild(childNode);
    //         });
    //     }
    //     // setTimeout(function () {
    //     //     if (treeNode.children && treeNode.children.length > 0) {
    //     //         treeNode.children[0].innerHTML = treeNode.children[0].innerHTML.replace(
    //     //             emojiRegex,
    //     //             (string: string) => {
    //     //                 console.log('----------', string);
    //     //                 return `${string} `;
    //     //             }
    //     //         );
    //     //     }
    //     // }, 10);
    //     return treeNode;
    // }

    async renderTree() {
        if (this.treeData) {
            this.treeView.data = this.treeData;
            this.treeView.onRenderNode = async (treeView: TreeView, node: TreeNode) => {
                const hash = decodeURI(window.location.pathname.substr(1));
                if(node.tag.slug === hash) {
                    this.treeView.activeItem = node;
                    console.log(node.tag.slug, hash, node);
                }
                if (!this._currentNode) this._currentNode = node;
            };
        }
    }

    async init() {
        super.init();
    }

    render() {
        this.style.width = '280px';
        this.style.height = 'calc(100vh - 70px)';
        // this.style.backgroundColor = Theme.colors.primary.light

        return (
            <i-panel>
                <i-panel class="navigator">
                    <i-panel id="tree-view-menu">
                        <i-tree-view
                            id="treeView"
                            data={[]}
                            onActiveChange={this.handleActive}
                            // onLazyLoad={this.handleLazyLoad}
                            // onRenderNode={this.handleRenderNode}
                        ></i-tree-view>
                    </i-panel>
                </i-panel>
                {/*<i-link href="https://secure.ijs.dev">*/}
                {/*    <i-panel id="footer" class="footer">*/}
                {/*        <i-image*/}
                {/*            url="https://ipfs.ijs.dev/ipfs/QmbwHtcePFPUa1hVsKRP1MoaU3jEB6ifaWruFtSBnnggps/assets/sclogo.png"></i-image>*/}
                {/*        <i-label caption="Powered by&nbsp;"></i-label>*/}
                {/*        <i-label caption="Secure Compute" class="bold"></i-label>*/}
                {/*    </i-panel>*/}
                {/*</i-link>*/}
            </i-panel>
        );
    }

    get currentNode(): TreeNode | undefined {
        return this._currentNode;
    }
}
