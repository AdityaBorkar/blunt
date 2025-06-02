module.exports = {
	// replace me
	async rewrites() {
		return [
			{
				destination: '/blog/post-1',
				source: '/blog-post-1',
			},
			{
				destination: '/blog/post-2?hello=world',
				source: '/blog-post-2',
			},
			{
				destination: '/blog/post-3',
				source: '/blog-:param',
			},
			{
				destination: '/rewrite-target',
				source: '/rewrite-source/:path+',
			},
		];
	},
};
