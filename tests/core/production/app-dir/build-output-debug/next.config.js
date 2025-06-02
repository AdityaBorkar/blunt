/** @type {import('next').NextConfig} */
module.exports = {
	async headers() {
		return [
			{
				headers: [
					{
						key: 'x-custom-headers',
						value: 'headers',
					},
				],
				source: '/',
			},
		];
	},
	async redirects() {
		return [
			{
				destination: '/',
				permanent: true,
				source: '/redirects',
			},
		];
	},
	async rewrites() {
		return [
			{
				destination: '/',
				source: '/rewrites',
			},
		];
	},
};
