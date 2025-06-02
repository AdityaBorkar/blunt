import { nextTestSetup } from 'e2e-utils';
import { check } from 'next-test-utils';

describe('app dir - emotion-js', () => {
	const { next, skipped } = nextTestSetup({
		dependencies: {
			'@emotion/cache': 'latest',
			'@emotion/react': 'latest',
		},
		files: __dirname,
		skipDeployment: true,
	});

	if (skipped) {
		return;
	}

	it('should render emotion-js css with compiler.emotion option correctly', async () => {
		const browser = await next.browser('/');
		const el = browser.elementByCss('h1');
		expect(await el.text()).toBe('Blue');
		await check(
			async () =>
				await browser.eval(
					`window.getComputedStyle(document.querySelector('h1')).color`,
				),
			'rgb(0, 0, 255)',
		);
	});
});
