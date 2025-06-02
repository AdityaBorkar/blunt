import { join } from 'node:path';
import { nextTestSetup } from 'e2e-utils';

describe('theme-ui SWC option', () => {
	const { next } = nextTestSetup({
		dependencies: {
			'theme-ui': '0.12.0',
		},
		files: join(__dirname, 'fixture'),
	});

	it('should have theme provided styling', async () => {
		const browser = await next.browser('/');
		const color = await browser.elementByCss('#hello').getComputedCss('color');
		expect(color).toBe('rgb(51, 51, 238)');
	});
});
