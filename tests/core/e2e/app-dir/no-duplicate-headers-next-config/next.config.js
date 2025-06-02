/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	async headers() {
		return [
			{
				headers: [
					{
						key: 'cache-control',
						value: 'max-age=1234',
					},
				],
				source: '/favicon.ico',
			},
		];
	},
};

module.exports = nextConfig;
