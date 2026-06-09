/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne:  ['Syne', 'sans-serif'],
        mono:  ['Space Mono', 'monospace'],
      },
      colors: {
        bg: {
          primary:   '#080d18',
          secondary: '#0d1426',
        },
        surface: {
          1: '#111827',
          2: '#1a2235',
        },
        cyan:   '#00c8ff',
        blue:   '#3b82f6',
        muted:  '#64748b',
      },
      backgroundImage: {
        grad: 'linear-gradient(135deg, #00c8ff, #3b82f6)',
      },
      animation: {
        'wave':         'wave 2s ease-in-out infinite',
        'badge-pulse':  'badge-pulse 2s ease-in-out infinite',
        'orb-1':        'orb-float-1 12s ease-in-out infinite',
        'orb-2':        'orb-float-2 15s ease-in-out infinite',
        'orb-3':        'orb-float-3 18s ease-in-out infinite',
        'ring-spin':    'ring-spin 3s linear infinite',
        'glow-pulse':   'glow-pulse 3s ease-in-out infinite',
        'fade-up':      'fadeUp 0.6s ease both',
      },
      keyframes: {
        wave: {
          '0%,60%,100%': { transform: 'rotate(0deg)' },
          '10%,30%':      { transform: 'rotate(20deg)' },
          '20%':          { transform: 'rotate(-8deg)' },
          '40%':          { transform: 'rotate(14deg)' },
          '50%':          { transform: 'rotate(-4deg)' },
        },
        'badge-pulse': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(34,197,94,0.4)' },
          '50%':      { boxShadow: '0 0 0 6px rgba(34,197,94,0)' },
        },
        'orb-float-1': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':      { transform: 'translate(-60px,80px) scale(1.1)' },
          '66%':      { transform: 'translate(40px,-40px) scale(0.9)' },
        },
        'orb-float-2': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':      { transform: 'translate(80px,-60px) scale(1.15)' },
          '66%':      { transform: 'translate(-30px,50px) scale(0.85)' },
        },
        'orb-float-3': {
          '0%,100%': { transform: 'translate(0,0) scale(1)', opacity: '0.18' },
          '50%':      { transform: 'translate(50px,-80px) scale(1.2)', opacity: '0.08' },
        },
        'ring-spin': {
          '0%':   { background: 'linear-gradient(0deg,   #00c8ff, #3b82f6)' },
          '25%':  { background: 'linear-gradient(90deg,  #00c8ff, #3b82f6)' },
          '50%':  { background: 'linear-gradient(180deg, #00c8ff, #3b82f6)' },
          '75%':  { background: 'linear-gradient(270deg, #00c8ff, #3b82f6)' },
          '100%': { background: 'linear-gradient(360deg, #00c8ff, #3b82f6)' },
        },
        'glow-pulse': {
          '0%,100%': { transform: 'scale(1)',   opacity: '1' },
          '50%':      { transform: 'scale(1.1)', opacity: '0.6' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
