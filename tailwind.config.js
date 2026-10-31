/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f6f5f4',
          100: '#e8e6e3',
          200: '#d1cdc8',
          300: '#a8a29b',
          400: '#7a736b',
          500: '#5c554c',
          600: '#443e37',
          700: '#2e2924',
          800: '#1f1b17',
          900: '#161310',
          950: '#0d0b09',
        },
        cream: {
          50: '#fdfcfa',
          100: '#faf8f4',
          200: '#f4f0e8',
          300: '#ebe5d8',
          400: '#dccfb8',
        },
        gold: {
          50: '#fbf7ee',
          100: '#f5ecd6',
          200: '#ebd7ad',
          300: '#dcbd7a',
          400: '#cda75a',
          500: '#b8995e',
          600: '#a07d44',
          700: '#836438',
          800: '#6b5230',
          900: '#5a4529',
        },
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-left': {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'clip-reveal': {
          '0%': { clipPath: 'inset(100% 0 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        'line-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'loader-fade': {
          '0%': { opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { opacity: '0', visibility: 'hidden' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 1s ease forwards',
        'scale-in': 'scale-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-left': 'slide-left 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-right': 'slide-right 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'clip-reveal': 'clip-reveal 1s cubic-bezier(0.77, 0, 0.18, 1) forwards',
        'line-grow': 'line-grow 1s cubic-bezier(0.77, 0, 0.18, 1) forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'loader-fade': 'loader-fade 1.5s ease forwards',
      },
    },
  },
  plugins: [],
};
