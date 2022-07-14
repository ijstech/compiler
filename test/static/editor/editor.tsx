///<amd-module name='code-editor'/>
import {
    application,
    CodeEditor,
    ComboBox,
    customElements,
    Styles,
    Module,
} from '@ijstech/components';

 Styles.Theme.applyTheme(Styles.Theme.darkTheme);
const __dirname = application.currentModuleDir;
export default class CodeEditorModule extends Module {
    private edtCode: CodeEditor

    addLib() {
        // this.edtCode.addLib('@ijstech/components', dts);
    };
    run() {

    };
    init() {
        super.init();
        this.addLib();
    };
    render(): any {
        return (
            <i-panel id='pnlMain' dock='fill'>
                <i-panel height={40} dock='top' padding={{ right: 4 }}>
                    <i-panel dock='left'>
                        <i-button caption="run" height={30} width={40} margin={{ top: 5 }} onClick={this.run}></i-button>
                    </i-panel>
                </i-panel>
                <i-panel id='pnlSidebar' width={40} dock='left' padding={{ left: 4 }}>
                    <i-tabs id="toolbarTabs" vertical activePageIndex={0} dock="fill" class="toolbars">
                        <i-tab
                            data-tooltip="Explorer (Ctrl + Shift + E)"
                            data-placement="right"
                            tabSheetId="tab-folder"
                        // onClick={(source: any, event: Event) => this.onToolbarTab(event, 0)}
                        >
                            <i-image url={`${__dirname}/img/files.svg`} width="20"></i-image>
                        </i-tab>
                        <i-tab
                            data-tooltip="Search (Ctrl + Shift + F)"
                            data-placement="right"
                        >
                            <i-image url={`${__dirname}/img/search.svg`} width="20"></i-image>
                        </i-tab>
                        <i-tab
                            data-tooltip="Source Control (Ctrl + Shift + G) - 1 pending changes"
                            data-placement="right"
                        >
                            <i-image url={`${__dirname}/img/source-control.svg`} width="20"></i-image>
                        </i-tab>
                        <i-tab
                            data-tooltip="Sync"
                            data-placement="right"
                        >
                            <i-icon width={16} height={16} name="sync-alt" fill="#c5c5c5" ></i-icon>
                        </i-tab>
                    </i-tabs>
                </i-panel>
                <i-panel dock='fill' resizer={true}>
                    <i-tabs dock='top' height={40} resizer={true}>
                        <i-tab
                            caption='file1.tsx'
                            data-tooltip="Sync"
                            data-placement="right"
                        >
                        </i-tab>
                        <i-tab
                            caption='file2.tsx'
                            data-tooltip="Sync"
                            data-placement="right"
                        >
                        </i-tab>
                    </i-tabs> 
                    <i-panel id='pnlCode' dock='fill'>
                        <i-code-editor
                            id="edtCode"
                            dock='fill'
                            language='tsx'
                        ></i-code-editor>
                    </i-panel>
                </i-panel>                               
                <i-panel id='pnlPreview' dock='right' width='50%' resizer={true}>

                </i-panel>
            </i-panel>
        );
    };
};