import { CodeEditor, Control, ControlElement, customElements, Markdown, Module } from '@ijstech/components';
import './editor.css';

export interface DocsEditorElement extends ControlElement {}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-docs-editor']: DocsEditorElement;
        }
    }
}

@customElements('i-docs-editor')
export class DocsEditor extends Module {
    private mdEditor: CodeEditor;
    private mdPreviewer: Markdown;

    constructor(parent?: Control, options?: any) {
        super(parent, options);
    }

    onViewPreview() {
        const value = this.mdEditor.value;
        this.mdPreviewer.load(value);
    }

    setValue(value: string) {
        this.mdEditor.value = value;
    }

    async init() {
        super.init();
    }

    render() {
        this.style.width = '100%';
        this.style.height = 'auto';

        return (
            <i-panel class="editor-wrapper">
                <i-panel class="editor-container">
                    <i-tabs class="editor-tabs" width="auto" activePageIndex={0}>
                        <i-tab tabSheetId="edit">
                            <i-image url="../assets/editor/edit.svg" width="28" />
                            <i-label caption="Edit file" />
                        </i-tab>
                        <i-tab tabSheetId="preview" onClick={this.onViewPreview}>
                            <i-image url="../assets/editor/preview.svg" width="28" />
                            <i-label caption="Preview" />
                        </i-tab>

                        <i-tab-sheet id="edit">
                            <i-code-editor
                                id="mdEditor"
                                width="100%"
                                height="646px"
                                language="markdown"
                            ></i-code-editor>
                        </i-tab-sheet>
                        <i-tab-sheet id="preview">
                            <i-markdown id="mdPreviewer"></i-markdown>
                        </i-tab-sheet>
                    </i-tabs>
                </i-panel>
            </i-panel>
        );
    }
}
