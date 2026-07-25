/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#102a43',
        navy: '#0b2a4a',
        brand: { 50: '#eff8ff', 100: '#dbefff', 500: '#1479bd', 600: '#0969a9', 700: '#075484', 900: '#0b2a4a' },
        cyan: '#45c2df',
        cloud: '#f5f8fb',
        line: '#dce6ee'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        soft: '0 20px 55px rgba(13, 52, 82, .10)',
        card: '0 8px 30px rgba(13, 52, 82, .08)'
      }
    }
  },
  plugins: []
};
