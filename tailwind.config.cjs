/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    colors: {
      white: '#fff',

      'gray-100': '#F2F2F2',
      'gray-200': '#D9D9D9',
      'gray-300': '#808080',
      'gray-400': '#333333',
      'gray-500': '#262626',
      'gray-600': '#1A1A1A',
      'gray-700': '#0D0D0D',

      'purple-500': '#8284fA',
      'purple-700': '#5E60CE',

      'blue-500': '#4EA8DE',
      'blue-700': '#1E6f9f',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
