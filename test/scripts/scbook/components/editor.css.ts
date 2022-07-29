import { Styles } from '@ijstech/components';

Styles.cssRule('i-docs-editor', {
  display: 'block',

  $nest: {
    '.editor-container': {
      marginRight: 'auto',
      marginLeft: 'auto',
    },

    '.editor-tabs': {
      display: 'block',
      position: 'relative',
      border: '1px solid #d0d7de',
      borderRadius: '6px',

      $nest: {
        '.tabs': {
          backgroundColor: '#f6f8fa',
          borderBottom: '1px solid #d0d7de',
          borderTopLeftRadius: '6px',
          borderTopRightRadius: '6px',
          marginBottom: 0,
          zIndex: 1,

          $nest: {
            'i-tab': {
              display: 'inline-block',
              padding: '12px 16px',
              textDecoration: 'none',
              backgroundColor: 'transparent',
              border: '1px solid transparent',
              borderBottom: 0,
              borderRadius: 0,
              transition: 'color .2s cubic-bezier(0.3, 0, 0.5, 1)',
              cursor: 'pointer',

              $nest: {
                '.tab-link': {
                  display: 'none',
                },

                '&::after': {
                  content: 'none!important',
                },

                'i-label': {
                  marginLeft: '6px',

                  $nest: {
                    div: {
                      fontSize: '14px',
                      lineHeight: '23px',
                      color: '#57606a',
                    },
                  },
                },

                '&.active': {
                  borderTopLeftRadius: '6px',
                  borderTopRightRadius: '6px',
                  backgroundColor: '#fff',
                  borderColor: '#d0d7de',

                  $nest: {
                    '&:first-of-type': {
                      borderColor: 'transparent',
                      borderTopRightRadius: 0,
                      borderRightColor: '#d0d7de',
                    },

                    'i-label': {
                      $nest: {
                        div: {
                          fontWeight: 600,
                          color: '#24292f',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        '#preview': {
          padding: '32px 85px',
        },
      },
    },
  },
});
