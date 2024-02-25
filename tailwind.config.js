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
        sinhala: ['KDROSE Regular', 'sans-serif'],
        sinhalaGoogleFont: ['Noto+Serif+Sinhala'],
        // Add more font families as needed
      },
    },
  },
  plugins: [],
};
