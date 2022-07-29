import { Styles } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

Styles.cssRule('i-docs-navigator', {
  display: 'block',
  flex: '0 0 280px',
  position: 'fixed',
  top: '70px',
  borderRight: '1px solid #ececec',
  overflowY: 'auto',
  zIndex: '9998',
  $nest: {
    '&.hidden': {
      display: 'none',
    },

    '@media (max-width: 700px)': {
      position: 'fixed',
      width: '75% !important',
      left: '0',
      top: '80px',
      background: 'white',
      height: '90% !important',
    },

    'i-panel': {
      height: '100%',
    },

    '.bold': {
      fontWeight: '700',
    },

    '.footer': {
      whiteSpace: 'nowrap',
      position: 'sticky',
      bottom: '0px',
      background: '#ECEEF1',
      height: '50px',
      padding: '10px',

      $nest: {
        img: {
          height: '40px',
          width: 'auto',
          marginRight: '10px',
        },

        'i-label > div': {
          color: 'rgb(136, 153, 168)',
          fontSize: '16px',
        },
      },
    },

    'i-tree-view.i-tree-view': {
      paddingLeft: '24px',
      height: '100%',

      $nest: {
        'i-tree-node': {
          $nest: {
            '.i-tree-node_content': {
              display: 'flex',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0 16px',
              cursor: 'pointer',
              minHeight: '32px',
              border: '1px solid transparent',

              $nest: {
                '&:hover': {
                  backgroundColor: 'rgb(236, 239, 241)',
                  color: 'inherit',
                },

                label: {
                  lineHeight: '22px',
                  padding: '8px 0',
                  color: 'rgba(92, 105, 117, 1.00)',
                },
              },
            },

            '.i-tree-node_children': {
              marginLeft: '16px',

              $nest: {
                'i-tree-node': {
                  borderLeft: '1px solid rgba(211, 220, 228, 1.00)',

                  $nest: {
                    '.i-tree-node_content': {
                      $nest: {
                        label: {
                          color: 'rgba(136, 153, 168, 1.00)',
                        },
                      },
                    },
                  },
                },
              },
            },

            '&:not(.has-children)': {
              $nest: {
                '.i-tree-node_icon': {
                  display: 'block',
                },
              },
            },

            '&.is-checked': {
              $nest: {
                '> .i-tree-node_content': {
                  backgroundColor: 'rgb(236, 239, 241)',
                  color: 'rgba(12, 18, 52, 1.00)',
                },
              },
            },

            '&.active': {
              $nest: {
                '> .i-tree-node_content': {
                  backgroundColor: 'rgba(255, 255, 255, 1.00)',
                  border: '1px solid rgba(211,220,228,1.00)',

                  $nest: {
                    label: {
                      color: 'rgba(12, 18, 52, 1.00)',
                    },
                  },
                },
              },
            },

            '.i-tree-node_label': {
              marginRight: 'auto'
            },
            '.is-right': {
              display: 'none'
            }
          },
        },
      },
    },

    // '.tree-child-node': {
    //   marginLeft: '15px',
    //   borderLeft: '1px solid rgb(211, 220, 228)',
    //   cursor: 'pointer',
    //   $nest: {
    //     'i-tree-view-node.active > label': {
    //       borderLeft: '0px',
    //     },
    //   },
    // },

    // 'i-tree-view > i-tree-node:not(.custom-left).has-children': {
    //   marginLeft: 0,
    // },

    // 'i-tree-view .i-tree-node i-tree-node': {
    //   padding: '0',

    //   $nest: {
    //     '&:not(.custom-left)': {
    //       padding: 0,
    //     },
    //   },
    // },

    '&::-webkit-scrollbar': {
      width: '8px',
    },

    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1' /* color of the tracking area */,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#aaa' /* color of the scroll thumb */,
      borderRadius: '10px' /* roundness of the scroll thumb */,
    },

    '&.hide': {
      maxWidth: 0,
      opacity: 0,
      visibility: 'hidden',
    },

    '.navigator': {
      padding: '16px 0',
    },

    // 'i-tree-node': {
    //   $nest: {
    //     'i-icon': {
    //       marginTop: '15px',
    //       marginRight: '15px',
    //     },

    //     label: {
    //       padding: '8px 20px 8px 20px',
    //     },

    //     '&.active > .i-tree-node_content label': {
    //       backgroundColor: '#FFF',
    //       color: 'rgba(12, 18, 52, 1)',
    //       borderTop: '1px solid rgb(221,220,228)',
    //       borderLeft: '1px solid rgb(221,220,228)',
    //       borderBottom: '1px solid rgb(221,220,228)',
    //     },

    //     '&.menu-title': {
    //       lineHeight: '10px',

    //       $nest: {
    //         '&:hover': {
    //           $nest: {
    //             '& > .i-tree-node_content label': {
    //               color: '#A2A9B9',
    //             },
    //           },
    //         },

    //         '& > .i-tree-node_content label': {
    //           color: '#A2A9B9',
    //           fontSize: '14px',
    //           fontWeight: 500,
    //           marginTop: '20px',
    //           textTransform: 'uppercase',
    //           cursor: 'auto',
    //           lineHeight: '25px',
    //         },
    //       },
    //     },

    //     '&:not(.custom-left)': {
    //       $nest: {
    //         '&:before': {
    //           content: 'none',
    //         },

    //         '&:last-of-type:before': {
    //           content: 'none',
    //         },

    //         '.i-tree-node_label:after': {
    //           content: 'none',
    //         },
    //       },
    //     },
    //   },
    // },

    // 'i-tree-node.level-0': {
    //   lineHeight: '10px',

    //   $nest: {
    //     '> .i-tree-node_content label': {
    //       color: 'rgba(92, 105, 117, 1)',
    //       fontSize: '15px',
    //       fontWeight: 400,
    //       lineHeight: '25px',
    //       transition: 'color .3s',

    //       $nest: {
    //         '&:hover': {
    //           color: 'rgba(12, 18, 52, 1)',
    //           background: 'rgb(236, 239, 241)',
    //         },
    //       },
    //     },
    //   },
    // },

    // 'i-tree-node.level-1': {
    //   lineHeight: '10px',

    //   $nest: {
    //     '> .i-tree-node_content label': {
    //       color: 'rgba(136, 153, 168, 1)',
    //       fontSize: '14px',
    //       fontWeight: 400,
    //       transition: 'color .3s',
    //       lineHeight: '25px',

    //       $nest: {
    //         '&:hover': {
    //           color: '#55f',
    //         },
    //       },
    //     },
    //   },
    // },

    // 'i-tree-node.level-2': {
    //   lineHeight: '10px',

    //   $nest: {
    //     '> .i-tree-node_content label': {
    //       color: 'rgba(136, 153, 168, 1)',
    //       fontSize: '14px',
    //       fontWeight: 400,
    //       transition: 'color .3s',
    //       lineHeight: '25px',
    //     },
    //   },
    // },
  },
});
