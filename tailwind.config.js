/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/index.jsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        nmedium: ["NeueMontreal-Medium", "sans-serif"],
        nregular: ["NeueMontreal-Regular", "sans-serif"],
        nbold: ["NeueMontreal-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
