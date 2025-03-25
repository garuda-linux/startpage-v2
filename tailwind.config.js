const { join } = require('path');
const tailwindPrimeUi = require('tailwindcss-primeui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}')],
  theme: {
    extend: {},
  },
  plugins: [tailwindPrimeUi],
};
