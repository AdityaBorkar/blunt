module.exports = {
	async rewrites() {
		return [
			{
				destination: '/:path*/',
				source: '/:path*/',
			},
			{
				destination: 'http://localhost:__EXTERNAL_PORT__/:path*',
				source: '/:path*/',
			},
		];
	},
	trailingSlash: true,
};
