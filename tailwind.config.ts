import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', 'class'],
  theme: {
  	extend: {
  		aspectRatio: {
  			'16/10': '16 / 10',
  			'16/9': '16 / 9',
  			'4/3': '4 / 3',
  			'3/2': '3 / 2',
  			'4/5': '4 / 5',
  			'5/6': '5 / 6',
  		},
  		colors: {
  			brand: {
  				teal: {
  					'50': '#f2f7f6',
  					'100': '#dfece9',
  					'200': '#bfd9d4',
  					'300': '#94c0b8',
  					'400': '#64a197',
  					'500': '#43847a',
  					'600': '#336962',
  					'700': '#2b544e',
  					'800': '#254541',
  					'900': '#1f3d3a',
  					'950': '#0f2220'
  				},
  				primary: {
  					DEFAULT: '#1f3d3a',
  					hover: '#2b544e',
  					dark: '#162d2b',
  					light: '#254a46'
  				},
  				surface: {
  					DEFAULT: '#fafaf8',
  					paper: '#ffffff',
  					muted: '#f4f4f1',
  					border: '#e5e5e2'
  				},
  				neutral: {
  					'50': '#fcfcfb',
  					'100': '#fafaf8',
  					'200': '#f0f0ed',
  					'300': '#e5e5e2',
  					'400': '#b8b8b3',
  					'500': '#8a8a84',
  					'600': '#6b6b6b',
  					'700': '#4a4a47',
  					'800': '#2e2e2c',
  					'900': '#1e1e1e'
  				}
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-vazirmatn)',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		boxShadow: {
  			'soft-sm': '0 1px 3px rgba(31, 61, 58, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
  			soft: '0 4px 16px -2px rgba(31, 61, 58, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
  			'soft-lg': '0 10px 25px -4px rgba(31, 61, 58, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
  			elevated: '0 20px 35px -8px rgba(31, 61, 58, 0.12), 0 6px 16px -4px rgba(31, 61, 58, 0.05)'
  		},
  		borderRadius: {
  			pill: '9999px',
  			'2xl': '1.25rem',
  			'3xl': '1.5rem'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
