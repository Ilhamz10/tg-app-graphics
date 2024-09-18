/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				green: '#34C759',
				red: '#FF3B30',
				blue: '#007AFF',
				black: '#1C1C1E',
				gray: '#8E8E93',
				lightGray: '#EBEBF0',
			},
		},
	},
	plugins: [],
};
