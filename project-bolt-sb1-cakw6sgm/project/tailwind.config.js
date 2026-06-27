/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gs-green': '#1A6B3C',
        'gs-emerald': '#2E9E5B',
        'gs-mint': '#4CAF7D',
        'gs-light': '#EAF7EF',
        'gs-charcoal': '#1E2A2A',
        'gs-slate': '#64748B',
        'gs-gray': '#F1F5F4',
        'gs-border': '#D1D9D5',
        'gs-navy': '#1B3A6B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gs-card': '0 2px 12px rgba(0,0,0,0.08)',
        'gs-hover': '0 8px 24px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
