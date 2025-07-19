/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}" ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#111111',
        'medium-gray': '#1a1a1a',
        'light-gray': '#eaeaea',
        'brand-accent': '#0070f3',
      }
    },
  },
  plugins: [],
}