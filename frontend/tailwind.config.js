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
        'blue-600' : '#1D2834',
        'blue-400': '#2C3E50'
      },
      fontFamily: {
        'roboto' : 'roboto'
      }
    },
  },
  plugins: [],
}

