/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', 'class'], // enables manual dark mode via class
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			'branch-border-btn': '#028DE8',
  			'branch-border-btn1': '#000000',
  			primary: {
  				DEFAULT: '#19438c',
  				foreground: '#ffffff',
  				dark: '#0A2973',
  				light: '#1461B9',
  			},
  			secondary: {
  				DEFAULT: '#BDD261',
  				foreground: '#19438c',
  				dark: '#9bb84a',
  				light: '#d4e88a',
  			},
  			container: {
  				center: true,
  				padding: {
  					DEFAULT: '1rem',
  					sm: '2rem',
  					lg: '4rem'
  				}
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontSize: {
  			display: [
  				'clamp(1.75rem, 4vw + 0.5rem, 3rem)',
  				{ lineHeight: '1.2', fontWeight: '700' },
  			],
  			'heading-1': [
  				'clamp(1.5rem, 3vw + 0.5rem, 2.5rem)',
  				{ lineHeight: '1.25', fontWeight: '700' },
  			],
  			'heading-2': [
  				'clamp(1.25rem, 2.5vw + 0.5rem, 2rem)',
  				{ lineHeight: '1.3', fontWeight: '700' },
  			],
  			'heading-3': [
  				'clamp(1.125rem, 2vw + 0.5rem, 1.5rem)',
  				{ lineHeight: '1.35', fontWeight: '600' },
  			],
  			body: ['1rem', { lineHeight: '1.6' }],
  			'body-sm': ['0.875rem', { lineHeight: '1.5' }],
  			caption: ['0.8125rem', { lineHeight: '1.4' }],
  			label: ['0.75rem', { lineHeight: '1.3' }],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
  plugins: [require("tailwindcss-animate")],
};
