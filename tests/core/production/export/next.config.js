module.exports = (_phase) => {
	return {
		distDir: 'out',
		exportPathMap: () => ({
			'/': { page: '/' },
			'/about': { page: '/about' },
			// API route
			'/blog/nextjs/comment/test': { page: '/blog/[post]/comment/[id]' },
			'/button-link': { page: '/button-link' },
			'/counter': { page: '/counter' },
			'/dynamic': { page: '/dynamic', query: { text: 'cool dynamic text' } },
			'/dynamic-imports': { page: '/dynamic-imports' },
			'/dynamic/one': {
				page: '/dynamic',
				query: { text: 'next export is nice' },
			},
			'/dynamic/two': {
				page: '/dynamic',
				query: { text: 'Vercel is awesome' },
			},
			'/empty-hash-link': { page: '/empty-hash-link' },
			'/empty-query-link': { page: '/empty-query-link' },
			'/file-name.md': {
				page: '/dynamic',
				query: { text: 'this file has an extension' },
			},
			'/get-initial-props-with-no-query': {
				page: '/get-initial-props-with-no-query',
			},
			'/hash-link': { page: '/hash-link' },
			'/index': { page: '/' },
			'/query': { page: '/query', query: { a: 'blue' } },
			'/query-update': { page: '/query-update', query: { a: 'blue' } },
		}),
		output: 'export',
		publicRuntimeConfig: {
			foo: 'foo',
		},
		serverRuntimeConfig: {
			bar: 'bar',
		},
		trailingSlash: true, // end exportPathMap
	};
};
