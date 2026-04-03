/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ieee-bg': '#020B18',
        'ieee-surface': '#0A1628',
        'ieee-blue': '#00A3FF',
        'ieee-cyan': '#00D4FF',
        'ieee-border': 'rgba(0, 163, 255, 0.25)',
        'ieee-muted': '#7A8FA6'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0px #00A3FF' },
          '50%': { boxShadow: '0 0 20px #00A3FF' }
        },
        'dot-travel': {
          '0%': { opacity: '0', transform: 'translateY(0)' },
          '10%, 90%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(100vh)' }
        },
        'dash-flow': {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' }
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'dot-travel': 'dot-travel 8s linear infinite',
        'dash-flow': 'dash-flow 1s linear infinite'
      }
    },
  },
  plugins: [],
}
