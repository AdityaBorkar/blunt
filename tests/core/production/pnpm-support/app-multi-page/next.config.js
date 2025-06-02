const path = require('node:path');

module.exports = {
	experimental: {
		// pnpm virtual-store-dir is outside the app directory
		outputFileTracingRoot: path.resolve(__dirname, '../'),
	},
	output: 'standalone',
};
