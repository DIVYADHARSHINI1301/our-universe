/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#0a020f',
          900: '#14041e',
          800: '#20072e',
          700: '#2e0b42',
        },
        purple: {
          950: '#180424',
          900: '#26063b',
          800: '#3c0a5c',
          700: '#581084',
          600: '#7919b5',
          500: '#9b2ce6',
          400: '#b858f6',
          300: '#d48eff',
        },
        lovePink: {
          50: '#fff0f5',
          100: '#ffe3ec',
          200: '#ffc1d6',
          300: '#ff8fb5',
          400: '#ff5c94',
          500: '#ff2a73',
          600: '#e60b54',
          700: '#c20042',
        },
        passionRed: {
          DEFAULT: '#e60049',
          light: '#ff2e6e',
          dark: '#9b0030',
          glow: '#ff0055',
        },
        wine: {
          950: '#1a0410',
          900: '#2b071b',
          800: '#420a2a',
          700: '#5c0f3a',
          600: '#7a154e',
        },
        blush: {
          100: '#fde8ed',
          200: '#f7cad0',
          300: '#ffb3c1',
          400: '#ff8fa3',
        },
        ivory: {
          50: '#ffffff',
          100: '#fdfbf9',
          200: '#faf2eb',
          300: '#f3e5d8',
        },
        champagne: {
          DEFAULT: '#e5c583',
          light: '#f4dec1',
          dark: '#b38f4a',
        },
        gold: {
          glow: '#ffd700',
          soft: '#eec77e',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
        'float-reverse': 'floatReverse 6s ease-in-out infinite',
        'twinkle': 'twinkle 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite linear',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(3deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(14px) rotate(-3deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 6px rgba(255, 77, 141, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(230, 0, 73, 0.7))' },
        }
      },
      boxShadow: {
        'love-glow': '0 0 50px -5px rgba(255, 42, 115, 0.5)',
        'purple-glow': '0 0 50px -5px rgba(121, 25, 181, 0.5)',
        'champagne-glow': '0 0 30px -5px rgba(229, 197, 131, 0.35)',
        'polaroid': '0 18px 36px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 77, 141, 0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
