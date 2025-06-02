/** @type {import('next').NextConfig} */
module.exports = {
	experimental: {
		serverActions: {
			allowedOrigins: [`localhost:${process.env.PORT}`],
		},
	},
	logging: {
		fetches: {},
	},
	productionBrowserSourceMaps: true,
};
