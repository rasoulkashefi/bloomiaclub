import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          teal: {
            50: '#f2f7f6',
            100: '#dfece9',
            200: '#bfd9d4',
            300: '#94c0b8',
            400: '#64a197',
            500: '#43847a',
            600: '#336962',
            700: '#2b544e',
            800: '#254541',
            900: '#1f3d3a', // Brand Primary
            950: '#0f2220',
          },
          coral: {
            50: '#fff5f0',
            100: '#ffe8dc',
            200: '#fed1ba',
            300: '#fdb28e',
            400: '#fa8757',
            500: '#f5632b',
            600: '#e65103', // Accent Warm
            700: '#bf4408', // Accent Deep
            800: '#99370c',
            900: '#7c2f0f',
            950: '#431505',
          },
          surface: {
            DEFAULT: '#fafaf8',
            paper: '#ffffff',
            muted: '#f4f4f1',
            border: '#e5e5e2',
          },
          neutral: {
            50: '#fcfcfb',
            100: '#fafaf8',
            200: '#f0f0ed',
            300: '#e5e5e2',
            400: '#b8b8b3',
            500: '#8a8a84',
            600: '#6b6b6b',
            700: '#4a4a47',
            800: '#2e2e2c',
            900: '#1e1e1e',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-vazirmatn)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px rgba(31, 61, 58, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'soft': '0 4px 16px -2px rgba(31, 61, 58, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 10px 25px -4px rgba(31, 61, 58, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'elevated': '0 20px 35px -8px rgba(31, 61, 58, 0.12), 0 6px 16px -4px rgba(31, 61, 58, 0.05)',
      },
      borderRadius: {
        'pill': '9999px',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
