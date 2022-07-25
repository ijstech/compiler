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

        '.tabs-content': {
          background: '#252526',
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
      },
    },
  },
})
