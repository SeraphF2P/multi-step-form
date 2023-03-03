/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      currentColor: "currentColor",
      primary: {
        MarineBlue: "hsla(var(--Marine-blue),<alpha-value>)",
        PurplishBlue: "hsla(var(--Purplish-blue),<alpha-value>)",
        PastelBlue: "hsla(var(--Pastel-blue),<alpha-value>)",
        LightBlue: "hsla(var(--Light-blue),<alpha-value>)",
        StrawberryRed: "hsla(var(--Strawberry-red),<alpha-value>)",
      },
      neutral: {
        LightGray: "hsla(var(--Light-gray),<alpha-value>)",
        coolGray: "hsla(var(--Cool-gray),<alpha-value>)",
        mangolia: "hsla(var(--Magnolia),<alpha-value>)",
        albaster: "hsla(var( --Alabaster),<alpha-value>)",
        white: "hsla(var( --White),<alpha-value>)",
      }
    },
    extend: {

      fontFamily: {
        ubuntu: ["var(--font-ubuntu)"]
      },
      screens: {
        xxsm: "420px",
        xsm: "576px",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("tailwindcss-brand-colors"),
    require("tailwindcss-debug-screens"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
