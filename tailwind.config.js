/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#FCF5F7',
          100: '#F9EBF0',
          200: '#F0CDD9',
          300: '#E7AFC3',
          400: '#D97396',
          500: '#CB3769',
          600: '#95284F',
          700: '#741F3D',
          800: '#4E152A',
          900: '#27091A',
        },
        gold: {
          50: '#FFFDF5',
          100: '#FFFAEB',
          200: '#FFF3CC',
          300: '#FFEEAD',
          400: '#FFE270',
          500: '#FFD633',
          600: '#BF9F26',
          700: '#8C751D',
          800: '#5E4E13',
          900: '#2F270A',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
};