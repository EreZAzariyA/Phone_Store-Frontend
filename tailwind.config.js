module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#c9a96e', light: '#dcc391' },
        ps: {
          bg:       '#0a0a0a',
          bgsec:    '#141414',
          card:     '#1a1a1a',
          elevated: '#222222',
          border:   '#2a2a2a',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
