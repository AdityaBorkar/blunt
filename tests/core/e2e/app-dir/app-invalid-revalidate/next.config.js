/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		prerenderEarlyExit: false,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
