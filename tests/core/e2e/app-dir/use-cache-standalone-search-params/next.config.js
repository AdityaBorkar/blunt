/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		ppr: process.env.__NEXT_EXPERIMENTAL_PPR === 'true',
		prerenderEarlyExit: false,
		useCache: true,
	},
};

module.exports = nextConfig;
