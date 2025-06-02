const path = require('node:path');
module.exports = {
	onDemandEntries: {
		// Make sure entries are not getting disposed.
		maxInactiveAge: 1000 * 60 * 60,
	},
	webpack: (config, { defaultLoaders }) => {
		const resolvedBaseUrl = path.resolve(config.context, '../../');
		config.module.rules = [
			...config.module.rules,
			{
				exclude: (excludePath) => {
					return /node_modules/.test(excludePath);
				},
				include: [resolvedBaseUrl],
				test: /\.(tsx|ts|js|mjs|jsx)$/,
				use: defaultLoaders.babel,
			},
		];
		return config;
	},
};
