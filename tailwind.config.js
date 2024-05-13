/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'silver': 'rgb(192,192,192)',
        'gray-50': 'rgb(248,248,248)'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

