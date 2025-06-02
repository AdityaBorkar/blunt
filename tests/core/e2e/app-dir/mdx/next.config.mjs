import nextMDX from '@next/mdx';

const withMDX = nextMDX({
	extension: /\.mdx?$/,
	options: {
		rehypePlugins: [['rehype-katex', { strict: true, throwOnError: true }]],
		remarkPlugins: [],
	},
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		mdxRs: process.env.WITH_MDX_RS === 'true',
	},
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
};

export default withMDX(nextConfig);
