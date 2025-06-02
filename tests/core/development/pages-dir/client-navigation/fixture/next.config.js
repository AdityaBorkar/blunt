/** @type {import('next').NextConfig} */
module.exports = {
	// scroll position can be finicky with the
	// indicators showing so hide by default
	devIndicators: false,
	experimental: {
		strictNextHead: process.env.TEST_STRICT_NEXT_HEAD !== 'false',
	},
	onDemandEntries: {
		// Make sure entries are not getting disposed.
		maxInactiveAge: 1000 * 60 * 60,
	},
};
