import { createNext, type NextInstance } from 'e2e-utils';
import { fetchViaHTTP } from 'next-test-utils';

describe('Rewritten API Requests should pass OPTIONS requests to the api function', () => {
	let next: NextInstance;

	beforeAll(async () => {
		next = await createNext({
			dependencies: {},
			files: {
				'pages/api/some-endpoint.js': `
          export default (req, res) => {
            res.end("successfully hit some-endpoint!")
          } 
        `,
			},
			nextConfig: {
				rewrites: () =>
					Promise.resolve({
						afterFiles: [],
						beforeFiles: [
							// Nextjs by default requires a /api prefix, let's remove that
							{
								destination: '/api/:path*',
								source: '/:path*',
							},
						],
						fallback: [],
					}),
			},
		});
	});
	afterAll(() => next.destroy());

	it('should pass OPTIONS requests to the api function', async () => {
		const res = await fetchViaHTTP(next.url, '/some-endpoint', null, {
			headers: {
				Origin: 'http://localhost:3000',
			},
			method: 'OPTIONS',
		});
		expect(await res.text()).toContain('successfully hit some-endpoint!');
	});
});
