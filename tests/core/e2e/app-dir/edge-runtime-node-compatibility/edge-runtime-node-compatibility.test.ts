import { nextTestSetup } from 'e2e-utils';

describe('edge runtime node compatibility', () => {
	const { next, isNextStart } = nextTestSetup({
		files: __dirname,
	});

	it('[app] supports node:buffer', async () => {
		const res = await next.fetch('/buffer', {
			body: 'Hello, world!',
			method: 'POST',
		});
		const json = await res.json();
		expect(json).toEqual({
			'Buffer === B.Buffer': true,
			encoded: Buffer.from('Hello, world!').toString('base64'),
			exposedKeys: expect.arrayContaining([
				'constants',
				'kMaxLength',
				'kStringMaxLength',
				'Buffer',
				'SlowBuffer',
			]),
		});
	});

	it('[pages/api] supports node:buffer', async () => {
		const res = await next.fetch('/api/buffer', {
			body: 'Hello, world!',
			method: 'POST',
		});
		const json = await res.json();
		expect(json).toEqual({
			'B2.Buffer === B.Buffer': true,
			'Buffer === B.Buffer': true,
			encoded: 'SGVsbG8sIHdvcmxkIQ==',
			exposedKeys: expect.arrayContaining([
				'constants',
				'kMaxLength',
				'kStringMaxLength',
				'Buffer',
				'SlowBuffer',
			]),
			'typeof B.Buffer': 'function',
			'typeof B2.Buffer': 'function',
			'typeof Buffer': 'function',
		});
	});

	if (isNextStart) {
		it('does not warn when using supported node modules', () => {
			expect(next.cliOutput).not.toMatch(
				/A Node.js module is loaded \('async_hooks' at line \d+\) which is not supported in the Edge Runtime./,
			);
		});
	}
});
