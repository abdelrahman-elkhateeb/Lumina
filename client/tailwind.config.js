/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				auth: {
					text: '#f0f0f0',
					background: '#040b0b',
					primary: '#f5f5f5',
					secondary: '#141416',
					accent: '#70c9d7'
				},
				site: {
					text: '#edf7f8',
					background: '#040b0b',
					primary: '#3da7b8',
					secondary: '#246a75',
					accent: '#28818f'
				},
				fontFamily: {
					heading: [
						'Bebas Neue',
						'sans-serif'
					],
					body: [
						'Gabarito',
						'sans-serif'
					],
					accent: [
						'Space Mono',
						'monospace'
					]
				},
				keyframes: {
					falling: {
						'0%': {
							transform: 'translateY(-10vh)',
							opacity: '0.8'
						},
						'100%': {
							transform: 'translateY(100vh)',
							opacity: '0.2'
						}
					},
					flicker: {
						'0%, 100%': {
							opacity: '0.2'
						},
						'50%': {
							opacity: '1'
						}
					},
					fadeIn: {
						'0%': {
							opacity: '0',
							transform: 'translateY(10px)'
						},
						'100%': {
							opacity: '1',
							transform: 'translateY(0)'
						}
					}
				},
				animation: {
					falling: 'falling 10s linear infinite',
					flicker: 'flicker 0.2s ease-in-out 3',
					fadeIn: 'fadeIn 0.4s ease-in-out 0s forwards'
				},
				borderRadius: {
					lg: 'var(--radius)',
					md: 'calc(var(--radius) - 2px)',
					sm: 'calc(var(--radius) - 4px)'
				}
			}
		},

	};