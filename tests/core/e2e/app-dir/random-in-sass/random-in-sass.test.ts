import { nextTestSetup } from 'e2e-utils';

describe('random-in-sass', () => {
	const { next } = nextTestSetup({
		dependencies: {
			sass: 'latest',
		},
		files: __dirname,
	});

	it('should work using browser', async () => {
		const browser = await next.browser('/');
		expect(await browser.elementByCss('p').text()).toBe('Hello World');
		expect(await browser.elementByCss('p').getComputedCss('color')).toBe(
			'rgb(0, 255, 0)',
		);
	});
});
