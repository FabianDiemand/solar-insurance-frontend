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
        'gray-transparent-7': 'rgba(214, 203, 195, 0.7)',
        'orange-transparent-8': 'rgba(255, 207, 133, 0.8)',
        'black-transparent-2': 'rgba(0, 0, 0, 0.8)'
      }
    },
  },
  plugins: [
    require('daisyui'),
    require('autoprefixer'),
    require('tailwindcss')
  ],
}