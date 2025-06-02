module.exports = {
	experimental: {
		optimizePackageImports: ['my-lib', 'recursive-barrel', 'my-client-lib'],
	},
	transpilePackages: ['my-client-lib'],
};
