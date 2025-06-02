module.exports = {
	output: 'standalone',
	rewrites() {
		return {
			afterFiles: [
				{
					destination: '/',
					source: '/somewhere',
				},
			],
			beforeFiles: [
				{
					destination: '/news/:path*/',
					source: '/news/:path/',
				},
			],
			fallback: [
				{
					destination: '/:path*',
					source: '/:path*',
				},
				{
					destination: '/seo-redirects',
					source: '/(.*)',
				},
			],
		};
	},
	trailingSlash: true,
};
