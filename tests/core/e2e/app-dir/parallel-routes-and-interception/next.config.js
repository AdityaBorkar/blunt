/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	async rewrites() {
		return {
			beforeFiles: [
				{
					destination: '/en/foo',
					source: '/foo',
				},
				{
					destination: '/en/photos',
					source: '/photos',
				},
			],
		};
	},
};

module.exports = nextConfig;
