import { join } from 'node:path';
import { createNext, FileRef, type NextInstance } from 'e2e-utils';
import { check } from 'next-test-utils';
import webdriver from 'next-webdriver';

describe('Legacy decorators SWC option', () => {
	let next: NextInstance;

	beforeAll(async () => {
		next = await createNext({
			dependencies: {
				mobx: '6.3.7',
				'mobx-react': '7.2.1',
			},
			files: {
				'jsconfig.json': new FileRef(
					join(__dirname, 'legacy-decorators/jsconfig.json'),
				),
				pages: new FileRef(join(__dirname, 'legacy-decorators/pages')),
			},
		});
	});
	afterAll(() => next.destroy());

	it('should compile with legacy decorators enabled', async () => {
		let browser;
		try {
			browser = await webdriver(next.url, '/');
			const text = await browser.elementByCss('#count').text();
			expect(text).toBe('Current number: 0');
			await browser.elementByCss('#increase').click();
			await check(
				() => browser.elementByCss('#count').text(),
				/Current number: 1/,
			);
		} finally {
			if (browser) {
				await browser.close();
			}
		}
	});
});
