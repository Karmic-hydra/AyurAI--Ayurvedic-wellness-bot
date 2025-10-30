/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ayur: {
          primary: '#2D5016',    // Deep forest green
          secondary: '#8BC34A',  // Light green
          accent: '#FFA726',     // Warm orange
          danger: '#D32F2F',     // Red for warnings
          bg: '#F5F5DC',         // Beige background
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
