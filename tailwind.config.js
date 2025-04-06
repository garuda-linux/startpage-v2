const { join } = require('path');
const tailwindPrimeUi = require('tailwindcss-primeui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}')],
  theme: {
    extend: {
      screens: {
        '3xl': { min: '2048px' },
      },
    },
  },
  plugins: [tailwindPrimeUi],
};
