/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./resources/**/*.blade.php",
      "./resources/**/*.js",
      "./resources/**/*.vue",
      "./resources/js/**/*.{js,jsx}",
  ],
  theme: {
      screens: {
          "4xl": { max: "1900px" },
          "2xl": { max: "1535px" },
          // => @media (max-width: 1535px) { ... }

          xl: { max: "1279px" },
          // => @media (max-width: 1279px) { ... }

          lg: { max: "1023px" },
          // => @media (max-width: 1023px) { ... }

          md: { max: "767px" },
          // => @media (max-width: 767px) { ... }

          sm: { max: "639px" },
          // => @media (max-width: 639px) { ... }
          xs: { max: "420px" },
      },
      extend: {
          colors: {
              torange: "#E0701D",
              lorange: "#e0b28f",
          },
      },
  },
  plugins: [],
};