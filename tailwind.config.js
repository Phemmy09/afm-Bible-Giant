/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        afc: {
          navy: '#060B19',
          'navy-light': '#0D1B3E',
          'navy-surface': '#132352',
          gold: '#D4AF37',
          'gold-light': '#F6E084',
          'gold-dark': '#9A7B1C',
          crimson: '#800020',
          'crimson-light': '#A31535',
          ivory: '#FDFBF7',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#EF4444'
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Outfit"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.45)',
        'gold-glow-lg': '0 0 50px rgba(212, 175, 55, 0.65)',
        'crimson-glow': '0 0 25px rgba(128, 0, 32, 0.5)',
        'blue-glow': '0 0 30px rgba(59, 130, 246, 0.45)',
        'stage-card': '0 10px 40px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(212, 175, 55, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    },
  },
  plugins: [],
}
