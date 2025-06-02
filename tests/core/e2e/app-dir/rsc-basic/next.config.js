module.exports = {
	onDemandEntries: {
		maxInactiveAge: 1000 * 60 * 60,
	},
	reactStrictMode: true,
	rewrites: async () => {
		return {
			afterFiles: [
				{
					destination: '/edge/dynamic',
					source: '/rewritten-to-edge-dynamic',
				},
			],
		};
	},
	serverExternalPackages: ['conditional-exports-optout'],
};
