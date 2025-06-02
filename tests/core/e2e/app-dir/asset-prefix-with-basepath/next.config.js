module.exports = {
	assetPrefix: '/custom-asset-prefix',
	basePath: '/custom-base-path',
	async rewrites() {
		return [
			{
				destination: '/:path*',
				source: '/custom-asset-prefix/:path*',
			},
			{
				destination: '/:path*',
				source: '/not-custom-asset-prefix/:path*',
			},
		];
	},
};
