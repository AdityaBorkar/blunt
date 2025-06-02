/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		clientSegmentCache: true,
		dynamicIO: true,
		ppr: true,
	},
};

module.exports = nextConfig;
