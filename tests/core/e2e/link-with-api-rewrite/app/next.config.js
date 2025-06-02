/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return {
			beforeFiles: [
				{
					destination: '/api/json?from=/:path',
					has: [{ key: 'json', type: 'query', value: 'true' }],
					source: '/:path(.*)',
				},
			],
		};
	},
};

module.exports = nextConfig;
