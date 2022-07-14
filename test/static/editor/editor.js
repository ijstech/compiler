define("code-editor", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    components_1.Styles.Theme.applyTheme(components_1.Styles.Theme.darkTheme);
    const __dirname = components_1.application.currentModuleDir;
    class CodeEditorModule extends components_1.Module {
        addLib() {
        }
        ;
        run() {
        }
        ;
        init() {
            super.init();
            this.addLib();
        }
        ;
        render() {
            return (this.$render("i-panel", { id: 'pnlMain', dock: 'fill' },
                this.$render("i-panel", { height: 40, dock: 'top', padding: { right: 4 } },
                    this.$render("i-panel", { dock: 'left' },
                        this.$render("i-button", { caption: "run", height: 30, width: 40, margin: { top: 5 }, onClick: this.run }))),
                this.$render("i-panel", { id: 'pnlSidebar', width: 40, dock: 'left', padding: { left: 4 } },
                    this.$render("i-tabs", { id: "toolbarTabs", vertical: true, activePageIndex: 0, dock: "fill", class: "toolbars" },
                        this.$render("i-tab", { "data-tooltip": "Explorer (Ctrl + Shift + E)", "data-placement": "right", tabSheetId: "tab-folder" },
                            this.$render("i-image", { url: `${__dirname}/img/files.svg`, width: "20" })),
                        this.$render("i-tab", { "data-tooltip": "Search (Ctrl + Shift + F)", "data-placement": "right" },
                            this.$render("i-image", { url: `${__dirname}/img/search.svg`, width: "20" })),
                        this.$render("i-tab", { "data-tooltip": "Source Control (Ctrl + Shift + G) - 1 pending changes", "data-placement": "right" },
                            this.$render("i-image", { url: `${__dirname}/img/source-control.svg`, width: "20" })),
                        this.$render("i-tab", { "data-tooltip": "Sync", "data-placement": "right" },
                            this.$render("i-icon", { width: 16, height: 16, name: "sync-alt", fill: "#c5c5c5" })))),
                this.$render("i-panel", { dock: 'fill', resizer: true },
                    this.$render("i-tabs", { dock: 'top', height: 40, resizer: true },
                        this.$render("i-tab", { caption: 'file1.tsx', "data-tooltip": "Sync", "data-placement": "right" }),
                        this.$render("i-tab", { caption: 'file2.tsx', "data-tooltip": "Sync", "data-placement": "right" })),
                    this.$render("i-panel", { id: 'pnlCode', dock: 'fill' },
                        this.$render("i-code-editor", { id: "edtCode", dock: 'fill', language: 'tsx' }))),
                this.$render("i-panel", { id: 'pnlPreview', dock: 'right', width: '50%', resizer: true })));
        }
        ;
    }
    exports.default = CodeEditorModule;
    ;
});
