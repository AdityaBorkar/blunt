import { join } from 'node:path';
import { nextTestSetup } from 'e2e-utils';

describe('emotion SWC option', () => {
	const { next } = nextTestSetup({
		dependencies: {
			'@emotion/cache': '11.10.3',
			'@emotion/react': '11.10.4',
			'@emotion/styled': '11.10.4',
		},
		files: join(__dirname, 'fixture'),
	});

	it('should have styling from the css prop', async () => {
		const browser = await next.browser('/');

		const color = await browser
			.elementByCss('#test-element')
			.getComputedCss('background-color');
		expect(color).toBe('rgb(255, 192, 203)');
	});
});
