import { fontFamily } from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#111111",

          secondary: "#2f2f2f",

          accent: "#f6f6f6",

          neutral: "#ffcb74",

          "base-100": "#ffffff",

          info: "#3abff8",

          success: "#36d399",

          warning: "#fbbd23",

          error: "#f87272",
        },
      },
    ],
  },

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },

  plugins: [
    //require("flowbite"),
    require("daisyui"),
    require("@tailwindcss/line-clamp")
    // require('tailwind-scrollbar')({nocompatible : true}),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};
