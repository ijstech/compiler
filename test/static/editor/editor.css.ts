import { Styles } from '@ijstech/components'

const Theme = Styles.Theme.ThemeVars as any

Styles.cssRule('i-module--1', {
    $nest: {
        '#header': {
            backgroundColor: '#3c3c3c',
        },

        '#toolbarTabs': {
            $nest: {
                '.tabs-nav-wrap': {
                    background: '#333',
                },

                'i-tab': {
                    background: 'transparent',
                    border: 0,
                    borderLeftWidth: '2px',
                    borderLeftStyle: 'solid',
                    borderLeftColor: 'transparent',
                    opacity: 0.65,

                    $nest: {
                        '&:not(.disabled).active': {
                            opacity: 1,
                            backgroundColor: 'transparent',
                            borderLeftColor: '#fff',
                        },

                        '.tab-item': {
                            justifyContent: 'center',
                            width: '48px',
                            height: '48px',
                            padding: 0,
                        },
                    },
                },

                '.tabs-content': {
                    background: '#252526',

                    $nest: {
                        '.toolbar-label': {
                            padding: '0 8px',

                            $nest: {
                                div: {
                                    paddingLeft: '12px',
                                    fontSize: '11px',
                                    color: 'rgb(187, 187, 187)',
                                    lineHeight: '35px',
                                },
                            },
                        },

                        '.toolbar-workspace': {
                            padding: '0 20px',

                            $nest: {
                                div: {
                                    fontSize: '12px',
                                    lineHeight: '22px',
                                    fontWeight: 700,
                                    color: '#ccc',
                                },
                            },
                        },

                        '.project-sidebar': {
                            $nest: {
                                'i-tree-view': {
                                    paddingLeft: '4px',

                                    $nest: {
                                        'i-tree-node': {
                                            paddingLeft: '14px',
                                        },

                                        '.i-tree-node_content': {
                                            lineHeight: '22px',
                                            paddingLeft: 0,
                                        },

                                        '.i-tree-node_label': {
                                            paddingLeft: '4px',
                                            fontSize: '13.5px',
                                            color: '#ccc',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
})
