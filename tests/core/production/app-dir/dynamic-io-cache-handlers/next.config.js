/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		dynamicIO: true,
	},
	output: 'standalone',
};

module.exports = nextConfig;
