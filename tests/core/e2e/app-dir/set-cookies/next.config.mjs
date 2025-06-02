import { nextConfigHeaders } from './cookies.mjs';

const headers = nextConfigHeaders.map((header) => ({
	key: 'Set-Cookie',
	value: header,
}));

/**
 * @type {import('next').NextConfig}
 */
const config = {
	async headers() {
		return [
			{
				has: [
					{
						key: 'next-config-headers',
						type: 'query',
						value: 'true',
					},
				],
				headers,
				source: '/:path*',
			},
		];
	},
};

export default config;
