/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Simplifiquei para pegar tudo dentro de src
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DB954',
        dark: '#121212',
      },
    },
  },
  plugins: [],
}