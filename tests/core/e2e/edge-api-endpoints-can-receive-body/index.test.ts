import path from 'node:path';
import { createNext, FileRef, type NextInstance } from 'e2e-utils';
import { fetchViaHTTP } from 'next-test-utils';

describe('Edge API endpoints can receive body', () => {
	let next: NextInstance;

	beforeAll(async () => {
		next = await createNext({
			dependencies: {},
			files: {
				'pages/api/edge.js': new FileRef(
					path.resolve(__dirname, './app/pages/api/edge.js'),
				),
				'pages/api/index.js': new FileRef(
					path.resolve(__dirname, './app/pages/api/index.js'),
				),
			},
		});
	});
	afterAll(() => next.destroy());

	it('reads the body as text', async () => {
		const res = await fetchViaHTTP(
			next.url,
			'/api/edge',
			{},
			{
				body: 'hello, world.',
				method: 'POST',
			},
		);

		expect(res.status).toBe(200);
		expect(await res.text()).toBe('got: hello, world.');
	});

	it('reads the body from index', async () => {
		const res = await fetchViaHTTP(
			next.url,
			'/api',
			{},
			{
				body: 'hello, world.',
				method: 'POST',
			},
		);

		expect(res.status).toBe(200);
		expect(await res.text()).toBe('got: hello, world.');
	});
});
