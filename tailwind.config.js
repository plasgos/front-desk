// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   prefix: "tw-",
//   content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */

module.exports = {
  prefix: "tw-",
  // content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  safelist: [
    {
      pattern: /.*/, // Sertakan semua class yang mungkin
    },
  ],
  theme: {
    extend: {},
    screens: {
      xs: "480px",
    },
  },
  plugins: [],
  // plugins: [
  //   function ({ addBase, theme }) {
  //     addBase({
  //       a: { color: theme("colors.link", "#fa541c") },
  //       "a:hover": { color: theme("colors.link-hover", "#d4380d") },
  //     });
  //   },
  // ],
};
