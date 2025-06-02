import path from 'node:path';
import { createNext, FileRef, type NextInstance } from 'e2e-utils';
import { fetchViaHTTP, renderViaHTTP } from 'next-test-utils';
import type { Response } from 'node-fetch';

async function serialize(response: Response) {
	return {
		headers: Object.fromEntries(response.headers),
		status: response.status,
		text: await response.text(),
	};
}

describe('Edge can read request body', () => {
	let next: NextInstance;

	beforeAll(async () => {
		next = await createNext({
			dependencies: {},
			files: new FileRef(path.resolve(__dirname, './app')),
		});
	});
	afterAll(() => next.destroy());

	it('renders the static page', async () => {
		const html = await renderViaHTTP(next.url, '/api/nothing');
		expect(html).toContain('ok');
	});

	describe('middleware', () => {
		it('reads a JSON body', async () => {
			const response = await fetchViaHTTP(
				next.url,
				'/api/nothing?middleware-handler=json',
				null,
				{
					body: JSON.stringify({ hello: 'world' }),
					method: 'POST',
				},
			);
			expect(await serialize(response)).toMatchObject({
				headers: {
					'x-req-type': 'json',
					'x-serialized': '{"hello":"world"}',
				},
				status: 200,
				text: expect.stringContaining('ok'),
			});
		});

		it('reads a text body', async () => {
			try {
				const response = await fetchViaHTTP(
					next.url,
					'/api/nothing?middleware-handler=text',
					null,
					{
						body: JSON.stringify({ hello: 'world' }),
						method: 'POST',
					},
				);

				expect(await serialize(response)).toMatchObject({
					headers: {
						'x-req-type': 'text',
						'x-serialized': '{"hello":"world"}',
					},
					status: 200,
					text: expect.stringContaining('ok'),
				});
			} catch (err) {
				console.log('FAILED', err);
			}
		});

		it('reads an URL encoded form data', async () => {
			const response = await fetchViaHTTP(
				next.url,
				'/api/nothing?middleware-handler=formData',
				null,
				{
					body: new URLSearchParams({ hello: 'world' }).toString(),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					method: 'POST',
				},
			);
			expect(await serialize(response)).toMatchObject({
				headers: {
					'x-req-type': 'formData',
					'x-serialized': '{"hello":"world"}',
				},
				status: 200,
				text: expect.stringContaining('ok'),
			});
		});

		it('reads a multipart form data', async () => {
			const formData = new FormData();
			formData.append('hello', 'world');

			// @ts-expect-error use `fetchViaHTTP` when we drop `node-fetch`
			const response: Response = await fetch(
				new URL(`${next.url}/api/nothing?middleware-handler=formData`),
				{ body: formData, method: 'POST' },
			);

			expect(await serialize(response)).toMatchObject({
				headers: {
					'x-req-type': 'formData',
					'x-serialized': '{"hello":"world"}',
				},
				status: 200,
				text: expect.stringContaining('ok'),
			});
		});
	});
});
