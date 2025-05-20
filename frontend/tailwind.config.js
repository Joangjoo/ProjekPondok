/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#1D4B44',
          50: '#F0F4F3',
          100: '#E1E9E7',
          200: '#C3D3CF',
          300: '#A5BDB7',
          400: '#87A79F',
          500: '#699187',
          600: '#4B7B6F',
          700: '#2D6557',
          800: '#1D4B44',
          900: '#0F332C',
        },
        'secondary': {
          DEFAULT: '#D4B254',
          50: '#FCF9F0',
          100: '#F9F3E1',
          200: '#F3E7C3',
          300: '#EDDBA5',
          400: '#E7CF87',
          500: '#E1C369',
          600: '#DBB74B',
          700: '#D4B254',
          800: '#B89636',
          900: '#9C7A18',
        },
      },
    },
  },
  plugins: [],
};