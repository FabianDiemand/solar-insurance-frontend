/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pv-panels': "url('https://images.pexels.com/photos/18316989/pexels-photo-18316989/free-photo-of-licht-dach-sonne-technologie.jpeg')"
      },
      colors: {
        'gray-transparent-8': 'rgba(214, 203, 195, 0.8)',
        'gray-transparent-9': 'rgba(214, 203, 195, 0.9)',
        'gray-transparent-5': 'rgba(214, 203, 195, 0.5)',
      }
    },
  },
  plugins: [
    require('daisyui'),
    require('autoprefixer'),
    require('tailwindcss')
  ],
}