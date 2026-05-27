/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#F0D080',
          400: '#D4AF37',
          500: '#C9A84C',
          600: '#B8960C',
        },
        rose: {
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
        },
        brand: {
          pink: '#F9A8D4',
          gold: '#D4AF37',
          gray: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        scaleIn: 'scaleIn 0.5s ease-out forwards',
        petal1: 'petal1 8s linear infinite',
        petal2: 'petal2 10s linear infinite',
        petal3: 'petal3 12s linear infinite',
        petal4: 'petal4 9s linear infinite',
        petal5: 'petal5 11s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        petal1: {
          '0%': { transform: 'translateY(-10%) translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) translateX(100px) rotate(720deg)', opacity: '0' },
        },
        petal2: {
          '0%': { transform: 'translateY(-10%) translateX(0) rotate(0deg)', opacity: '0.8' },
          '100%': { transform: 'translateY(110vh) translateX(-150px) rotate(-540deg)', opacity: '0' },
        },
        petal3: {
          '0%': { transform: 'translateY(-10%) translateX(0) rotate(45deg)', opacity: '0.9' },
          '100%': { transform: 'translateY(110vh) translateX(200px) rotate(900deg)', opacity: '0' },
        },
        petal4: {
          '0%': { transform: 'translateY(-10%) translateX(0) rotate(90deg)', opacity: '0.7' },
          '100%': { transform: 'translateY(110vh) translateX(-80px) rotate(-720deg)', opacity: '0' },
        },
        petal5: {
          '0%': { transform: 'translateY(-10%) translateX(0) rotate(180deg)', opacity: '0.85' },
          '100%': { transform: 'translateY(110vh) translateX(120px) rotate(1080deg)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F0D080 0%, #D4AF37 50%, #C9A84C 100%)',
        'dark-gradient': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      },
    },
  },
  plugins: [],
};
