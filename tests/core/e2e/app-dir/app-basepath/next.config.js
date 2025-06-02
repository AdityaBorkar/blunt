module.exports = {
	basePath: '/base',
	async rewrites() {
		return [
			{
				basePath: false,
				destination: 'https://example.vercel.sh/',
				source: '/outsideBasePath',
			},
		];
	},
};
