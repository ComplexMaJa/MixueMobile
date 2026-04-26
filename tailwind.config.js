/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mixue: {
          red: '#E60023',
          dark: '#333333',
          gray: '#999999',
          bg: '#F5F5F5'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'card': '0px 4px 20px rgba(0, 0, 0, 0.05)',
        'bottom-nav': '0px -4px 20px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
