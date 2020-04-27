const plugin = require('tailwindcss/plugin')
const useVars = require('./use-vars')

const {root, varsConfig} = useVars({
  colors: {
    gray: {
      100: '#f8f8f8',
      200: '#e3e4e6',
      300: '#d5d5d5',
      400: '#b1b3b8',
      500: '#909399',
      600: '#82848a',
      700: '#666666',
      800: '#595959',
      900: '#333333',
    },
    red: {
      100: '#fff5f5',
      200: '#fed7d7',
      300: '#feb2b2',
      400: '#fc8181',
      500: '#f56565',
      600: '#e53e3e',
      700: '#c53030',
      800: '#9b2c2c',
      900: '#742a2a',
    },
    green: {
      100: '#f0fff4',
      200: '#c6f6d5',
      300: '#9ae6b4',
      400: '#68d391',
      500: '#48bb78',
      600: '#38a169',
      700: '#2f855a',
      800: '#276749',
      900: '#22543d',
    },
    blue: {
      100: '#e8f3fe',
      200: '#c8e2fd',
      300: '#a7d0fc',
      400: '#64adf9',
      500: '#228af7',
      600: '#1a5cbc',
      700: '#145394',
      800: '#0f3e6f',
      900: '#0a294a',
    },
    orange: {
      500: '#F7B522',
    },
  },
  boxShadow: {
    default: '0 0 8px 0 rgba(0, 0, 0, 0.1)',
  },
}, {colors: 'color'})

module.exports = {
  theme: {
    ...varsConfig,
  },
  plugins: [
    plugin(function ({addComponents}) {
      addComponents({
        ':root': {
          ...root,
        },
      })
    }),
  ],
}
