import { nextTestSetup } from 'e2e-utils';

describe('app-dir - devtool-copy-button', () => {
	const { next } = nextTestSetup({
		env: {
			DEBUG: '1',
			NODE_OPTIONS: '--inspect',
		},
		files: __dirname,
	});

	it('should has inspect url copy button', async () => {
		const browser = await next.browser('/');
		expect(
			await browser
				.elementByCss('[data-nextjs-data-runtime-error-copy-devtools-url]')
				.getAttribute('aria-label'),
		).toBe('Copy Chrome DevTools URL');
	});
});
