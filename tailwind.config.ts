import type { Config } from 'tailwindcss';
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        academy: {
          bg: 'rgb(var(--background) / <alpha-value>)',
          ink: 'rgb(var(--text-main) / <alpha-value>)',
          muted: 'rgb(var(--text-muted) / <alpha-value>)',
          surface: 'rgb(var(--surface) / <alpha-value>)',
          soft: 'rgb(var(--surface-soft) / <alpha-value>)',
          elevated: 'rgb(var(--surface-elevated) / <alpha-value>)',
          gold: 'rgb(var(--accent) / <alpha-value>)',
          'gold-soft': 'rgb(var(--accent-soft) / <alpha-value>)',
          'gold-strong': 'rgb(var(--accent-strong) / <alpha-value>)',
          'gold-text': 'rgb(var(--accent-text) / <alpha-value>)',
          line: 'rgb(var(--border) / <alpha-value>)',
          green: 'rgb(var(--success) / <alpha-value>)',
        },
      },
      boxShadow: { soft: 'var(--shadow-soft)', card: 'var(--shadow-card)', gold: 'var(--shadow-gold)' },
      borderRadius: { '3xl': '1.75rem' },
    },
  },
  plugins: [],
};
export default config;
