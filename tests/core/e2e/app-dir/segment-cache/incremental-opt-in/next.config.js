/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		clientSegmentCache: true,
		dynamicIO: true,
		ppr: 'incremental',
	},
};

module.exports = nextConfig;
