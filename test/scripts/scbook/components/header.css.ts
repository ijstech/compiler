import { Styles } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

Styles.cssRule('i-docs-header', {
  display: 'block',
  zIndex: '9999',
  $nest: {
    '.hidden': {
      display: 'none !important',
    },
    'i-switch': {
      display: 'none',
    },
    '& > .header': {
      position: 'fixed',
      flexShrink: 0,
      width: '100%',
      height: '70px',
      padding: '8px 0',
      borderBottom: '1px solid #ebeff3',
      zIndex: 9999,
      transform: 'translateZ(0)',
      // backgroundColor: Theme.docs.background,
      backgroundColor: '#151515',
    },

    '.logo': {
      height: '65px',
      padding: '10px 0',
      width: '162px',
      // borderRight: "1px solid #E0E0E0",
      // marginLeft: '20px',
      display: 'none',
      $nest: {
        'img': {
          marginLeft: '20px'
        },
        '@media (min-width: 700px)': {
          display: 'block',
          marginRight: '110px',
        },

        '&::after': {
          content: "''",
          position: 'absolute',
          top: '50%',
          right: '-110px',
          transform: 'translateY(-50%)',
          width: '1px',
          height: '60px',
          backgroundColor: '#fff',
        },
      },
    },

    '#btnMenu': {
      display: 'block',
      position: 'absolute',
      left: 0,
      padding: '20px',
      cursor: 'pointer',

      $nest: {
        '@media (min-width: 700px)': {
          display: 'none',
        },
        svg: {
          height: '20px',
          width: '20px',
        },
      },
    },

    '#btnEdit': {
      display: 'block',
      position: 'absolute',
      right: 0,
      padding: '20px',
      cursor: 'pointer',

      $nest: {
        svg: {
          height: '20px',
          width: '20px',
        },
      },
    },

    '.container': {
      display: 'flex',
      alignItems: 'center',
      flexFlow: 'row nowrap',
      position: 'relative',
      textAlign: 'left',
      // maxWidth: '1750px',
      height: '100%',
      padding: '0 4px',
      margin: '0 auto',
    },

    '.heading': {
      $nest: {
        div: {
          fontSize: '25px',
          fontWeight: 700,
          color: 'white',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          display: 'block',
        },
      },
      fontSize: '15px',
      fontWeight: 700,
      color: 'white',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'block',
    },

    '#logoText': {
      width: '259px',
      borderRight: '1px solid #E0E0E0',
      marginLeft: '20px',
      display: 'none',
      $nest: {
        '@media (min-width: 700px)': {
          display: 'block',
        },
      },
    },

    'i-panel.search': {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
    },

    'i-search': {
      marginRight: '6px',
      $nest: {
        input: {
          backgroundColor: 'rgb(236, 236, 236)',
        },
      },
    },

    '#scbookMenu': {
      margin: '0 20px 0 60px',

      $nest: {
        nav: {
          padding: '20px 20px',

          $nest: {
            a: {
              $nest: {
                '&:hover': {
                  opacity: 1,

                  $nest: {
                    '.title': {
                      color: '#fff',
                    },
                  },
                },
                '.title': {
                  fontSize: '15px',
                  fontWeight: 500,
                  lineHeight: '24px',
                  color: 'rgba(234, 242, 247, 1)',
                },
              },
            },
          },
        },
      },
    },
  },
});
