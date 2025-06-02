/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		turbo: {
			rules: {
				'*.test-file.js': {
					browser: {
						default: {
							loaders: [
								{
									loader: require.resolve('./test-file-loader.js'),
									options: { browser: true },
								},
							],
						},
						foreign: {
							loaders: [
								{
									loader: require.resolve('./test-file-loader.js'),
									options: { browser: true, foreign: true },
								},
							],
						},
					},
					default: {
						loaders: [
							{
								loader: require.resolve('./test-file-loader.js'),
								options: { default: true },
							},
						],
					},
					foreign: false,
				},
			},
		},
	},
};

module.exports = nextConfig;
