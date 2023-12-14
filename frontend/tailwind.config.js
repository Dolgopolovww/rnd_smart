/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        panton: ['var(--font-panton)', 'sans-serif'],
        norms: ['var(--font-tt-norms-pro)', 'sans-serif'],
      },
    },
    screens: {
      'm-xs': '320px',
      'm-sm': '360px',
      'm-md': '480px',
      'm-lg': '600px',
      'm-xlg': '640px',
      't-sm': '768px',
      't-md': '992px',
      't-lg': '1024px',
      'd-xs': '1200px',
      'd-sm': '1280px',
      'd-md': '1368px',
      'd-lg': '1440px',
      'd-xlg': '1536px',
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
