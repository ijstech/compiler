import { Styles } from '@ijstech/components';

const Theme = Styles.Theme.ThemeVars as any;

Styles.cssRule('#container', {
  display: 'block',
  backgroundColor: Theme.docs.background,

  $nest: {

    "#toolbar": {
      height: "60px",
      padding: "15px"
    },
    "#btnRun": {
      color: 'white',
      padding: '10px',
      height: '30px'
    },

    '#textareacontainer': {
      float: 'left',
      clear: 'none',
    },

    '#iframecontainer': {
      float: 'left',
      clear: 'none',

      $nest: {
        iframe: {
          width: '100%',
          height: '100%',
        },
      },
    },
  },
});
