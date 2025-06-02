import { nextTestSetup } from 'e2e-utils';

describe('ipc-forbidden-headers', () => {
	const { next } = nextTestSetup({
		files: __dirname,
	});

	it('should not error if expect header is included', async () => {
		let res = await next.fetch('/api/pages-api', {
			headers: { expect: '100-continue' },
			method: 'POST',
		});
		let text = await res.text();

		expect(text).toEqual('Hello, Next.js!');

		res = await next.fetch('/api/app-api', {
			headers: {
				expect: '100-continue',
			},
			method: 'POST',
		});
		text = await res.text();

		expect(text).toEqual('Hello, Next.js!');
		expect(next.cliOutput).not.toContain('UND_ERR_NOT_SUPPORTED');
	});

	it("should not error on content-length: 0 if request shouldn't contain a payload", async () => {
		let res = await next.fetch('/api/pages-api', {
			headers: { 'content-length': '0' },
			method: 'DELETE',
		});

		expect(res.status).toBe(200);

		res = await next.fetch('/api/app-api', {
			headers: { 'content-length': '0' },
			method: 'DELETE',
		});

		expect(res.status).toBe(200);
		expect(next.cliOutput).not.toContain('UND_ERR_REQ_CONTENT_LENGTH_MISMATCH');
	});
});
