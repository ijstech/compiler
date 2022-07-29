import { Styles } from '@ijstech/components';

const Theme = Styles.Theme.ThemeVars as any;

Styles.cssRule('i-module--1', {
  width: '100%!important',
});

Styles.cssRule('i-panel.docs-module', {
  display: 'block',
  backgroundColor: Theme.docs.background,

  $nest: {
    'a.internal-link': {
      cursor: 'pointer',
    },

    hidden: {
      display: 'none',
    },

    'i-markdown': {
      color: 'rgba(59, 69, 78, 1)',

      $nest: {
        p: {
          display: 'block',
          fontSize: '16px',
          lineHeight: '24px',
          overflow: 'hidden',

          $nest: {
            '@media (max-width: 700px)': {
              display: 'block',
            },

            'img:only-child': {
              borderRadius: '5px',
              padding: 0,
            },
          },
        },

        li: {
          $nest: {
            strong: {
              display: 'inline-block',
              paddingBottom: '8px',
            },
          },
        },

        table: {
          border: '1px solid #dfe2e5',

          $nest: {
            td: {
              borderTop: '1px solid #dfe2e5',
            },
          },
        },
      },
    },

    '.docs-module': {
      display: 'block',
    },

    '.docs-wrapper': {
      display: 'flex',
      paddingTop: '70px',
      minHeight: 'calc(100vh - 70px)',
    },

    '#docsNavigator': {
      display: 'none',
      backgroundColor: '#f5f5f5',

      $nest: {
        '@media (min-width: 700px)': {
          display: 'block',
        },
        '&.show': {
          display: 'block',
        },
      },
    },

    '.docs-container': {
      display: 'flex',
      flexGrow: 1,
      flexFlow: 'row nowrap',
      backgroundColor: '#fdfdfd',
      // maxWidth: '1750px',
      width: 'calc(100% - 400px)',
      padding: '0 20px',
      // margin: '0 auto',
      marginLeft: '280px',

      $nest: {
        '@media (max-width: 700px)': {
          padding: '0',
        },

        '#mdViewer': {
          display: 'block',

          $nest: {
            '&.hide': {
              display: 'none',
            },

            '.sc-link': {
              backgroundColor: 'rgba(255,255,255,1.00)',
              boxShadow: '0px 1px 2px rgb(0 0 0 / 12%)',
              border: '1px solid rgba(227,232,237,1.00)',
              borderRadius: '4px',
              padding: '16px',
              cursor: 'pointer',

              $nest: {
                a: {
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                },

                '.sc-link-icon': {
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  flexBasis: 'auto',
                  flexShrink: 0,
                  border: '0 solid black',
                  margin: 0,
                  marginRight: '16px',
                  minHeight: 0,
                  minWidth: 0,
                  padding: 0,

                  $nest: {
                    '.icon-wrapper': {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(245,247,249,1.00)',
                      color: 'rgba(136,153,168,1.00)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                    },
                  },
                },

                '.sc-link-content': {
                  padding: 0,
                  flexShrink: 1,
                  flexGrow: 1,
                  flexBasis: '0%',

                  $nest: {
                    '.info': {
                      display: 'flex',
                      alignItems: 'center',

                      $nest: {
                        'div.title': {
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: 500,
                          color: 'rgba(59,69,78,1.00)',
                        },

                        'div.subtitle': {
                          fontSize: '14px',
                          lineHeight: '22px',
                          fontWeight: 400,
                          color: 'rgba(136,153,168,1.00)',
                          marginLeft: '16px',
                        },
                      },
                    },

                    '.type': {
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: 400,
                      color: 'rgba(136,153,168,1.00)',
                    },
                  },
                },
              },
            },

            '.sc-hint': {
              display: 'flex',
              alignItems: 'stretch',
              borderLeftWidth: '4px',
              borderLeftStyle: 'solid',
              backgroundColor: '#fff',
              borderRadius: '4px',

              $nest: {
                '&.warning': {
                  borderColor: 'rgb(185, 94, 4)',
                },

                '&.danger': {
                  borderColor: 'rgb(211, 61, 61)',
                },

                '&.info': {
                  borderColor: 'rgb(52, 109, 219)',
                },

                '&.success': {
                  borderColor: 'rgb(0, 136, 71)',
                },

                '.sc-hint-icon': {
                  display: 'flex',
                  justifyContent: 'center',
                  width: '48px',
                  paddingTop: '18px',
                },

                '.sc-hint-content': {
                  flex: 1,
                  padding: '16px 24px 16px 0',
                  fontSize: '14px',
                  lineHeight: '22px',
                },
              },
            },

            '.sc-content-ref': {
              paddingBottom: '4px',

              $nest: {
                a: {
                  color: 'rgb(29, 138, 237)',
                  lineHeight: '20px',

                  $nest: {
                    '&:hover': {
                      color: 'rgb(26, 69, 109)',
                      textDecoration: 'underline',
                    },
                  },
                },
              },
            },

            '.sc-tabs': {
              $nest: {
                '.tabs': {
                  marginBottom: 0,
                  borderBottom: 0,
                },

                'i-tab': {
                  textOverflow: 'ellipsis',
                  border: '1px solid rgba(211,220,228,1.00)',
                  borderLeft: 0,
                  backgroundColor: 'rgba(245,247,249,1.00)',
                  padding: '4px 16px',
                  fontSize: '14px',
                  color: 'rgba(136,153,168,1.00)',

                  $nest: {
                    '&.active': {
                      backgroundColor: 'rgba(255,255,255,1.00)',
                      borderBottom: 0,
                      color: 'rgba(59,69,78,1.00)',
                    },

                    '&:first-of-type': {
                      borderLeft: '1px solid rgba(211,220,228,1.00)',
                      borderTopLeftRadius: '4px',
                    },

                    '&:last-of-type': {
                      borderTopRightRadius: '4px',
                    },

                    '.tab-link': {
                      display: 'none',
                    },

                    '&:after': {
                      content: 'none',
                    },
                  },
                },

                'i-tab-sheet': {
                  border: '1px solid rgb(211, 220, 228)',
                  minHeight: 'unset',
                  backgroundColor: 'rgba(255,255,255,1.00)',
                  borderRadius: '4px',
                  borderTopLeftRadius: 0,
                  padding: '24px',
                },
              },
            },

            pre: {
              position: 'relative',

              $nest: {
                'code, code.hljs': {
                  whiteSpace: 'pre-wrap',
                  padding: '26px 16px',
                  fontSize: '12px',
                },
              },
            },

            'pre:hover': {
              $nest: {
                'i-button': {
                  opacity: 1,
                },
              },
            },

            'i-dropdown-button': {
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',

              $nest: {
                button: {
                  border: 0,
                  borderRadius: '0.25rem',
                  minWidth: 0,
                  fontSize: '12px',
                  height: 'unset',
                  lineHeight: 'unset',
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'transparent',
                  color: '#61aeee',

                  $nest: {
                    '&:hover': {
                      color: '#fff',
                      backgroundColor: '#027de7',
                    },
                  },
                },

                '.dropdown': {
                  margin: '0.25rem 0',
                  padding: '0.5rem',
                  width: 'auto',
                  minWidth: '75px',
                  backgroundColor: '#151515',
                },

                'i-dropdown-item': {
                  justifyContent: 'flex-start',
                  opacity: 1,
                  padding: '0 0.5rem',

                  $nest: {
                    '&:hover': {
                      backgroundColor: '#282c34',
                    },

                    li: {
                      fontSize: '12px',
                    },
                  },
                },
              },
            },

            'i-button': {
              opacity: 0,
              position: 'absolute',
              top: '0',
              right: '0.5rem',
              lineHeight: '25px',
              border: 0,
              background: 'rgba(0,0,0,.3)',
              borderRadius: '0.4rem',
              color: '#fff',
              padding: '0rem 0.5rem',
              transition: 'opacity .2s ease-in-out',
              cursor: 'pointer',
            },

            'i-button.edit-btn': {
              right: '8rem',
            },

            'i-button.run-btn': {
              right: '70px',
            },
          },
        },

        '#docsEditor': {
          display: 'block',
          margin: '20px 0',
          opacity: 0,
          height: '0!important',
          visibility: 'hidden',
          overflow: 'hidden',

          $nest: {
            '&.show': {
              opacity: 1,
              height: 'auto!important',
              visibility: 'visible',
            },
          },
        },

        '.content': {
          display: 'block',
          // flex: 1,
          padding: '28px 20px 48px',
          // overflow: 'hidden',
          // overflowY: 'auto',
          width: 'calc(100% - 400px)',

          $nest: {
            '&::-webkit-scrollbar': {
              width: 0,
            },

            'i-markdown > h1': {
              fontWeight: 700,
              $nest: {
                '&:first-child': {
                  marginTop: 0,
                },
              },
            },
          },
        },
      },
    },

    '.icon': {
      position: 'fixed',
      display: 'inline-block',
      width: '20px',
      height: '20px',
      margin: '15px',
      // zIndex: 10000,
    },

    'i-dropdown-button .icon': {
      display: 'none',
    },

    '.anchor': {
      display: 'block',
      position: 'relative',
      top: '-100px',
    },

    '.right-nav': {
      display: 'none',
      position: 'fixed',
      top: '90px',
      right: '20px',
      alignSelf: 'flex-start',
      maxHeight: 'calc(100vh - 120px)',
      margin: 0,
      paddingTop: '10px',
      borderLeft: '1px solid #e0e0e0',

      $nest: {
        '@media (min-width: 1060px)': {
          $nest: {
            '&.show': {
              display: 'block',
            },
          },
        },
      },
    },

    img: {
      maxWidth: '100%',
    },

    '#runFrame': {
      display: 'none',
      position: 'fixed',
      top: '90px',
      right: '30px',
      maxHeight: 'calc(100vh - 120px)',
      margin: 0,
      backgroundColor: '#fff',
      borderRadius: '5px',
      padding: '16px',
      border: '1px solid #ececec',

      $nest: {
        '@media (min-width: 1060px)': {
          $nest: {
            '&.show': {
              display: 'block',
            },
          },
        },
      },
    },

    '#spinner': {
      position: 'relative',
      maxHeight: 'calc(100vh - 80px)',

      $nest: {
        '.i-loading-spinner': {
          background: 'white',
          padding: '40px 20px',
          borderRadius: '6px',
          boxShadow: '1px 1px 8px 1px #bbbbbb',
        },
      },
    },
  },
});
