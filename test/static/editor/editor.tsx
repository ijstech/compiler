import {
  CodeEditor,
  Control,
  Module,
  Panel,
  Switch,
  Styles,
  Tab,
  Tabs,
  TreeView,
  TreeNode,
  Iframe,
  LanguageType,
} from '@ijstech/components'
import { Compiler } from '@ijstech/compiler'
import Samples from './samples'
import './editor.css'

Styles.Theme.applyTheme(Styles.Theme.darkTheme)
const Theme = Styles.Theme.ThemeVars

interface ITreeNodeData {
  fileName: string
  content: string
  editor?: CodeEditor
  tab?: Tab
}

export default class CodeEditorModule extends Module {
  private edtCodeTemp?: CodeEditor
  private tabCodeTemp?: Tab
  private tsEditors: Tabs

  private swPreview: Switch
  private pnlPreview: Panel
  private tvFiles: TreeView
  private ifrPreview: Iframe
  private _compiler: Compiler

  async loadFiles() {
    this.tvFiles.clear()
    let fileNodes: { [idx: string]: TreeNode } = {}
    let self = this

    async function addFileNode(paths: string[]) {
      let name: string = ''
      // let items = fileName.split('/');
      let node: TreeNode | null = null
      for (let i = 0; i < paths.length; i++) {
        name = name + '/' + paths[i]
        if (!fileNodes[name]) {
          node = await self.tvFiles.add(node, paths[i])
          fileNodes[name] = node
        } else node = fileNodes[name]
      }
      return node
    }

    let files = []
    for (let fileName in Samples)
      files.push({
        paths: fileName.split('/'),
        content: Samples[fileName],
      })
    files.sort((item1, item2) => {
      if (item1.paths.length > item2.paths.length) return -1
      else if (item1.paths.length < item2.paths.length) return 1
      else return 0
    })
    for (let i = 0; i < files.length; i++) {
      let node = await addFileNode(files[i].paths)
      if (node)
        node.tag = {
          fileName: files[i].paths.join('/'),
          content: files[i].content,
        }
    }
    console.log('tv', this.tvFiles)
  }

  async fileImporter(
    fileName: string
  ): Promise<{ fileName: string; content: string } | null> {
    if (fileName == '@ijstech/components') {
      let res = await fetch('/dist/lib/components/index.d.ts')
      let content = await res.text()
      CodeEditor.addLib(fileName, content)
      return {
        fileName: 'index.d.ts',
        content: content,
      }
    } else {
      if (Samples[fileName + '.ts']) fileName = fileName + '.ts'
      else if (Samples[fileName + '.tsx']) fileName = Samples[fileName + '.tsx']
      else if (Samples[fileName + '.d.ts'])
        fileName = Samples[fileName + '.d.ts']
      else return null
      CodeEditor.addFile(fileName, Samples[fileName])
      return {
        fileName: fileName,
        content: Samples[fileName],
      }
    }
  }

  handleFileChange(target: Control, event: Event) {
    console.dir(target)
    console.dir(event)
    let fileName: string = target.tag?.fileName
    if (fileName) Samples[fileName] = (target as CodeEditor).value
  }

  handleTogglePreview() {
    this.pnlPreview.visible = this.swPreview.checked
    this.refresh()
  }

  get compiler(): Compiler {
    if (!this._compiler) this._compiler = new Compiler()
    return this._compiler
  }

  private getLanguageByFileName(fileName: string): LanguageType {
    let language: LanguageType = 'txt'
    const extension = fileName.substr(fileName.lastIndexOf('.'))
    switch (extension) {
      case '.txt':
        language = 'txt'
        break
      case '.css':
      case '.sass':
      case '.scss':
      case '.less':
        language = 'css'
        break
      case '.json':
        language = 'json'
        break
      case '.js':
      case '.jsx':
        language = 'javascript'
        break
      case '.ts':
      case '.tsx':
        language = 'typescript'
        break
      case '.sol':
        language = 'solidity'
        break
      case '.md':
        language = 'markdown'
        break
      case '.html':
        language = 'html'
        break
      case '.xml':
        language = 'xml'
        break
      default:
        language = 'txt'
        break
    }
    return language
  }

  async handleTreeViewClick() {
    console.log('handleTreeViewClick')
    if (this.tvFiles.activeItem) {
      let tag: ITreeNodeData = this.tvFiles.activeItem.tag
      if (tag && tag.fileName) {
        if (tag.tab) return tag.tab.active()
        else {
          if (!this.tsEditors.activeTab || !this.tabCodeTemp) {
            this.tabCodeTemp = this.tsEditors.add()
          }
          if (!this.edtCodeTemp) {
            this.edtCodeTemp = new CodeEditor(this.tabCodeTemp)
            this.edtCodeTemp.onChange = this.handleFileChange
            this.edtCodeTemp.dock = 'fill'
          }
          let model = await CodeEditor.getFileModel(tag.fileName)
          if (!model) {
            let deps = await this.compiler.getDependencies(
              tag.fileName,
              tag.content,
              this.fileImporter
            )
            model = await CodeEditor.addFile(tag.fileName, tag.content)
          }
          this.tabCodeTemp.title = tag.fileName
          this.tabCodeTemp.tag = { treeNode: this.tvFiles.activeItem }
          this.edtCodeTemp.tag = { fileName: tag.fileName }
          const language = this.getLanguageByFileName(tag.fileName)
          this.edtCodeTemp.loadContent(tag.content, language, tag.fileName)
          this.tabCodeTemp.caption = tag.fileName.split('/').pop() || 'Untitled'
          this.tabCodeTemp.active()
        }
      }
    }
  }

