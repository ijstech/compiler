import {
  customModule,
  customElements,
  Control,
  ControlElement,
  Module,
  Styles,
  application,
  Input,
  Panel,
  Search,
  Checkbox,
} from '@ijstech/components'
import { IEventBus } from 'src/launcher'
import customStyles from './search.css'

const Theme = Styles.Theme.ThemeVars
const __dirname = application.currentModuleDir
const secondaryLabel = { size: '13px', color: Theme.text.secondary }
const paddingZero = { top: '.1rem', left: 0, bottom: '.1rem', right: 0 }
const SearhType: { [key: string]: any } = {
  'case-sensitive': {
    tooltip: 'Match Case (Alt + C)',
  },
  'whole-word': {
    tooltip: 'Match Whole Word (Alt + W)',
  },
  regex: {
    tooltip: 'Use Regular Expression (Alt + R)',
  },
  book: {
    tooltip: 'Search Only in Open Editors',
  },
  exclude: {
    tooltip: 'Use Exclude Settings and Ignore Files',
  },
}

enum SearchCondition {
  CaseSensitive = 'case-sensitive',
  WholeWord = 'whole-word',
  Regex = 'regex',
}

type ActionType = 'replace' | 'close'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['editor-search']: ControlElement
    }
  }
}

@customModule
@customElements('editor-search')
export class CodeEditorSeach extends Module {
  private replacePanel: Panel
  private fileCondPanel: Panel
  private togglePanel: Panel
  private summaryPanel: Panel
  private resultElm: Panel
  private includeInput: Input
  private searchInput: Input
  private excludeInput: Input
  private searchElm: Search
  private includeCheck: Checkbox
  private excludeCheck: Checkbox
  public onNewSearch: any

  private conditionObj: any = {}
  private resultList: any[] = []

  private $eventBus: IEventBus

  constructor(parent?: Control, options?: any) {
    super()
    this.$eventBus = application.EventBus
  }

  onToggleInput(source: Control) {
    this.replacePanel.visible = !this.replacePanel.visible
    this.replacePanel.visible
      ? source.classList.add('is-opened')
      : source.classList.remove('is-opened')
  }

  onToggleSearch() {
    this.fileCondPanel.visible = !this.fileCondPanel.visible
    if (this.fileCondPanel.visible) {
      this.includeInput.querySelector('input')?.focus()
    } else {
      this.searchInput.querySelector('input')?.focus()
    }
  }

  onChangeSearchCond(key: string, value: any, input: string) {
    this.conditionObj[key] = value
    console.log(this.conditionObj)
    this.renderSummary()
    this.resultElm.classList.remove('is-highlighted')
    this.renderResults()
    ;(this.querySelector(`#${input} > input`) as HTMLElement)?.focus()
  }

  onOpenEdior() {}

  onPreverse() {}

  onReplace() {}

  onNewSearchEditor(source: Control, event: Event) {
    if (typeof this.onNewSearch === 'function') this.onNewSearch()
  }

  renderSummary() {
    this.summaryPanel.innerHTML = ''
    const openLink = (
      <i-label
        caption="Open in editor"
        font={{ size: '13px', color: Theme.colors.info.main }}
        onClick={() => this.onOpenEdior()}
        class="pointer"
      ></i-label>
    )
    this.summaryPanel.appendChild(
      <i-panel>
        <i-label caption="2 results in 1 file" font={secondaryLabel}></i-label>
        {!this.excludeCheck.value ? (
          <i-panel>
            <i-label
              caption=" - exclude settings and ignore files are disabled"
              font={secondaryLabel}
            ></i-label>
            <i-label
              caption="("
              font={secondaryLabel}
              paddingLeft={5}
            ></i-label>
            <i-label
              caption="enable"
              class="pointer"
              font={{ size: '13px', color: Theme.colors.info.main }}
              onClick={() => {
                this.excludeCheck.value = true
                this.excludeInput.querySelector('input')?.focus()
              }}
            ></i-label>
            <i-label
              caption=") -"
              font={secondaryLabel}
              paddingRight={3}
            ></i-label>
            {openLink}
          </i-panel>
        ) : (
          <i-panel>
            <i-label
              caption=") -"
              font={secondaryLabel}
              paddingRight={3}
            ></i-label>
            {openLink}
          </i-panel>
        )}
      </i-panel>
    )
  }

