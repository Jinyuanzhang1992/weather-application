/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flexGrow: {
        1: 1,
        2: 2,
        3: 3,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
