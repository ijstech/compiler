import { Styles } from '@ijstech/components';
let Theme = Styles.Theme.ThemeVars;

Styles.cssRule('i-search', {
  fontFamily: Theme.typography.fontFamily,
  fontSize: Theme.typography.fontSize,
  position: 'relative',

  $nest: {
    '.search': {
      position: 'relative',
      display: 'inline-block',
      direction: 'ltr',
    },

    'i-icon': {
      position: 'absolute',
      top: '50%',
      left: '10px',
      display: 'inline-block',
      width: '18px',
      height: '18px',
      transform: 'translateY(-50%)',
    },

    input: {
      position: 'relative',
      verticalAlign: 'top',
      height: '2.5rem',
      background: 'none',
      border: '1px solid #c5d1db',
      color: '#28333d',
      fontWeight: 400,
      fontSize: '15px',
      borderRadius: '20px',
      lineHeight: '20px',
      outline: 'none',
      transition: 'width .5s ease',
      width: '170px',
      // responsive
      padding: '12px 8px 8px 38px',

      $nest: {
        '&::placeholder': {
          color: '#28333d',
          opacity: 1,
        },

        '&:focus': {
          width: '220px',
        },
      },
    },

    '.dropdown': {
      display: 'none',
      position: 'absolute',
      top: '100%',
      left: 'auto',
      right: 0,
      zIndex: 100,
      fontSize: '14px',
      lineHeight: '1.2em',
      minWidth: '600px',
      padding: '1rem',
      margin: '6px 0 0',
      border: 'none',
      borderRadius: '1rem',
      boxShadow: '0 4px 16px rgb(0 0 0 / 25%)',
      background: '#fff',

      $nest: {
        '&.show': {
          display: 'block',
        },
      },
    },

    '.suggestion': {
      display: 'table',
      width: '100%',
      whiteSpace: 'normal',
      border: 'none',
      color: '#333',
      cursor: 'pointer',
      overflow: 'hidden',

      $nest: {
        '.header': {
          display: 'block',
          fontSize: '14px',
          fontWeight: 400,
          background: '#ebeff3',
          color: '#28333d',
          borderRadius: '1rem',
          padding: '5px 10px',
        },

        '.column': {
          display: 'table-cell',
          borderRight: '1px solid rgba(57,57,57,.3)',
          color: '#555',
          overflow: 'hidden',
          padding: '5px 7px 5px 5px',
          textAlign: 'right',
          textOverflow: 'ellipsis',
          verticalAlign: 'top',
          width: '135px',
          maxWidth: '135px',
          minWidth: '135px',
        },

        '.content': {
          display: 'table-cell',
          padding: '5px 10px',
          width: '100%',
        },

        '.content-text': {
          display: 'block',
          fontWeight: 600,
        },

        '.content-paragraph-text': {
          display: '-webkit-box',
          '-webkit-line-clamp': 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        },

        '.highlight': {
          color: '#55f',
          padding: 0,
          background: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});
