import { join } from 'node:path';
import { createNext, FileRef, type NextInstance } from 'e2e-utils';
import type { HistoryState } from 'next/dist/shared/lib/router/router';
import { check, waitFor } from 'next-test-utils';
import webdriver, { type BrowserInterface } from 'next-webdriver';

const emitPopsStateEvent = (browser: BrowserInterface, state: HistoryState) =>
	browser.eval(
		`window.dispatchEvent(new PopStateEvent("popstate", { state: ${JSON.stringify(
			state,
		)} }))`,
	);

describe('Event with stale state - static route previously was dynamic', () => {
	let next: NextInstance;

	beforeAll(async () => {
		next = await createNext({
			dependencies: {},
			files: {
				pages: new FileRef(join(__dirname, 'app/pages')),
				// Don't use next.config.js to avoid getting i18n
			},
		});
	});
	afterAll(() => next.destroy());

	test('Ignore event without query param', async () => {
		const browser = await webdriver(next.url, '/static');

		const state: HistoryState = {
			__N: true,
			as: '/static',
			key: '',
			options: {},
			url: '/[dynamic]?',
		};

		expect(await browser.elementByCss('#page-type').text()).toBe('static');

		// 1st event is ignored
		await emitPopsStateEvent(browser, state);
		await waitFor(1000);
		expect(await browser.elementByCss('#page-type').text()).toBe('static');

		// 2nd event isn't ignored
		await emitPopsStateEvent(browser, state);
		await check(() => browser.elementByCss('#page-type').text(), 'dynamic');
	});

	test('Ignore event with query param', async () => {
		const browser = await webdriver(next.url, '/static?param=1');

		const state: HistoryState = {
			__N: true,
			as: '/static?param=1',
			key: '',
			options: {},
			url: '/[dynamic]?param=1',
		};

		expect(await browser.elementByCss('#page-type').text()).toBe('static');

		// 1st event is ignored
		await emitPopsStateEvent(browser, state);
		await waitFor(1000);
		expect(await browser.elementByCss('#page-type').text()).toBe('static');

		// 2nd event isn't ignored
		await emitPopsStateEvent(browser, state);
		await check(() => browser.elementByCss('#page-type').text(), 'dynamic');
	});
});
