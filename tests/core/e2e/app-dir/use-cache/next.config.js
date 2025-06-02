/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		cacheHandlers: {
			custom: require.resolve('next/dist/server/lib/cache-handlers/default'),
		},
		cacheLife: {
			frequent: {
				expire: 250,
				revalidate: 100,
				stale: 19,
			},
		},
		ppr: process.env.__NEXT_EXPERIMENTAL_PPR === 'true',
		useCache: true,
	},
};

module.exports = nextConfig;
