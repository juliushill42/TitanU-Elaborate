/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mint: '#F0FDF4',
        babyBlue: '#E0F2FE',
        softYellow: '#FEF08A',
        charcoal: '#333333',
      },
      fontFamily: {
        rounded: ['Quicksand', 'Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
