/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    colors:{
      'dgrey': '#333333',
      'lgrey': '#D8DADE',
      'yellow': '#FBB811',
      'white': '#ffffff',
      'black': '#000000',
    },
    extend: {
      
      fontFamily: {
        zilla: ["ZILLA", "cursive"],
      },
    },
  },
  plugins: [],
}
