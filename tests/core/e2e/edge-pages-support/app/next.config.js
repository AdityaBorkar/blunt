module.exports = {
	rewrites() {
		return [
			{
				destination: '/',
				source: '/rewrite-me',
			},
			{
				destination: '/first',
				source: '/rewrite-me-dynamic',
			},
		];
	},
};
