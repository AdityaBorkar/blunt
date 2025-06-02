module.exports = {
	reactStrictMode: true,
	serverExternalPackages: [
		'conditional-exports-optout',
		'dual-pkg-optout',
		'transitive-external',
		'esm',
	],
	transpilePackages: ['css', 'font', 'transpile-ts-lib', 'transpile-cjs-lib'],
};
