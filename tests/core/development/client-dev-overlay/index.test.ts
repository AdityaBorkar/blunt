import { join } from 'node:path';
import { createNext, FileRef, type NextInstance } from 'e2e-utils';
import { retry } from 'next-test-utils';
import webdriver, { type BrowserInterface } from 'next-webdriver';

describe('client-dev-overlay', () => {
	let next: NextInstance;
	let browser: BrowserInterface;

	beforeAll(async () => {
		next = await createNext({
			env: {
				// Disable the cooldown period for the dev indicator so that hiding the indicator in a test doesn't
				// impact subsequent tests.
				__NEXT_DEV_INDICATOR_COOLDOWN_MS: '0',
			},
			files: {
				pages: new FileRef(join(__dirname, 'app/pages')),
			},
		});
	});
	beforeEach(async () => {
		browser = await webdriver(next.url, '');
	});
	afterAll(() => next.destroy());

	// The `BrowserInterface.hasElementByCssSelector` cannot be used for elements inside a shadow DOM.
	function elementExistsInNextJSPortalShadowDOM(selector: string) {
		return browser.eval(
			`!!document.querySelector('nextjs-portal').shadowRoot.querySelector('${selector}')`,
		) as any;
	}
	const selectors = {
		fullScreenDialog: '[data-nextjs-dialog]',
		hideButton: '[data-hide-dev-tools]',
		indicator: '[data-next-badge-root]',
		minimizeButton: 'body',
		popover: '[data-nextjs-dev-tools-button]',
		preferencesButton: '[data-preferences]',
		toast: '[data-nextjs-toast]',
	};
	function getToast() {
		return browser.elementByCss(selectors.toast);
	}
	function getPopover() {
		return browser.elementByCss(selectors.popover);
	}
	function getMinimizeButton() {
		return browser.elementByCss(selectors.minimizeButton);
	}
	function getHideButton() {
		return browser.elementByCss(selectors.hideButton);
	}
	function getPreferencesButton() {
		return browser.elementByCss(selectors.preferencesButton);
	}

	it('should be able to fullscreen the minimized overlay', async () => {
		await getMinimizeButton().click();
		await getToast().click();

		await retry(async () => {
			expect(
				await elementExistsInNextJSPortalShadowDOM(selectors.fullScreenDialog),
			).toBe(true);
		});
	});

	it('should be able to minimize the fullscreen overlay', async () => {
		await getMinimizeButton().click();
		expect(await elementExistsInNextJSPortalShadowDOM(selectors.toast)).toBe(
			true,
		);
	});

	it('should keep the error indicator visible when there are errors', async () => {
		await getMinimizeButton().click();
		await getPopover().click();
		await getPreferencesButton().click();
		await getHideButton().click();

		await retry(async () => {
			const display = await browser.eval(
				`getComputedStyle(document.querySelector('nextjs-portal').shadowRoot.querySelector('${selectors.indicator}')).display`,
			);
			expect(display).toBe('block');
		});
	});

	it('should be possible to hide the minimized overlay when there are no errors', async () => {
		const originalContent = await next.readFile('pages/index.js');
		try {
			await next.patchFile('pages/index.js', (content) => {
				return content.replace(`throw Error('example runtime error')`, '');
			});

			await getMinimizeButton().click();
			await getPopover().click();
			await getPreferencesButton().click();
			await getHideButton().click();

			await retry(async () => {
				const display = await browser.eval(
					`getComputedStyle(document.querySelector('nextjs-portal').shadowRoot.querySelector('${selectors.indicator}')).display`,
				);
				expect(display).toBe('none');
			});
		} finally {
			await next.patchFile('pages/index.js', originalContent);
		}
	});

	it('should have a role of "dialog" if the page is focused', async () => {
		await retry(async () => {
			expect(
				await elementExistsInNextJSPortalShadowDOM('[role="dialog"]'),
			).toBe(true);
		});
	});
});
