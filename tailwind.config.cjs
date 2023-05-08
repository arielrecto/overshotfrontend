/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite"),
    // require('tailwind-scrollbar')({nocompatible : true}),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};
