/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Archivo"', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
      },
      colors: {
        'tb-orange': '#ff6600',
        'tb-green': '#00ff00',
        'tb-yellow': '#ffff00',
        'sage-green': '#6b8e5a',
      },
    },
  },
  plugins: [],
}
