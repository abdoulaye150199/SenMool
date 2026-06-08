/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          senegal: {
            green: '#00853F',
            yellow: '#FDEF42',
            red: '#E31B23',
          },
          ocean: {
            900: '#0A2E38',
            800: '#0F3D4A',
            700: '#164E5E',
            600: '#1D6072',
            500: '#257486',
            400: '#2D899C',
            300: '#3BA0B4',
            200: '#5DBAC9',
            100: '#8ED1DC',
            50: '#C5E8EE',
          },
          sand: {
            900: '#5C4033',
            800: '#6E4C3D',
            700: '#805A47',
            600: '#926851',
            500: '#A4765B',
            400: '#B68466',
            300: '#C89271',
            200: '#DAA07C',
            100: '#ECAE87',
            50: '#F4D2B8',
          },
          alert: {
            red: '#DC2626',
            orange: '#F97316',
          },
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          display: ['Space Grotesk', 'Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }