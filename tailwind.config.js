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

      width:{
        '3/2': '150%'
      },
      height:{
        'same' : 'same-as-width'
      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1190px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}
