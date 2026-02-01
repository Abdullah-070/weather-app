/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        weather: {
          sunny: '#f59e0b',
          cloudy: '#6b7280',
          rainy: '#3b82f6',
          stormy: '#7c3aed',
        }
      },
      backgroundImage: {
        'gradient-day': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-night': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      }
    },
  },
  plugins: [],
}
