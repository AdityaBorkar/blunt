import { nextTestSetup } from 'e2e-utils';

describe('remove-console', () => {
	const { next } = nextTestSetup({
		files: __dirname,
	});

	it('should remove console.log', async () => {
		const browser = await next.browser('/');
		expect(await browser.elementByCss('p').text()).toBe('hello client');

		const logs = await browser.log();

		expect(logs).not.toContainEqual({
			message: 'MY LOG MESSAGE',
			source: 'log',
		});
		expect(logs).toContainEqual({
			message: 'MY ERROR MESSAGE',
			source: 'error',
		});
	});
});
