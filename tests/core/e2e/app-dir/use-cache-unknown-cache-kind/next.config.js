/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		cacheHandlers: {},
		dynamicIO: true, // overwrite the default config
		prerenderEarlyExit: false,
	},
};

module.exports = nextConfig;
