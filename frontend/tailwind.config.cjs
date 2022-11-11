/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		// colors: {
		// 	'accent-color': '#369993',
		// 	'light-accent-color': '#7CEAE2',
		// 	'light-gray': '#A3A3A3',
		// 	'dark-color': ' #2E3448',
		// 	'mid-color': '#40475C',
		// 	'mid-color-dark': '#373E52',
		// 	'light-dark-color': '#E5F6FF',
		// },
		extend: {
			colors: {
				'accent-color': '#369993',
				'light-accent-color': '#7CEAE2',
				'light-gray': '#A3A3A3',
				'dark-color': ' #2E3448',
				'mid-color': '#40475C',
				'mid-color-dark': '#373E52',
				'light-dark-color': '#E5F6FF',
			},
		},
	},
	plugins: [],
};
