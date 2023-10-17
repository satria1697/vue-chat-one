/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#588157'
        },
        secondary: {
          DEFAULT: '#a3b18a'
        },
        tertiary: {
          DEFAULT: '#3a5a40'
        },
        quaternary: {
          DEFAULT: '#344e41'
        }
      }
    }
  },
  plugins: []
}
