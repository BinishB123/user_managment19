/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* For Webkit browsers */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* For Firefox */
          '&': {
            scrollbarWidth: 'none',
          },
          /* For IE and Edge */
          '-ms-overflow-style': 'none',
        },
      });
    },
  ],
};
