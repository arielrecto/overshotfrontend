/** @type {import('tailwindcss').Config} */
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
        accent : '#F0A04B'
      }
    },
    extend: {},
  },
  plugins: [
    require('flowbite')
  ],
}
