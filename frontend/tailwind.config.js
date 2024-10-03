/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ECF0F1',
        'classic-red' : '#B72B2A',
        'classic-blue' : '#174D6F',
        'blue-text' : '#1D2834'
      },
      fontFamily: {
        'roboto' : 'roboto'
      }
    },
  },
  plugins: [],
}

