import { join } from 'node:path';
import { createNext, FileRef, type NextInstance } from 'e2e-utils';
import { check } from 'next-test-utils';
import webdriver from 'next-webdriver';

const locales = ['', '/en', '/sv', '/nl'];

describe('i18n-ignore-redirect-source-locale', () => {
	let next: NextInstance;

	beforeAll(async () => {
		next = await createNext({
			dependencies: {},
			files: {
				pages: new FileRef(join(__dirname, 'app/pages')),
			},
			nextConfig: {
				i18n: {
					defaultLocale: 'en',
					locales: ['en', 'sv', 'nl'],
				},
				async redirects() {
					return [
						{
							destination: '/sv/newpage',
							locale: false,
							permanent: false,
							source: '/:locale/to-sv',
						},
						{
							destination: '/en/newpage',
							locale: false,
							permanent: false,
							source: '/:locale/to-en',
						},
						{
							destination: '/newpage',
							locale: false,
							permanent: false,
							source: '/:locale/to-slash',
						},
						{
							destination: '/:locale/newpage',
							locale: false,
							permanent: false,
							source: '/:locale/to-same',
						},
					];
				},
			},
		});
	});
	afterAll(() => next.destroy());

	test.each(locales)(
		'get redirected to the new page, from: %s to: sv',
		async (locale) => {
			const browser = await webdriver(next.url, `${locale}/to-sv`);
			await check(() => browser.elementById('current-locale').text(), 'sv');
		},
	);

	test.each(locales)(
		'get redirected to the new page, from: %s to: en',
		async (locale) => {
			const browser = await webdriver(next.url, `${locale}/to-en`);
			await check(() => browser.elementById('current-locale').text(), 'en');
		},
	);

	test.each(locales)(
		'get redirected to the new page, from: %s to: /',
		async (locale) => {
			const browser = await webdriver(next.url, `${locale}/to-slash`);
			await check(() => browser.elementById('current-locale').text(), 'en');
		},
	);

	test.each(locales)(
		'get redirected to the new page, from and to: %s',
		async (locale) => {
			const browser = await webdriver(next.url, `${locale}/to-same`);
			await check(
				() => browser.elementById('current-locale').text(),
				locale === '' ? 'en' : locale.slice(1),
			);
		},
	);
});
