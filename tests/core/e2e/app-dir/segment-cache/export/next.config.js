/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		clientSegmentCache: true,
		dynamicIO: true,
		ppr: false,
	},
	output: 'export',
};

module.exports = nextConfig;
