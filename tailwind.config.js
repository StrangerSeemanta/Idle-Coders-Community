// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme';

import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.html',
    './src/**/*.jsx',
    './src/**/*.tsx',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
  },},
  },
  darkMode: "class",
  plugins: [nextui(), ],
}

