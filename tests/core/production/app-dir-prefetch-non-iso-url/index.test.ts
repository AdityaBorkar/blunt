import { join } from 'node:path';
import { createNext, FileRef, type NextInstance } from 'e2e-utils';
import { check } from 'next-test-utils';
import webdriver from 'next-webdriver';

import type { BrowserInterface } from '../../lib/browsers/base';

describe('app-dir-prefetch-non-iso-url', () => {
	let next: NextInstance;

	beforeAll(async () => {
		next = await createNext({
			files: {
				app: new FileRef(join(__dirname, 'app')),
				'next.config.js': new FileRef(join(__dirname, 'next.config.js')),
			},
		});
	});
	afterAll(() => next.destroy());

	it('should go to iso url', async () => {
		let browser: BrowserInterface;

		try {
			browser = await webdriver(next.url, '/');
			await browser.elementByCss('#to-iso').click();
			await check(() => browser.elementByCss('#page').text(), '/[slug]');
		} finally {
			if (browser) {
				await browser.close();
			}
		}
	});

	it('should go to non-iso url', async () => {
		let browser: BrowserInterface;

		try {
			browser = await webdriver(next.url, '/');
			await browser.elementByCss('#to-non-iso').click();
			await check(() => browser.elementByCss('#page').text(), '/[slug]');
		} finally {
			if (browser) {
				await browser.close();
			}
		}
	});
});
