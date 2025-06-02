/** @type {import('next').NextConfig} */
module.exports = {
	cacheHandler: process.env.CUSTOM_CACHE_HANDLER,
	logging: {
		fetches: {},
	},

	rewrites: async () => {
		return {
			// beforeFiles: [ { source: '/assets/:path*', destination: '/:path*' } ],
			afterFiles: [
				{
					destination: '/hooks/use-search-params/with-suspense',
					source: '/rewritten-use-search-params',
				},
				{
					destination: '/hooks/use-pathname/slug',
					source: '/rewritten-use-pathname',
				},
			],
		};
	},
};
