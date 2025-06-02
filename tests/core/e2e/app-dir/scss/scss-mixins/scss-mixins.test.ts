import { nextTestSetup } from 'e2e-utils';

describe('Scss Mixins', () => {
	const { next } = nextTestSetup({
		dependencies: {
			sass: '1.72.0',
		},
		files: __dirname,
	});

	// Recommended for tests that need a full browser
	it('should work using browser', async () => {
		const browser = await next.browser('/');
		const element = await browser.elementByCss('#the-title');
		expect(await element.text()).toBe('Hello World');
		expect(await element.getComputedCss('z-index')).toBe('50');
	});
});
