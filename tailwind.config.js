/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'plant': "url('/assets/plant.png')"
      },
      colors: {
        'orangebg': "#F6D9C5",
        'plantgreen': "#2a9d8f"
      }
    },
  },
  plugins: [],
}
