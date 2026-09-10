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
        afc: {
          navy: '#060B19',
          'navy-light': '#0A1628',
          'navy-mid': '#0F1D35',
          'navy-surface': '#141F3A',
          gold: '#C5A44E',
          'gold-light': '#E8D48B',
          'gold-dark': '#9A7D30',
          'gold-shimmer': '#F5E6B8',
          ivory: '#F5F0E8',
          'ivory-muted': '#D4CFC6',
          crimson: '#8B1A1A',
          'crimson-light': '#C0392B',
          emerald: '#1A6B3C',
          'emerald-light': '#27AE60',
          'blue-banner': '#1A3A6B',
          'blue-deep': '#0D2240',
          parchment: '#F4E8C1',
          'parchment-dark': '#D4C49A',
          'scroll-bg': '#E8D8B0',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #C5A44E 0%, #E8D48B 50%, #C5A44E 100%)',
        'gradient-navy': 'linear-gradient(180deg, #060B19 0%, #0A1628 50%, #0F1D35 100%)',
        'gradient-parchment': 'linear-gradient(145deg, #F4E8C1 0%, #E8D8B0 50%, #D4C49A 100%)',
        'gradient-celestial': 'radial-gradient(ellipse at top, #0F1D35 0%, #060B19 70%)',
        'gradient-stamp-correct': 'linear-gradient(135deg, #1A6B3C 0%, #27AE60 100%)',
        'gradient-stamp-incorrect': 'linear-gradient(135deg, #8B1A1A 0%, #C0392B 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(197, 164, 78, 0.3), 0 0 40px rgba(197, 164, 78, 0.1)',
        'gold-intense': '0 0 30px rgba(197, 164, 78, 0.5), 0 0 60px rgba(197, 164, 78, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.37)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(197, 164, 78, 0.15)',
        'tile': '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'tile-active': '0 0 20px rgba(197, 164, 78, 0.6), 0 4px 12px rgba(0, 0, 0, 0.4)',
        'score-card': '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(197, 164, 78, 0.2)',
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'stamp-in': 'stampIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'scroll-reveal': 'scrollReveal 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        'tile-fade': 'tileFade 0.5s ease-out forwards',
        'spin-wheel': 'spinWheel var(--spin-duration, 4s) cubic-bezier(0.17, 0.67, 0.12, 0.99)',
        'score-pop': 'scorePop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'confetti': 'confettiFall 3s ease-in forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'ladder-highlight': 'ladderHighlight 0.3s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '200% center' },
          '50%': { backgroundPosition: '-200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(197, 164, 78, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(197, 164, 78, 0.6)' },
        },
        stampIn: {
          '0%': { transform: 'scale(3) rotate(-15deg)', opacity: '0' },
          '60%': { transform: 'scale(0.9) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(-5deg)', opacity: '1' },
        },
        scrollReveal: {
          '0%': { transform: 'scaleY(0) translateY(20px)', opacity: '0', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(1) translateY(0)', opacity: '1', transformOrigin: 'top' },
        },
        tileFade: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.95)' },
          '100%': { opacity: '0', transform: 'scale(0.8)' },
        },
        spinWheel: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(var(--spin-degrees, 1800deg))' },
        },
        scorePop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-100%) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        ladderHighlight: {
          '0%': { transform: 'scale(1)', backgroundColor: 'transparent' },
          '50%': { transform: 'scale(1.1)', backgroundColor: 'rgba(197, 164, 78, 0.3)' },
          '100%': { transform: 'scale(1)', backgroundColor: 'rgba(197, 164, 78, 0.2)' },
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
