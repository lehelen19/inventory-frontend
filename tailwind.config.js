/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#374f22',

          secondary: '#99c79b',

          accent: '#d9cf8d',

          neutral: '#201f13',

          'base-100': '#f4f3ec',

          info: '#c0c18f',

          success: '#6ee7b7',

          warning: '#fbbf24',

          error: '#ef4444',
        },
      },
    ],
  },
  theme: {
    extend: {
      height: {
        100: 'calc(100vh - 4rem)',
      },
    },
  },
  plugins: [require('daisyui')],
};
