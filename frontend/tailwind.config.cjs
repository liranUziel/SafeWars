/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-accenet": {
          100: "#4DAFC5",
          200: "#454A5E",
          // ...
          800: "#3199AF",
          900: "#2B2E3D",
        },
        "light-accent": {
          100: "#2B2E3D",
          200: "#67B1C1",

          800: "#5C6279",
          900: "#4DAFC5",
        },
      },
    },
  },
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [require("flowbite-react")],
};