  onAction(event: Event, actionType: ActionType) {
    event.stopImmediatePropagation()
    console.log(actionType)
  }

  renderResultActions(node: any) {
    return (
      <i-hstack gap="5px" horizontalAlignment="end" verticalAlignment="center">
        <i-hstack
          verticalAlignment="center"
          horizontalAlignment="end"
          class="hover-show"
        >
          <i-button
            padding={paddingZero}
            height="auto"
            width="20"
            class="vs-icon"
            onClick={(source: Control, event: Event) =>
              this.onAction(event, 'replace')
            }
          >
            <i-image
              url={`${__dirname}/assets/img/dark/replace-all.svg`}
              width="20"
            ></i-image>
          </i-button>
          <i-button
            padding={paddingZero}
            height="auto"
            width="20"
            class="vs-icon"
            onClick={(source: Control, event: Event) =>
              this.onAction(event, 'close')
            }
          >
            <i-image
              url={`${__dirname}/assets/img/dark/close.svg`}
              width="20"
            ></i-image>
          </i-button>
        </i-hstack>
        <i-label
          caption="0"
          class="badge"
          font={{ size: '14px' }}
          visible={!!node.file}
        ></i-label>
      </i-hstack>
    )
  }

  renderResults() {
    this.resultList = [
      {
        id: '315318962268501191',
        name: `helper.ts <span>ntf/modules/global/utils</span>`,
        file: 'ntf/modules/global/utils/helper.ts',
        children: [
          {
            id: '315318962268501192',
            name: `import moment from "monent`,
          },
          {
            id: '315318962268501193',
            name: 'return moment(fromDate).isSameOrBefore(toDate);',
          },
        ],
      },
      {
        id: '315318962268501194',
        name: `helper.ts <span>ntf/modules/global/utils</span>`,
        file: 'ntf/modules/global/utils/helper.ts',
        children: [
          {
            id: '315318962268501195',
            name: `import moment from "monent`,
          },
          {
            id: '315318962268501196',
            name: 'return moment(fromDate).isSameOrBefore(toDate);',
          },
        ],
      },
    ]
    // this.treeResult.dataSource = {
    //   treeData: this.resultList,
    //   actionRender: this.renderResultActions.bind(this)
    // };
  }

  onRenderCheckbox(source: Control, type: string) {
    const tooltip = SearhType[type].tooltip
    const elm = (
      <i-button padding={paddingZero} height="auto" width="22" class="vs-icon">
        <i-image
          tooltip={{ content: tooltip }}
          data-placement="bottomRight"
          url={`${__dirname}/assets/img/dark/${type}.svg`}
          width="16"
          height="16"
        ></i-image>
      </i-button>
    )
    source.appendChild(elm)
  }

  protected async init() {
    await super.init()
    this.classList.add(customStyles)
    this.searchElm = new Search()
    // this.searchElm.init();
    this.togglePanel.setAttribute('tabindex', '0')
    this.resultElm.setAttribute('tabindex', '1')
  }

