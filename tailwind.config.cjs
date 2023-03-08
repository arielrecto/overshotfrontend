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
        primary: '#f1f0ee',
        primaryFocus : '#747474',
        secondary : '#f4ac6f',
        secondaryFocus : '#7c4b23',
        accent: '#0a0808',
        
      },
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      indigo: colors.indigo,
      orange: colors.orange,
      slate: colors.slate,
      zinc: colors.zinc,
      neutral: colors.neutral,
      red: colors.red,
      amber: colors.amber
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
