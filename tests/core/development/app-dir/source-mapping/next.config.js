/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	assetPrefix: '/assets',
	experimental: {
		ppr: true,
	},
	rewrites() {
		return {
			beforeFiles: [
				{
					destination: '/:path*',
					source: '/assets/:path*',
				},
			],
		};
	},
};

module.exports = nextConfig;
