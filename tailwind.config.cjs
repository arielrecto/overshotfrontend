/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors : {
      theme : {
        primary : '#FEFBE9',
        secondary : '#E1EEDD',
        accent : '#F0A04B',
      },
      white : colors.white,
      gray : colors.gray,
      blue : colors.blue,
      indigo : colors.indigo
    },
    extend: {},
  },
  plugins: [
    require('flowbite'),
  ],
}