  render() {
    return (
      <i-vstack paddingTop={8} class="search-form" width="100%" height="100%">
        <i-hstack
          marginBottom={10}
          paddingLeft={8}
          paddingRight={8}
          horizontalAlignment="space-between"
          verticalAlignment="center"
        >
          <i-label
            caption="SEARCH"
            font={{ size: '12px', color: Theme.text.secondary }}
          ></i-label>
          <i-hstack
            horizontalAlignment="end"
            verticalAlignment="center"
            gap="3px"
          >
            <i-button
              tooltip={{ content: 'Refresh', placement: 'bottomRight' }}
              padding={paddingZero}
              height="auto"
              width="20"
              class="vs-icon"
            >
              <i-image
                url={`${__dirname}/assets/img/dark/refresh.svg`}
                width="16"
                height="16"
              ></i-image>
            </i-button>
            <i-button
              tooltip={{
                content: 'Clear Search Results',
                placement: 'bottomRight',
              }}
              padding={paddingZero}
              height="auto"
              width="20"
              class="vs-icon"
            >
              <i-image
                url={`${__dirname}/assets/img/dark/clear-all.svg`}
                width="16"
                height="16"
              ></i-image>
            </i-button>
            <i-button
              tooltip={{
                content: 'Open New Search Editor',
                placement: 'bottomRight',
              }}
              padding={paddingZero}
              height="auto"
              width="20"
              class="vs-icon"
              onClick={this.onNewSearchEditor}
            >
              <i-image
                url={`${__dirname}/assets/img/dark/new-file.svg`}
                width="16"
                height="16"
              ></i-image>
            </i-button>
            <i-button
              tooltip={{ content: 'Collapse All', placement: 'bottomRight' }}
              padding={paddingZero}
              height="auto"
              width="20"
              class="vs-icon"
            >
              <i-image
                url={`${__dirname}/assets/img/dark/collapse-all.svg`}
                width="16"
                height="16"
              ></i-image>
            </i-button>
          </i-hstack>
        </i-hstack>
        <i-hstack paddingRight={8}>
          <i-hstack
            id="togglePanel"
            verticalAlignment="center"
            width="15px"
            class="toggle-icon is-highlighted"
          >
            <i-icon
              name="chevron-right"
              fill={Theme.text.secondary}
              width="14"
              height="14"
              class="pointer"
              onClick={(source: Control, event: Event) =>
                this.onToggleInput(source)
              }
            ></i-icon>
          </i-hstack>
          <i-vstack gap="5px" width="100%">
            <i-hstack
              id="searchPanel"
              horizontalAlignment="space-between"
              verticalAlignment="center"
              border={{ color: Theme.divider, width: '1px', style: 'solid' }}
              gap="5px"
              paddingRight={5}
              class="is-highlighted"
            >
              <i-input
                id="searchInput"
                width="100%"
                height={30}
                placeholder="Search"
              ></i-input>
              <i-hstack class="condition-group">
                <i-input
                  inputType="checkbox"
                  width="auto"
                  caption="case-sensitive"
                  onRender={(source: Control) =>
                    this.onRenderCheckbox(source, SearchCondition.CaseSensitive)
                  }
                  onChange={(source: Control, checked: boolean) =>
                    this.onChangeSearchCond(
                      SearchCondition.CaseSensitive,
                      checked,
                      'searchInput'
                    )
                  }
                ></i-input>
                <i-input
                  inputType="checkbox"
                  width="auto"
                  caption="whole-word"
                  onRender={(source: Control) =>
                    this.onRenderCheckbox(source, SearchCondition.WholeWord)
                  }
                  onChange={(source: Control, checked: boolean) =>
                    this.onChangeSearchCond(
                      SearchCondition.WholeWord,
                      checked,
                      'searchInput'
                    )
                  }
                ></i-input>
                <i-input
                  inputType="checkbox"
                  width="auto"
                  caption="regex"
                  onRender={(source: Control) =>
                    this.onRenderCheckbox(source, SearchCondition.Regex)
                  }
                  onChange={(source: Control, checked: boolean) =>
                    this.onChangeSearchCond(
                      SearchCondition.Regex,
                      checked,
                      'searchInput'
                    )
                  }
                ></i-input>
              </i-hstack>
            </i-hstack>
            <i-hstack
              id="replacePanel"
              horizontalAlignment="space-between"
              verticalAlignment="center"
              gap="5px"
              visible={false}
            >
              <i-hstack
                gap="5px"
                border={{ color: Theme.divider, width: '1px', style: 'solid' }}
                class="is-highlighted"
                verticalAlignment="center"
                paddingRight={5}
              >
                <i-input
                  id="replaceInput"
                  width="100%"
                  height={30}
                  placeholder="Replace"
                ></i-input>
                <i-button
                  tooltip={{
                    content: 'Preverse Case (Alt + P)',
                    placement: 'bottomRight',
                  }}
                  padding={paddingZero}
                  height="auto"
                  width="22"
                  class="vs-icon"
                  onClick={this.onPreverse}
                >
                  <i-image
                    url={`${__dirname}/assets/img/dark/preserve-case.svg`}
                    width="16"
                    height="16"
                  ></i-image>
                </i-button>
              </i-hstack>
              <i-button
                tooltip={{
                  content: 'Replace All (Ctrl + Alt + Enter)',
                  placement: 'bottomRight',
                }}
                padding={paddingZero}
                height="auto"
                width="22"
                class="vs-icon"
                onClick={this.onReplace}
              >
                <i-image
                  url={`${__dirname}/assets/img/dark/replace-all.svg`}
                  width="16"
                  height="16"
                ></i-image>
              </i-button>
            </i-hstack>
          </i-vstack>
        </i-hstack>
        <i-hstack
          horizontalAlignment="end"
          class="pointer"
          marginBottom={-10}
          paddingRight={8}
        >
          <i-image
            url={`${__dirname}/assets/img/dark/more.svg`}
            width="20"
            onClick={() => this.onToggleSearch()}
          ></i-image>
        </i-hstack>
        <i-vstack id="fileCondPanel" paddingRight={8}>
          <i-vstack marginLeft={15}>
            <i-label
              caption="files to include"
              font={{ size: '12px' }}
            ></i-label>
            <i-hstack
              id="includePanel"
              horizontalAlignment="space-between"
              verticalAlignment="center"
              border={{ color: Theme.divider, width: '1px', style: 'solid' }}
              gap="5px"
              paddingRight={5}
              class="is-highlighted"
            >
              <i-input id="includeInput" width="100%" height={30}></i-input>
              <i-input
                id="includeCheck"
                inputType="checkbox"
                width="auto"
                onChange={() =>
                  this.onChangeSearchCond(
                    'include',
                    this.includeCheck.value,
                    'includeInput'
                  )
                }
                onRender={(source: Control) =>
                  this.onRenderCheckbox(source, 'book')
                }
              ></i-input>
            </i-hstack>
          </i-vstack>
          <i-vstack marginLeft={15}>
            <i-label
              caption="files to exclude"
              font={{ size: '12px' }}
            ></i-label>
            <i-hstack
              horizontalAlignment="space-between"
              verticalAlignment="center"
              border={{ color: Theme.divider, width: '1px', style: 'solid' }}
              gap="5px"
              paddingRight={5}
              class="is-highlighted"
            >
              <i-input id="excludeInput" width="100%" height={30}></i-input>
              <i-input
                id="excludeCheck"
                inputType="checkbox"
                width="auto"
                onChange={() =>
                  this.onChangeSearchCond(
                    'exclude',
                    this.excludeCheck.value,
                    'excludeInput'
                  )
                }
                onRender={(source: Control) =>
                  this.onRenderCheckbox(source, 'exclude')
                }
              ></i-input>
            </i-hstack>
          </i-vstack>
        </i-vstack>
        <i-hstack id="summaryPanel" marginLeft={15} paddingRight={8}></i-hstack>
        <i-vstack height="100%" width="100%" marginTop={10}>
          <i-hstack
            id="resultElm"
            height="100%"
            width="100%"
            class="is-highlighted"
          >
            {/* <portal-code-editor-tree id="treeResult" width="100%" height="100%"></portal-code-editor-tree> */}
          </i-hstack>
        </i-vstack>
      </i-vstack>
    )
  }
}
