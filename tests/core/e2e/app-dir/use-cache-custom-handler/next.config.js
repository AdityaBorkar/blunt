/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		cacheHandlers: {
			default: require.resolve('./handler.js'),
			legacy: require.resolve('./legacy-handler.js'),
		},
		dynamicIO: true,
	},
};

module.exports = nextConfig;
