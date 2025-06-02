module.exports = {
	rewrites: async () => {
		return {
			afterFiles: [
				{
					destination:
						'/hooks/use-search-params?first=value&second=other%20value&third',
					source: '/rewritten-use-search-params',
				},
				{
					destination: '/hooks/use-pathname',
					source: '/rewritten-use-pathname',
				},
				{
					destination:
						'/hooks/use-selected-layout-segment/first/slug3/second/catch/all',
					source: '/hooks/use-selected-layout-segment/rewritten',
				},
			],
		};
	},
};
