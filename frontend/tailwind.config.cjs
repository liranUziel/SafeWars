/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'accent-color': '#4DAFC5',
				'dark-accent-color': '#2B2E3D',
				'dark-secondary-color': '#454A5E',
			},
		},
	},
	darkMode: ['class', '[data-theme="dark"]'],
	plugins: [require('flowbite-react')],
};
