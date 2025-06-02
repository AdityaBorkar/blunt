module.exports = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				destination: '/config-redirect-after',
				permanent: true,
				source: '/config-redirect-before',
			},
			{
				destination: '/config-redirect-catchall-after/:path*',
				permanent: true,
				source: '/config-redirect-catchall-before/:path*',
			},
		];
	},
	async rewrites() {
		return [
			{
				destination: '/config-rewrite-after',
				source: '/config-rewrite-before',
			},
		];
	},
};
