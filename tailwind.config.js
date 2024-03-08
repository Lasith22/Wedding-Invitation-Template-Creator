/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        custom: ['Lato'],
        inter: ['Inter'],
        poppins: ['Poppins'],
        manrope: ['Manrope'],
        sinhala1: ['KDROSE Regular', 'sans-serif'],
        sinhala2: ['font2'],
        sinhala3: ['font3'],

        // Add more font families as needed
      },
    },
  },
  plugins: [],
};
