/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      // {
      //   mytheme: {
      //     "primary": 'red',
      //     "secondary": "#f6d860",
      //     "accent": "#37cdbe",
      //     "neutral": "#3d4451",
      //     "base-100": "#ffffff",
      //   },
      // },
    ],
  },
}

