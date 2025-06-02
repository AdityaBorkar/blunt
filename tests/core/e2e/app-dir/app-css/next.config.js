const mdx = require('@next/mdx');

const withMDX = mdx();

const nextConfig = {
	experimental: {
		mdxRs: true,
	},
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

module.exports = withMDX(nextConfig);
