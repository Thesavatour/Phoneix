import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#DFFF45',
        'primary-dark': '#B3CC39',
        secondary: '#4C4C4C',
        'primary-text': 'rgba(255, 255, 255, 0.80)',
        'white-rgba-10': 'rgba(255, 255, 255, 0.1)',
        'white-rgba-13': 'rgba(255, 255, 255, 0.13)',
        'white-rgba-20': 'rgba(255, 255, 255, 0.2)',
        'white-rgba-30': 'rgba(255, 255, 255, 0.3)',
        'white-rgba-40': 'rgba(255, 255, 255, 0.4)',
        'white-rgba-50': 'rgba(255, 255, 255, 0.5)',
        'white-rgba-60': 'rgba(255, 255, 255, 0.6)',
        'white-rgba-70': 'rgba(255, 255, 255, 0.7)',
        'white-rgba-80': 'rgba(255, 255, 255, 0.8)',
        'white-rgba-90': 'rgba(255, 255, 255, 0.9)',
        'white-rgba-23': 'rgba(255, 255, 255, 0.23)',
        'white-rgba-090': 'rgba(255, 255, 255, 0.090)',
        'white-rgba-008': 'rgba(255, 255, 255, 0.08)',
        'white-rgba-006': 'rgba(255, 255, 255, 0.006)',
        'black-rgba-50': 'rgba(0, 0, 0, 0.50)',
        black: '#222222',
        green: '#F9FDE6',
        'green-dark': '#00b300',
      },
      backgroundImage: {
        'graph-square-dark': 'url("/square-shape/dark-square-shape.svg")',
        'auth-background': 'url("/auth-bg/auth-bg.svg")',
        'stats-background': 'url("/stats-bg/stats-bg.svg")',
        'menu-card-bg-dark': 'url("/menu-card-bg/menu-card-bg-dark.svg")',
        'menu-card-bg-light': 'url("/menu-card-bg/menu-card-bg-light.svg")',
      },
      backgroundSize: {
        'graph-square': '40px 40px',
      },
      backgroundPosition: {
        'center-right': 'center right',
      },
    },
  },

  plugins: [],
};
export default config;
