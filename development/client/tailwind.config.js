const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs3: { min: "320px" },
      xs2: { min: "375px" },
      xs: { min: "425px" },
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        serif: ["Times New Roman", "Times", "serif"],
      },
      keyframes: {
        slideDown: {
          from: {
            opacity: 0,
            transform: "translateY(-3rem) translateX(-50%)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0) translateX(-50%)",
          },
        },
        peeper: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(3deg)", width: "103%" },
        },

        foldOpen: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        greenLoader: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        greenPeaker: {
          "0%": {
            color: "#a4d65e",
          },
          "50%": {
            color: "#a4d65e",
          },
          "100%": {
            color: "black",
          },
        },
      },
      colors: {
        collegeGreen: "#a4d65e",
        collegeRed: "#b71234",
        darkGray: "#666666",
        borderGray: "#CECECE",
        lightGray: "#E0E0E0",
        lineBlue: "#6C8298",
      },
      animation: {
        slideDown: "slideDown 300ms ease-out forwards",
        peeper: "peeper 200ms ease-in forwards",
        foldOpen: "foldOpen 300ms ease-in",
        greenLoader: "greenLoader 2s normal forwards",
        greenPeaker: "greenPeaker 0.2s ease-in",
      },
      zIndex: {
        5: "5",
      },
    },
  },
  plugins: [],
};
