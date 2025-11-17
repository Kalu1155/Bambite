// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "./node_modules/flowbite/**/*.js",
//     "./node_modules/@headlessui/react/**/*.js",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("flowbite/plugin")],
// };
// // File: tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/@headlessui/react/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
