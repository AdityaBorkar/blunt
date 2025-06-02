/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		turbo: {
			rules: {
				'*.mdx': {
					as: '*.js',
					loaders: ['test-loader.js'],
				},
			},
		},
	},
};

module.exports = nextConfig;
