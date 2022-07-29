import { Styles } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

Styles.cssRule('i-paging', {
  $nest: {
    '.btnPaging': {
      display: 'inline-block',
      boxShadow: '0px 1px 2px rgb(0 0 0 / 12%)',
      border: '1px solid #EEE',
      padding: '16px',
      cursor: 'pointer',
      $nest: {
        '&.hidden': {
          display: 'none',
        },
        'i-label': {
          display: 'block',
          lineHeight: '25px',
        },
        '&.prev': {
          width: '48%',
          marginRight: '8px',
          $nest: {
            'i-icon': {
              float: 'left',
            },
            'i-panel.pager-content': {
              float: 'right',
              $nest: {
                'i-label': {
                  textAlign: 'right',
                },
              },
            },
            '@media (max-width: 700px)': {
              width: '100%',
            },
          },
        },
        '&.next': {
          width: '48%',
          marginLeft: '8px',
          $nest: {
            'i-icon': {
              float: 'right',
            },
            'i-panel.pager-content': {
              float: 'left',
              $nest: {
                'i-label': {
                  textAlign: 'left',
                },
              },
            },
            '@media (max-width: 700px)': {
              width: '100%',
              marginLeft: '0',
            },
          },
        },
        '&.prev-full': {
          width: '100%',
          $nest: {
            'i-icon': {
              float: 'left',
            },
            'i-panel.pager-content': {
              float: 'right',
              $nest: {
                'i-label': {
                  textAlign: 'right',
                },
              },
            },
          },
        },
        '&.next-full': {
          width: '100%',
          $nest: {
            'i-icon': {
              float: 'right',
            },
            'i-panel.pager-content': {
              float: 'left',
              $nest: {
                'i-label': {
                  textAlign: 'left',
                },
              },
            },
          },
        },
        'i-icon': {
          height: '20px',
          width: '20px',
          marginTop: '15px',
        },
        '.pager-content': {
          clear: 'none',
          maxWidth: '90%',
          $nest: {
            '.pager-title1 div': {
              fontSize: '12px',
              fontWeight: '400',
              color: '#8899A8',
            },
            '.pager-title2': {
              whiteSpace: 'nowrap',
              $nest: {
                div: {
                  fontSize: '20px',
                  fontWeight: '500',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'block',
                },
              },
            },
          },
        },
      },
    },
  },
});
