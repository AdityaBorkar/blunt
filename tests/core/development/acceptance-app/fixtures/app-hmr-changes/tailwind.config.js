const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [
		plugin(({ addVariant }) => {
			// this class is applied to `html` by `app/theme-efect.ts`, similar
			// to how `dark:` gets enabled
			addVariant('theme-system', '.theme-system &');
		}),
	],
	theme: {
		extend: {},
	},
};
