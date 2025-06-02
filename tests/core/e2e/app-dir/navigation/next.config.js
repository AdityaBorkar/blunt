/** @type {import('next').NextConfig} */
module.exports = {
	// scroll position can be finicky with the
	// indicators showing so hide by default
	devIndicators: false,
	redirects: () => {
		return [
			{
				destination: '/redirect-dest',
				permanent: false,
				source: '/redirect/a',
			},
		];
	},
};
