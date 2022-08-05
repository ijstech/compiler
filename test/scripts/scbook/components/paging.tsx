import {
    Control,
    ControlElement,
    customElements,
    Module,
    Styles,
    Link,
    Label,
    Panel
} from '@ijstech/components'

const Theme = Styles.Theme.ThemeVars
import './paging.css'

export interface DocsPagingElement extends ControlElement {
    // onClose?: any
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-paging']: DocsPagingElement
        }
    }
}

@customElements('i-paging')
export class DocsPaging extends Module {
    private _flatTree: any;
    private _currentNode: any;
    private prevPage: Panel;
    private nextPage: Panel;
    private paging: Panel;
    private labelPrev: Label;
    private labelNext: Label;
        
    set flatTree(value: any) {
        this._flatTree = value;
        if(!this._currentNode && value && value.length > 0) {
            this._currentNode = value[0];
        }
        this.updatePager();
    }

    get flatTree() {
        return this._flatTree;
    }

    set currentNode(value: any) {
        this._currentNode = value;
        this.updatePager();
    }

    get currentNode() {
        return this._currentNode;
    }

    updatePager() {
        let prevNodeIndex = -1, nextNodeIndex = -1;
        if(this._flatTree) {
            this._flatTree.forEach((value: any, index: any) => {
                if(value.slug == this._currentNode.slug){
                    let prevValid = false, nextValid = false;
                    prevNodeIndex = index - 1;
                    nextNodeIndex = index + 1;
                    while(!prevValid && this.flatTree[prevNodeIndex]) {
                        if(this.flatTree[prevNodeIndex].file)
                            prevValid = true;
                        else
                            prevNodeIndex--;
                    }
                    while(!nextValid && this.flatTree[nextNodeIndex]) {
                        if(this.flatTree[nextNodeIndex].file)
                            nextValid = true;
                        else
                            nextNodeIndex++;
                    }
                }
            })
        }
        if(prevNodeIndex >= 0 && nextNodeIndex >= 0 && nextNodeIndex < this._flatTree.length) {
            this.prevPage.classList.remove('prev-full', 'hidden');
            this.prevPage.classList.add('prev');
            this.nextPage.classList.remove('next-full', 'hidden');
            this.nextPage.classList.add('next');
            this.prevPage.hidden = false;
            this.nextPage.hidden = false;
            this.labelPrev.caption = this._flatTree[prevNodeIndex] && this._flatTree[prevNodeIndex].caption || '';
            this.labelNext.caption = this._flatTree[nextNodeIndex] && this._flatTree[nextNodeIndex].caption;
        }
        else if(prevNodeIndex >= 0 && (nextNodeIndex == -1 || nextNodeIndex >= this._flatTree.length)) {
            this.nextPage.classList.add('hidden');
            this.prevPage.classList.remove('prev', 'hidden');
            this.prevPage.classList.add('prev-full');
            this.labelPrev.caption = this._flatTree[prevNodeIndex].caption;
        }
        else if(prevNodeIndex == -1 && nextNodeIndex >= 0) {
            this.prevPage.classList.add('hidden');
            this.nextPage.classList.remove('next', 'hidden');
            this.nextPage.classList.add('next-full');
            this.labelNext.caption = this._flatTree[nextNodeIndex].caption;
        }

    }

    nextPageOnClick() {
        let nextNodeIndex = -1;
        if(this._flatTree && this.currentNode) {
            this._flatTree.forEach((value: any, index: any) => {
                if(value.slug == this._currentNode.slug){
                    let valid = false;
                    nextNodeIndex = index + 1;
                    while(!valid) {
                        if(this.flatTree[nextNodeIndex].file)
                            valid = true;
                        else
                            nextNodeIndex++;
                    }
                }
            });
        }
        const node = this.flatTree[nextNodeIndex];
        this.updatePath(node.slug.toLowerCase() === 'readme' ? '' : node.slug)
        this.scrollToTop();
    }

    prevPageOnClick() {
        let prevNodeIndex = -1;
        if(this._flatTree && this.currentNode) {
            this._flatTree.forEach((value: any, index: any) => {
                if(value.slug == this._currentNode.slug){
                    let valid = false;
                    prevNodeIndex = index - 1;
                    while(!valid) {
                        if(this.flatTree[prevNodeIndex].file)
                            valid = true;
                        else
                            prevNodeIndex--;
                    }
                }
            });
        }
        const node = this.flatTree[prevNodeIndex];
        this.updatePath(node.slug.toLowerCase() === 'readme' ? '' : node.slug)
        this.scrollToTop();
    }

    scrollToTop() {
        window.scrollTo(0,0);
    }

    updatePath(slug: string) {
        window.history.pushState(slug, 'Title', `/${slug}`)
        window.dispatchEvent(new Event('popstate'));
    }

    render() {
        return (
            <i-panel class="paging">
                <i-panel id='prevPage' class='btnPaging prev hidden' onClick={this.prevPageOnClick}>
                    <i-icon name='arrow-left'></i-icon>
                    <i-panel class='pager-content'>
                        <i-label caption='Previous' class='pager-title1'></i-label>
                        <i-label id='labelPrev' class='pager-title2'></i-label>
                    </i-panel>
                </i-panel>
                <i-panel id='nextPage' class='btnPaging next hidden' onClick={this.nextPageOnClick}>
                    <i-icon name='arrow-right'></i-icon>
                    <i-panel class='pager-content'>
                        <i-label caption='Next' class='pager-title1'></i-label>
                        <i-label id='labelNext' class='pager-title2'></i-label>
                    </i-panel>
                </i-panel>
            </i-panel>
        )
    }
}
