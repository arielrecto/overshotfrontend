/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      theme: {
        primary: '#FEFBE9',
        secondary: '#E1EEDD',
        accent: '#F0A04B',
      },
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      indigo: colors.indigo,
      orange: colors.orange,
      slate: colors.slate,
      zinc: colors.zinc,
      neutral: colors.neutral,
      red: colors.red
    },
    extend: {},
  },
  plugins: [
    require('flowbite'),
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded']
  }
}
