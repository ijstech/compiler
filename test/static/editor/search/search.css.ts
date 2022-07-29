import { Styles } from '@ijstech/components'
const Theme = Styles.Theme.ThemeVars

export default Styles.style({
  $nest: {
    '.search-form': {
      $nest: {
        'i-input > input': {
          backgroundColor: 'transparent',
          border: 'none',
          color: Theme.text.primary,
          paddingLeft: 10,
        },
        'i-input > input:focus': {
          border: 'none',
        },
      },
    },
    '.toggle-icon': {
      transition: 'all .3s ease',
      $nest: {
        '.is-opened': {
          transform: 'rotate(90deg)',
        },
      },
    },
    '.condition-group': {
      display: 'flex',
      alignItems: 'center',
      $nest: {
        'i-input, i-checkbox': {
          display: 'flex',
          alignItems: 'center',
        },
        '.i-checkbox_label': {
          paddingLeft: 3,
        },
      },
    },
    'i-checkbox.is-checked .vs-icon': {
      backgroundColor: `${Theme.colors.info.dark}`,
    },
  },
})
