/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        youtube: {
          red: '#FF0000',
          dark: '#282828',
          light: '#f9f9f9',
        },
      },
      animation: {
        'progress': 'progress 1s ease-in-out',
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}