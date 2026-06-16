/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FBF6ED',
          dark: '#F1E7D4',
        },
        ink: '#2B1F17',
        brown: {
          DEFAULT: '#4A3527',
          light: '#6E5340',
          dark: '#33241A',
        },
        sunrise: {
          gold: '#FCB72E',
          orange: '#F2552C',
          red: '#C1392B',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-source)', 'sans-serif'],
        scripture: ['var(--font-cormorant)', 'serif'],
      },
      backgroundImage: {
        'sunrise-radial': 'radial-gradient(circle at 50% 65%, #FCB72E 0%, #F2552C 45%, #C1392B 75%, transparent 100%)',
      },
    },
  },
  plugins: [],
};
