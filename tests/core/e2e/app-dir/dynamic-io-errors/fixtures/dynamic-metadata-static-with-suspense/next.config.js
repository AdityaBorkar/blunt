/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		dynamicIO: true,
		ppr: process.env.__NEXT_EXPERIMENTAL_PPR === 'true',
		pprFallbacks: process.env.__NEXT_EXPERIMENTAL_PPR === 'true',
		serverMinification: true,
	},
};

module.exports = nextConfig;
