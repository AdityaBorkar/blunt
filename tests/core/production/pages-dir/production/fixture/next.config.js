// intervals/open connections shouldn't block build from exiting
setInterval(() => {}, 250);

module.exports = {
	images: {
		// Make sure we have sane default CSP, even when SVG is enabled
		dangerouslyAllowSVG: true,
	},
	onDemandEntries: {
		// Make sure entries are not getting disposed.
		maxInactiveAge: 1000 * 60 * 60,
	},
	redirects() {
		return [
			{
				destination: '/:lang/about',
				permanent: false,
				source: '/redirect/me/to-about/:lang',
			},
			{
				destination: '/about',
				permanent: false,
				source: '/nonexistent',
			},
			{
				destination: '/about',
				permanent: false,
				source: '/shadowed-page',
			},
			{
				destination: '/about?foo=:path',
				permanent: false,
				source: '/redirect-query-test/:path',
			},
		];
	},
	rewrites() {
		// add a rewrite so the code isn't dead-code eliminated
		return [
			{
				destination: '/',
				source: '/some-rewrite',
			},
		];
	},
};
