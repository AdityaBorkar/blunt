module.exports = {
	experimental: {
		clientRouterFilter: true,
		clientRouterFilterRedirects: true,
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'nl'],
	},
	redirects() {
		return [
			{
				destination: '/new',
				permanent: false,
				source: '/to-new',
			},
		];
	},
};
