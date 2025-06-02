/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	headers() {
		return [
			{
				headers: [
					{
						key: 'Cache-Control',
						value: 's-maxage=30',
					},
				],
				source: '/app-ssg/first',
			},
			{
				headers: [
					{
						key: 'Cache-Control',
						value: 's-maxage=31',
					},
				],
				source: '/app-ssg/lazy',
			},
			{
				headers: [
					{
						key: 'Cache-Control',
						value: 's-maxage=32',
					},
				],
				source: '/app-ssr',
			},
			{
				headers: [
					{
						key: 'Cache-Control',
						value: 's-maxage=33',
					},
				],
				source: '/pages-auto-static',
			},
			{
				headers: [
					{
						key: 'Cache-Control',
						value: 's-maxage=34',
					},
				],
				source: '/pages-ssg/first',
			},
			{
				headers: [
					{
						key: 'Cache-Control',
						value: 's-maxage=35',
					},
				],
				source: '/pages-ssg/lazy',
			},
			{
				headers: [
					{
						key: 'Cache-Control',
						value: 's-maxage=36',
					},
				],
				source: '/pages-ssr',
			},
		];
	},
};

module.exports = nextConfig;