  async run() {
    await this.ifrPreview.reload()
    let compiler = new Compiler()
    await compiler.addFile(
      'src/index.tsx',
      Samples['src/index.tsx'],
      this.fileImporter
    )
    let result = await compiler.compile()
    console.dir(result)
    let contentWindow = (this.ifrPreview as any).iframeElm.contentWindow
    contentWindow.postMessage(
      JSON.stringify({ script: result.script['index.js'] })
    )
  }

  handleTreeViewDblClick() {
    let nodeData: ITreeNodeData = this.tvFiles.activeItem?.tag
    if (this.tabCodeTemp && nodeData && !nodeData.tab) {
      this.tabCodeTemp.font.style = 'normal'
      nodeData.tab = this.tabCodeTemp
      nodeData.editor = this.edtCodeTemp
      this.tabCodeTemp = undefined
      this.edtCodeTemp = undefined
    }
  }

  handleEditorTabClose(target: Tabs, tab: Tab) {
    if (tab.tag && tab.tag.treeNode) {
      tab.tag.treeNode.tag.tab = null
    }
    if (!this.tsEditors.activeTab) {
      this.tabCodeTemp = undefined
      this.edtCodeTemp = undefined
    }
  }

  reload() {
    this.ifrPreview.reload()
  }

  protected async init() {
    await super.init()
    this.loadFiles()
  }

  render(): any {
    return (
      <i-panel id="pnlMain" dock="fill">
        <i-panel id="header" height={30} dock="top">
          <i-panel dock="right">
            <i-button
              caption="Run"
              icon="caret-right"
              height={30}
              width={100}
              margin={{ top: 5, left: 4 }}
              onClick={this.run}
            ></i-button>
          </i-panel>
          <i-panel dock="right" width={140} padding={{ top: 4, bottom: 4 }}>
            <i-hstack>
              <i-label caption="Preview" width={60}></i-label>
              <i-switch
                checkedText="on"
                uncheckedText="off"
                id="swPreview"
                width={80}
                checked={true}
                onChanged={this.handleTogglePreview}
              ></i-switch>
            </i-hstack>
          </i-panel>
        </i-panel>
        <i-panel id="toolbarTabs" dock="left" width={348} resizer={true}>
          <i-tabs mode="vertical" dock="fill" width={80}>
            <i-tab
              icon={{ name: 'file-code', fill: 'white', width: 20, height: 20 }}
            >
              <i-vstack>
                <i-hstack>
                  <i-label class="toolbar-label" caption="EXPLORER"></i-label>
                </i-hstack>
                <i-hstack>
                  <i-label
                    class="toolbar-workspace"
                    caption="WORKSPACE"
                  ></i-label>
                </i-hstack>
                <i-vstack class="project-sidebar" width="100%">
                  <i-tree-view
                    id="tvFiles"
                    dock="fill"
                    onClick={this.handleTreeViewClick}
                    onDblClick={this.handleTreeViewDblClick}
                  ></i-tree-view>
                </i-vstack>
              </i-vstack>
            </i-tab>
            <i-tab
              icon={{ name: 'search', fill: 'white', width: 20, height: 20 }}
            ></i-tab>
            <i-tab
              icon={{
                name: 'code-branch',
                fill: 'white',
                width: 20,
                height: 20,
              }}
            ></i-tab>
          </i-tabs>
        </i-panel>
        <i-panel id="pnlCode" dock="fill">
          <i-tabs
            id="tsEditors"
            dock="fill"
            draggable={true}
            closable={true}
            onTabClosed={this.handleEditorTabClose}
          >
            <i-tab id="tabCodeTemp" caption="untitled">
              <i-code-editor
                id="edtCodeTemp"
                dock="fill"
                onChange={this.handleFileChange}
              ></i-code-editor>
            </i-tab>
          </i-tabs>
        </i-panel>
        <i-panel id="pnlPreview" dock="right" width="35%" resizer={true}>
          <i-panel dock="top" height={30} padding={{ top: 5, bottom: 5 }}>
            <i-panel dock="left" width={80}>
              <i-button icon="angle-left" width={20} height={20}></i-button>
              <i-button
                icon="angle-right"
                margin={{ left: 4 }}
                width={20}
                height={20}
              ></i-button>
              <i-button
                icon="redo"
                margin={{ left: 4 }}
                width={20}
                height={20}
                onClick={this.reload}
              ></i-button>
            </i-panel>
            <i-input
              dock="fill"
              value="https://localhost"
              margin={{ right: 10 }}
            ></i-input>
          </i-panel>
          <i-iframe id="ifrPreview" url="/launcher.html" dock="fill"></i-iframe>
        </i-panel>
      </i-panel>
    )
  }
}
