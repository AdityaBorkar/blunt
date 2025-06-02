const ASSET_PREFIX = 'custom-asset-prefix';

module.exports = {
	assetPrefix: ASSET_PREFIX,
	i18n: {
		defaultLocale: 'en-US',
		locales: ['en-US'],
	},
	async rewrites() {
		return {
			afterFiles: [
				{
					destination: '/:path*',
					source: `/${ASSET_PREFIX}/:path*`,
				},
				{
					destination: '/:path*',
					source: '/not-custom-asset-prefix/:path*',
				},
			],
			beforeFiles: [
				{
					destination: `/${ASSET_PREFIX}/_next/:path*`,
					locale: false,
					source: `/:locale/${ASSET_PREFIX}/_next/:path*`,
				},
			],
		};
	},
};
