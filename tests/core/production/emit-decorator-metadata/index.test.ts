import { join } from 'node:path';
import { createNext, type NextInstance } from 'e2e-utils';
import { fetchViaHTTP } from 'next-test-utils';
import webdriver, { type BrowserInterface } from 'next-webdriver';

describe('emitDecoratorMetadata SWC option', () => {
	let next: NextInstance;

	beforeAll(async () => {
		next = await createNext({
			dependencies: {
				'path-to-regexp': '6.2.0',
				'reflect-metadata': '0.1.13',
				tsyringe: '4.6.0',
			},
			files: join(__dirname, 'app'),
		});
	});

	afterAll(() => next.destroy());

	it('should compile with emitDecoratorMetadata enabled', async () => {
		let browser: BrowserInterface;
		try {
			browser = await webdriver(next.url, '/');
			const message = await browser.elementByCss('#message').text();

			expect(message).toBe('Hello, world!');
		} finally {
			if (browser) {
				await browser.close();
			}
		}
	});

	it('should compile with emitDecoratorMetadata enabled for API', async () => {
		const res = await fetchViaHTTP(next.url, '/api/something');
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ message: 'Hello, world!' });
	});
});
