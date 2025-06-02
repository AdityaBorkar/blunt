const withMDX = require('@next/mdx')();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		mdxRs: true,
	},
	modularizeImports: {
		'design-system/icons': {
			skipDefaultConversion: true,
			transform: 'design-system/icons/{{ kebabCase member }}',
		},
	},
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

module.exports = withMDX(nextConfig);
