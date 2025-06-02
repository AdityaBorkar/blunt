/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		turbo: {
			rules: {
				'*.svg': {
					as: '*.js',
					loaders: ['@svgr/webpack'],
				},
			},
		},
	},
	webpack(config) {
		config.module.rules.push({ test: /\.svg$/, use: '@svgr/webpack' });

		return config;
	},
};

module.exports = nextConfig;
