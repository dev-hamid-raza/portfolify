/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100:'#ECF0F1',
          50:'#f6f9f9'
        },
        classic_red: {
          900: '#902524',
          800: '#902524',
          700: '#b72b2a',   // main shade
          600: '#ce3534',
          500: '#e25251'
        },
        classic_blue: {
          900: '#112b40',
          800: '#174d6f', // main shade
          700: '#185f8c',
          600: '#1d76ac'
        },
        text:{
          600 : '#1D2834',
          400: '#2C3E50'
        },
      fontFamily: {
        'roboto' : 'roboto'
      }
    },
  },
  plugins: [],
  }
}
