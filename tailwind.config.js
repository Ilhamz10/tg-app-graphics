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
				textColor: 'var(--tg-theme-text-color)',
				subtitleColor: 'var(--tg-theme-subtitle-text-color)',
				buttonColor: 'var(--tg-theme-button-color)',
				buttonTextColor: 'var(--tg-theme-button-text-color)',
				secondaryBgColor: 'var(--tg-theme-secondary-bg-color)',
				bgColor: 'var(--tg-theme-bg-color)',
				section_separator_color: 'var(--tg-theme-section-separator-color)',
				linkColor: 'var(--tg-theme-link-color)',
			},
		},
	},
	plugins: [],
};
