/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#374f22',

          secondary: '#99c79b',

          accent: '#c0c18f',

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
  plugins: [require('daisyui')],
};
