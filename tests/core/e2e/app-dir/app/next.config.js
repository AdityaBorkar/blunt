/**
 * @type import('next').NextConfig
 */
module.exports = {
	env: {
		LEGACY_ENV_KEY: '1',
	},
	experimental: {
		clientRouterFilterRedirects: true,
		parallelServerBuildTraces: true,
		parallelServerCompiles: true,
		webpackBuildWorker: true,
	},

	redirects: async () => {
		return [
			{
				destination: 'https://example.vercel.sh',
				permanent: false,
				source: '/redirect-1',
			},
			{
				destination: 'https://example.vercel.sh',
				permanent: false,
				source: '/redirect-2',
			},
			{
				destination: 'https://example.vercel.sh',
				permanent: false,
				source: '/blog/old-post',
			},
			{
				destination: 'https://example.vercel.sh',
				permanent: false,
				source: '/redirect-3/some',
			},
			{
				destination: 'https://example.vercel.sh',
				permanent: false,
				source: '/redirect-4',
			},
			{
				destination: 'https://example.vercel.sh',
				permanent: false,
				source: '/:path/to-redirect',
			},
		];
	},
	// output: 'standalone',
	rewrites: async () => {
		return {
			afterFiles: [
				{
					destination: '/dashboard',
					source: '/rewritten-to-dashboard',
				},
				{
					destination:
						'/search-params-prop?first=value&second=other%20value&third',
					source: '/search-params-prop-rewrite',
				},
				{
					destination:
						'/search-params-prop/server?first=value&second=other%20value&third',
					source: '/search-params-prop-server-rewrite',
				},
				{
					destination: '/',
					has: [],
					missing: [],
					source: '/after-files-rewrite-with-empty-arrays',
				},
			],
			beforeFiles: [
				{
					destination: '/',
					has: [],
					missing: [],
					source: '/before-files-rewrite-with-empty-arrays',
				},
			],
			fallback: [
				{
					destination: '/',
					has: [],
					missing: [],
					source: '/fallback-rewrite-with-empty-arrays',
				},
			],
		};
	},
};
