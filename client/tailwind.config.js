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
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8', // Main Navy
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554', // Dark Navy
        },
        accent: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#c5a89e', // Gold/Teal fallback accent, using a warm gold tone here
          600: '#b48a7d',
          700: '#a37162',
          800: '#865a4e',
          900: '#6d4b41',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f3e5ab',
          dark: '#aa8c2c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
