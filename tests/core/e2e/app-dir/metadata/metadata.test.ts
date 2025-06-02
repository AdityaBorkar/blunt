import fs from 'node:fs/promises';
import path from 'node:path';
import { nextTestSetup } from 'e2e-utils';
import {
	check,
	checkLink,
	checkMetaNameContentPair,
	createDomMatcher,
	createMultiDomMatcher,
	createMultiHtmlMatcher,
	getTitle,
} from 'next-test-utils';

describe('app dir - metadata', () => {
	const { next, isNextDev, isNextStart, isNextDeploy } = nextTestSetup({
		files: __dirname,
	});

	describe('basic', () => {
		it('should support title and description', async () => {
			const browser = await next.browser('/title');
			expect(await browser.eval(`document.title`)).toBe(
				'this is the page title',
			);
			await checkMetaNameContentPair(
				browser,
				'description',
				'this is the layout description',
			);
		});

		it('should support title template', async () => {
			const browser = await next.browser('/title-template');
			// Use the parent layout (root layout) instead of app/title-template/layout.tsx
			expect(await browser.eval(`document.title`)).toBe('Page');
		});

		it('should support stashed title in one layer of page and layout', async () => {
			const browser = await next.browser('/title-template/extra');
			// Use the parent layout (app/title-template/layout.tsx) instead of app/title-template/extra/layout.tsx
			expect(await browser.eval(`document.title`)).toBe('Extra Page | Layout');
		});

		it('should use parent layout title when no title is defined in page', async () => {
			const browser = await next.browser('/title-template/use-layout-title');
			expect(await browser.eval(`document.title`)).toBe(
				'title template layout default',
			);
		});

		it('should support stashed title in two layers of page and layout', async () => {
			const $inner = await next.render$('/title-template/extra/inner');
			expect(await $inner('title').text()).toBe('Inner Page | Extra Layout');

			const $deep = await next.render$('/title-template/extra/inner/deep');
			expect(await $deep('title').text()).toBe('extra layout default | Layout');
		});

		it('should support other basic tags', async () => {
			const browser = await next.browser('/basic');
			const matchDom = createDomMatcher(browser);
			const matchMultiDom = createMultiDomMatcher(browser);

			await matchMultiDom('meta', 'name', 'content', {
				'application-name': 'test',
				author: ['huozhi', 'tree'],
				'color-scheme': 'dark',
				creator: 'shu',
				'format-detection': 'telephone=no, address=no, email=no',
				generator: 'next.js',
				keywords: 'next.js,react,javascript',
				publisher: 'vercel',
				referrer: 'origin-when-cross-origin',
				robots: 'index, follow',
				viewport:
					'width=device-width, initial-scale=1, maximum-scale=1, interactive-widget=resizes-visual',
			});

			await matchMultiDom('link', 'rel', 'href', {
				author: 'https://tree.com',
				'dns-prefetch': '/dns-prefetch-url',
				manifest: '/api/manifest',
				next: '/basic?page=3',
				preconnect: '/preconnect-url',
				preload: '/api/preload',
				prev: '/basic?page=1',
			});

			// Manifest link should have crossOrigin attribute
			await matchDom('link', 'rel="manifest"', {
				crossOrigin: isNextDeploy ? 'use-credentials' : null,
				href: '/api/manifest',
			});

			await matchDom('meta', 'name="theme-color"', {
				content: 'cyan',
				media: '(prefers-color-scheme: dark)',
			});
		});

		it('should support other basic tags (edge)', async () => {
			const browser = await next.browser('/basic-edge');
			const matchMultiDom = createMultiDomMatcher(browser);
			const matchDom = createDomMatcher(browser);

			await matchMultiDom('meta', 'name', 'content', {
				'application-name': 'test',
				author: ['huozhi', 'tree'],
				'format-detection': 'telephone=no, address=no, email=no',
				generator: 'next.js',
				keywords: 'next.js,react,javascript',
				referrer: 'origin-when-cross-origin',
				robots: 'index, follow',
			});

			await matchMultiDom('link', 'rel', 'href', {
				author: 'https://tree.com',
				'dns-prefetch': '/dns-prefetch-url',
				manifest: '/api/manifest',
				next: '/basic?page=3',
				preconnect: '/preconnect-url',
				preload: '/api/preload',
				prev: '/basic?page=1',
			});

			// Manifest link should have crossOrigin attribute
			await matchDom('link', 'rel="manifest"', {
				crossOrigin: isNextDeploy ? 'use-credentials' : null,
				href: '/api/manifest',
			});
		});

		it('should support apple related tags `itunes` and `appWebApp`', async () => {
			const browser = await next.browser('/apple');
			const matchMultiDom = createMultiDomMatcher(browser);

			await matchMultiDom('meta', 'name', 'content', {
				'apple-itunes-app': 'app-id=myAppStoreID, app-argument=myAppArgument',
				'apple-mobile-web-app-status-bar-style': 'black-translucent',
				'apple-mobile-web-app-title': 'Apple Web App',
				'mobile-web-app-capable': 'yes',
			});

			const matchDom = createDomMatcher(browser);

			await matchDom(
				'link',
				'href="/assets/startup/apple-touch-startup-image-768x1004.png"',
				{
					media: null,
					rel: 'apple-touch-startup-image',
				},
			);

			await matchDom(
				'link',
				'href="/assets/startup/apple-touch-startup-image-1536x2008.png"',
				{
					media: '(device-width: 768px) and (device-height: 1024px)',
					rel: 'apple-touch-startup-image',
				},
			);
		});

		it('should support socials related tags like facebook and pinterest', async () => {
			const browser = await next.browser('/socials');
			const matchMultiDom = createMultiDomMatcher(browser);

			await matchMultiDom('meta', 'property', 'content', {
				'fb:admins': ['120', '122', '124'],
				'fb:app_id': '12345678',
				'pinterest-rich-pin': 'true',
			});
		});

		it('should support alternate tags', async () => {
			const browser = await next.browser('/alternates');
			const matchDom = createDomMatcher(browser);

			await matchDom('link', 'rel="canonical"', {
				href: 'https://example.com/alternates',
			});
			await matchDom('link', 'title="js title"', {
				href: 'https://example.com/blog/js.rss',
				type: 'application/rss+xml',
			});
			await matchDom('link', 'title="rss"', {
				href: 'https://example.com/blog.rss',
				type: 'application/rss+xml',
			});
			await matchDom('link', 'hreflang="en-US"', {
				href: 'https://example.com/alternates/en-US',
				rel: 'alternate',
			});
			await matchDom('link', 'hreflang="de-DE"', {
				href: 'https://example.com/alternates/de-DE',
				rel: 'alternate',
			});
			await matchDom('link', 'media="only screen and (max-width: 600px)"', {
				href: 'https://example.com/mobile',
				rel: 'alternate',
			});
		});

		it('should relative canonical url', async () => {
			const browser = await next.browser('/alternates/child');
			const matchDom = createDomMatcher(browser);
			await matchDom('link', 'rel="canonical"', {
				href: 'https://example.com/alternates/child',
			});
			await matchDom('link', 'hreflang="en-US"', {
				href: 'https://example.com/alternates/child/en-US',
				rel: 'alternate',
			});
			await matchDom('link', 'hreflang="de-DE"', {
				href: 'https://example.com/alternates/child/de-DE',
				rel: 'alternate',
			});

			await browser.loadPage(`${next.url}/alternates/child/123`);
			await matchDom('link', 'rel="canonical"', {
				href: 'https://example.com/alternates/child/123',
			});
		});

		it('should not contain query in canonical url after client navigation', async () => {
			const browser = await next.browser('/');
			await browser.waitForElementByCss('p#index');
			await browser.eval(`next.router.push('/alternates')`);
			// wait for /alternates page is loaded
			await browser.waitForElementByCss('p#alternates');

			const matchDom = createDomMatcher(browser);
			await matchDom('link', 'rel="canonical"', {
				href: 'https://example.com/alternates',
			});
			await matchDom('link', 'title="js title"', {
				href: 'https://example.com/blog/js.rss',
				type: 'application/rss+xml',
			});
		});

		it('should support robots tags', async () => {
			const $ = await next.render$('/robots');
			const matchMultiDom = createMultiHtmlMatcher($);
			matchMultiDom('meta', 'name', 'content', {
				googlebot:
					'index, nofollow, noimageindex, max-video-preview:standard, max-image-preview:-1, max-snippet:-1',
				robots: 'noindex, follow, nocache',
			});
		});

		it('should support verification tags', async () => {
			const $ = await next.render$('/verification');
			const matchMultiDom = createMultiHtmlMatcher($);
			matchMultiDom('meta', 'name', 'content', {
				'google-site-verification': 'google',
				me: ['my-email', 'my-link'],
				y_key: 'yahoo',
				'yandex-verification': 'yandex',
			});
			expect($('meta[name="me"]').length).toBe(2);
		});

		it('should support appLinks tags', async () => {
			const browser = await next.browser('/app-links');
			const matchMultiDom = createMultiDomMatcher(browser);
			await matchMultiDom('meta', 'property', 'content', {
				'al:android:app_name': 'app_name_android',
				'al:android:package': 'com.example.android/package',
				'al:ios:app_store_id': 'app_store_id',
				'al:ios:url': 'https://example.com/ios',
				'al:web:should_fallback': 'true',
			});
		});

		it('should apply metadata when navigating client-side', async () => {
			const browser = await next.browser('/');

			expect(await getTitle(browser)).toBe('index page');
			await browser
				.elementByCss('#to-basic')
				.click()
				.waitForElementByCss('#basic');

			await checkMetaNameContentPair(
				browser,
				'referrer',
				'origin-when-cross-origin',
			);
			await browser.back().waitForElementByCss('#index');
			expect(await getTitle(browser)).toBe('index page');
			await browser
				.elementByCss('#to-title')
				.click()
				.waitForElementByCss('#title');
			expect(await getTitle(browser)).toBe('this is the page title');
		});

		it('should support generateMetadata dynamic props', async () => {
			const browser = await next.browser('/dynamic/slug');
			expect(await getTitle(browser)).toBe('params - slug');

			await checkMetaNameContentPair(browser, 'keywords', 'parent,child');

			await browser.loadPage(`${next.url}/dynamic/blog?q=xxx`);
			await check(
				() => browser.elementByCss('p').text(),
				/params - blog query - xxx/,
			);
		});

		it('should handle metadataBase for urls resolved as only URL type', async () => {
			// including few urls in opengraph and alternates
			const url$ = await next.render$('/metadata-base/url');

			// compose with metadataBase
			expect(url$('link[rel="canonical"]').attr('href')).toBe(
				'https://bar.example/url/subpath',
			);

			// override metadataBase
			const urlInstance$ = await next.render$('/metadata-base/url-instance');
			expect(urlInstance$('meta[property="og:url"]').attr('content')).toBe(
				'https://outerspace.com/huozhi.png',
			);
		});
	});

	describe('opengraph', () => {
		it('should support opengraph tags', async () => {
			const browser = await next.browser('/opengraph');
			const matchMultiDom = createMultiDomMatcher(browser);
			await matchMultiDom('meta', 'property', 'content', {
				'og:audio': 'https://example.com/audio.mp3',
				'og:description': 'My custom description',
				'og:image': [
					'https://example.com/image.png',
					'https://example.com/image2.png',
				],
				'og:image:alt': 'My custom alt',
				'og:image:height': ['600', '1600'],
				'og:image:width': ['800', '1800'],
				'og:locale': 'en-US',
				'og:site_name': 'My custom site name',
				'og:title': 'My custom title',
				'og:type': 'website',
				'og:url': 'https://example.com',
				'og:video': 'https://example.com/video.mp4',
				'og:video:height': '450',
				'og:video:width': '800',
			});

			await matchMultiDom('meta', 'name', 'content', {
				'twitter:card': 'summary_large_image',
				'twitter:description': 'My custom description',
				'twitter:image': [
					'https://example.com/image.png',
					'https://example.com/image2.png',
				],
				'twitter:image:alt': 'My custom alt',
				'twitter:image:height': ['600', '1600'],
				'twitter:image:width': ['800', '1800'],
				'twitter:title': 'My custom title',
			});
		});

		it('should support opengraph with article type', async () => {
			const browser = await next.browser('/opengraph/article');
			const matchMultiDom = createMultiDomMatcher(browser);
			await matchMultiDom('meta', 'property', 'content', {
				'article:author': ['author1', 'author2', 'author3'],
				'article:published_time': '2023-01-01T00:00:00.000Z',
				'og:description': 'My custom description',
				'og:email': 'author@vercel.com',
				'og:fax_number': '1234567890',
				'og:image': 'https://example.com/og-image.jpg',
				'og:phone_number': '1234567890',
				'og:title': 'My custom title | Layout open graph title',
				'og:type': 'article',
			});
		});

		it('should pick up opengraph-image and twitter-image as static metadata files', async () => {
			const $ = await next.render$('/opengraph/static');

			const match = createMultiHtmlMatcher($);
			match('meta', 'property', 'content', {
				'og:image': isNextDev
					? expect.stringMatching(
							/http:\/\/localhost:\d+\/opengraph\/static\/opengraph-image/,
						)
					: expect.stringMatching(
							new RegExp(
								`https:\\/\\/(${
									isNextDeploy ? '.*?\\.vercel\\.app' : 'example\\.com'
								})\\/opengraph\\/static\\/opengraph-image`,
							),
						),
				'og:image:alt': 'A alt txt for og',
				'og:image:height': '114',
				'og:image:type': 'image/png',
				'og:image:width': '114',
			});

			match('meta', 'name', 'content', {
				'twitter:card': 'summary_large_image',
				'twitter:image': isNextDev
					? expect.stringMatching(
							/http:\/\/localhost:\d+\/opengraph\/static\/twitter-image/,
						)
					: expect.stringMatching(
							new RegExp(
								`https:\\/\\/(${
									isNextDeploy ? '.*?\\.vercel\\.app' : 'example\\.com'
								})\\/opengraph\\/static\\/twitter-image`,
							),
						),
				'twitter:image:alt': 'A alt txt for twitter',
			});

			// favicon shouldn't be overridden
			expect($('link[rel="icon"]').attr('href')).toMatch('/favicon.ico');
		});

		it('should override file based images when opengraph-image and twitter-image specify images property', async () => {
			const $ = await next.render$('/opengraph/static/override');

			const match = createMultiHtmlMatcher($);
			match('meta', 'property', 'content', {
				'og:image': undefined,
				'og:title': 'no-og-image',
			});

			match('meta', 'name', 'content', {
				'twitter:image': undefined,
				'twitter:title': 'no-tw-image',
			});

			// icon should be overridden and contain favicon.ico
			const [favicon, ...icons] = $('link[rel="icon"]')
				.toArray()
				.map((i) => $(i).attr('href'));

			expect(favicon).toMatch('/favicon.ico');
			expect(icons).toEqual(['https://custom-icon-1.png']);
		});

		it('metadataBase should override fallback base for resolving OG images', async () => {
			const browser = await next.browser('/metadata-base/opengraph');
			const matchMultiDom = createMultiDomMatcher(browser);

			await matchMultiDom('meta', 'property', 'content', {
				'og:image': 'https://acme.com/og-image.png',
			});
		});
	});

	describe('icons', () => {
		it('should support basic object icons field', async () => {
			const browser = await next.browser('/icons');

			await checkLink(browser, 'shortcut icon', '/shortcut-icon.png');
			await checkLink(browser, 'icon', '/icon.png');
			await checkLink(browser, 'apple-touch-icon', '/apple-icon.png');
			await checkLink(browser, 'other-touch-icon', '/other-touch-icon.png');
		});

		it('should support basic string icons field', async () => {
			const browser = await next.browser('/icons/string');
			await checkLink(browser, 'icon', '/icon.png');
		});

		it('should support basic complex descriptor icons field', async () => {
			const browser = await next.browser('/icons/descriptor');
			const matchDom = createDomMatcher(browser);

			await checkLink(browser, 'shortcut icon', '/shortcut-icon.png');
			await checkLink(browser, 'icon', [
				expect.stringMatching(/favicon\.ico/),
				'/icon.png',
				'https://example.com/icon.png',
			]);
			await checkLink(browser, 'apple-touch-icon', [
				'/icon2.png',
				'/apple-icon.png',
				'/apple-icon-x3.png',
			]);

			await checkLink(browser, 'other-touch-icon', '/other-touch-icon.png');

			await matchDom('link', 'href="/apple-icon-x3.png"', {
				sizes: '180x180',
				type: 'image/png',
			});
		});

		it('should merge icons from layout if no static icons files are specified', async () => {
			const browser = await next.browser('/icons/descriptor/from-layout');
			const matchDom = createDomMatcher(browser);

			await matchDom('link', 'href="favicon-light.png"', {
				media: '(prefers-color-scheme: light)',
			});
			await matchDom('link', 'href="favicon-dark.png"', {
				media: '(prefers-color-scheme: dark)',
			});
		});

		it('should not hoist meta[itemProp] to head', async () => {
			const $ = await next.render$('/');
			expect($('head meta[itemProp]').length).toBe(0);
			expect($('header meta[itemProp]').length).toBe(1);
		});

		it('should support root level of favicon.ico', async () => {
			let $ = await next.render$('/');
			const favIcon = $('link[rel="icon"]');
			expect(favIcon.attr('href')).toMatch('/favicon.ico');
			expect(favIcon.attr('type')).toBe('image/x-icon');
			// Turbopack renders / emits image differently
			expect(['16x16', '48x48']).toContain(favIcon.attr('sizes'));

			const iconSvg = $('link[rel="icon"][type="image/svg+xml"]');
			expect(iconSvg.attr('href')).toMatch('/icon.svg?');
			// Turbopack renders / emits image differently
			expect(['any', '48x48']).toContain(iconSvg.attr('sizes'));

			$ = await next.render$('/basic');
			const icon = $('link[rel="icon"]');
			expect(icon.attr('href')).toMatch('/favicon.ico');
			expect(['16x16', '48x48']).toContain(favIcon.attr('sizes'));

			if (!isNextDeploy) {
				const faviconFileBuffer = await fs.readFile(
					path.join(next.testDir, 'app/favicon.ico'),
				);
				const faviconResponse = Buffer.from(
					await next.fetch('/favicon.ico').then((res) => res.arrayBuffer()),
				);
				return expect(Buffer.compare(faviconResponse, faviconFileBuffer)).toBe(
					0,
				);
			}
		});
	});

	describe('file based icons', () => {
		it('should render icon and apple touch icon meta if their images are specified', async () => {
			const $ = await next.render$('/icons/static/nested');

			const $icon = $('head > link[rel="icon"][type!="image/x-icon"]');
			const $appleIcon = $('head > link[rel="apple-touch-icon"]');

			expect($icon.attr('href')).toMatch(/\/icons\/static\/nested\/icon1/);
			expect($icon.attr('sizes')).toBe('32x32');
			expect($icon.attr('type')).toBe('image/png');
			expect($appleIcon.attr('href')).toMatch(
				/\/icons\/static\/nested\/apple-icon/,
			);
			expect($appleIcon.attr('type')).toBe('image/png');
			expect($appleIcon.attr('sizes')).toMatch('114x114');
		});

		it('should not render if image file is not specified', async () => {
			const $ = await next.render$('/icons/static');

			const $icon = $('head > link[rel="icon"][type!="image/x-icon"]');

			expect($icon.attr('href')).toMatch(/\/icons\/static\/icon/);
			expect($icon.attr('sizes')).toBe('114x114');

			// No apple icon if it's not provided
			const $appleIcon = $('head > link[rel="apple-touch-icon"]');
			expect($appleIcon.length).toBe(0);

			const $dynamic = await next.render$('/icons/static/dynamic-routes/123');
			const $dynamicIcon = $dynamic(
				'head > link[rel="icon"][type!="image/x-icon"]',
			);
			const dynamicIconHref = $dynamicIcon.attr('href');
			expect(dynamicIconHref).toMatch(
				/\/icons\/static\/dynamic-routes\/123\/icon/,
			);
			const dynamicIconRes = await next.fetch(dynamicIconHref);
			expect(dynamicIconRes.status).toBe(200);
		});
	});

	describe('twitter', () => {
		it('should support twitter card summary_large_image when image present', async () => {
			const browser = await next.browser('/twitter');
			const matchMultiDom = createMultiDomMatcher(browser);

			await matchMultiDom('meta', 'name', 'content', {
				'twitter:card': 'summary_large_image',
				'twitter:creator': 'creator',
				'twitter:creator:id': 'creatorId',
				'twitter:description': 'Twitter Description',
				'twitter:image': 'https://twitter.com/image.png',
				'twitter:image:secure_url': 'https://twitter.com/secure.png',
				'twitter:site:id': 'siteId',
				'twitter:title': 'Twitter Title',
			});
		});

		it('should render twitter card summary when image is not present', async () => {
			const browser = await next.browser('/twitter/no-image');
			const matchMultiDom = createMultiDomMatcher(browser);

			await matchMultiDom('meta', 'name', 'content', {
				'twitter:card': 'summary',
				'twitter:creator': 'creator',
				'twitter:creator:id': 'creatorId',
				'twitter:description': 'Twitter Description',
				'twitter:site:id': 'siteId',
				'twitter:title': 'Twitter Title',
			});
		});

		it('should support default twitter player card', async () => {
			const browser = await next.browser('/twitter/player');
			const matchMultiDom = createMultiDomMatcher(browser);

			await matchMultiDom('meta', 'name', 'content', {
				// player properties
				'twitter:card': 'player',
				'twitter:creator': 'creator',
				'twitter:creator:id': 'creatorId',
				'twitter:description': 'Twitter Description',
				'twitter:image': 'https://twitter.com/image.png',
				'twitter:player': 'https://twitter.com/player',
				'twitter:player:height': '100',
				'twitter:player:stream': 'https://twitter.com/stream',
				'twitter:player:width': '100',
				'twitter:site:id': 'siteId',
				'twitter:title': 'Twitter Title',
			});
		});

		it('should support default twitter app card', async () => {
			const browser = await next.browser('/twitter/app');
			const matchMultiDom = createMultiDomMatcher(browser);

			await matchMultiDom('meta', 'name', 'content', {
				'twitter:app:id:googleplay': 'twitter_app://googleplay',
				'twitter:app:id:ipad': 'twitter_app://ipad',
				'twitter:app:id:iphone': 'twitter_app://iphone',
				'twitter:app:url:googleplay': undefined,
				'twitter:app:url:ipad': 'https://ipad_url',
				'twitter:app:url:iphone': 'https://iphone_url',
				// app properties
				'twitter:card': 'app',
				'twitter:creator': 'creator',
				'twitter:creator:id': 'creatorId',
				'twitter:description': 'Twitter Description',
				'twitter:image': [
					'https://twitter.com/image-100x100.png',
					'https://twitter.com/image-200x200.png',
				],
				'twitter:site:id': 'siteId',
				'twitter:title': 'Twitter Title',
			});
		});
	});

	describe('static routes', () => {
		it('should have /favicon.ico as route', async () => {
			const res = await next.fetch('/favicon.ico');
			expect(res.status).toBe(200);
			expect(res.headers.get('content-type')).toBe('image/x-icon');
			expect(res.headers.get('cache-control')).toBe(
				'public, max-age=0, must-revalidate',
			);
		});

		it('should have icons as route', async () => {
			const resIcon = await next.fetch('/icons/static/icon.png');
			const resAppleIcon = await next.fetch(
				'/icons/static/nested/apple-icon.png',
			);

			expect(resAppleIcon.status).toBe(200);
			expect(resAppleIcon.headers.get('content-type')).toBe('image/png');
			expect(resAppleIcon.headers.get('cache-control')).toBe(
				isNextDev
					? 'no-cache, no-store'
					: 'public, immutable, no-transform, max-age=31536000',
			);
			expect(resIcon.status).toBe(200);
			expect(resIcon.headers.get('content-type')).toBe('image/png');
			expect(resIcon.headers.get('cache-control')).toBe(
				isNextDev
					? 'no-cache, no-store'
					: 'public, immutable, no-transform, max-age=31536000',
			);
		});

		it('should support root dir robots.txt', async () => {
			const res = await next.fetch('/robots.txt');
			expect(res.headers.get('content-type')).toBe('text/plain');
			expect(await res.text()).toContain('User-Agent: *\nDisallow:');
			const invalidRobotsResponse = await next.fetch('/title/robots.txt');
			expect(invalidRobotsResponse.status).toBe(404);
		});

		it('should support sitemap.xml under every routes', async () => {
			const res = await next.fetch('/sitemap.xml');
			expect(res.headers.get('content-type')).toBe('application/xml');
			const sitemap = await res.text();
			expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>');
			expect(sitemap).toContain(
				'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
			);
			const invalidSitemapResponse = await next.fetch('/title/sitemap.xml');
			expect(invalidSitemapResponse.status).toBe(200);
		});

		it('should support static manifest.webmanifest', async () => {
			const res = await next.fetch('/manifest.webmanifest');
			expect(res.headers.get('content-type')).toBe('application/manifest+json');
			const manifest = await res.json();
			expect(manifest).toMatchObject({
				background_color: '#fff',
				description: 'Next.js App',
				display: 'standalone',
				name: 'Next.js Static Manifest',
				short_name: 'Next.js App',
				start_url: '/',
				theme_color: '#fff',
			});
		});

		if (isNextStart) {
			it('should build favicon.ico as a custom route', async () => {
				const appPathsManifest = JSON.parse(
					await next.readFile('.next/server/app-paths-manifest.json'),
				);
				expect(appPathsManifest['/robots.txt/route']).toBe(
					'app/robots.txt/route.js',
				);
				expect(appPathsManifest['/sitemap.xml/route']).toBe(
					'app/sitemap.xml/route.js',
				);
			});
		}
	});

	if (isNextStart) {
		describe('static optimization', () => {
			it('should build static files into static route', async () => {
				expect(
					await next.hasFile(
						'.next/server/app/opengraph/static/opengraph-image.png.meta',
					),
				).toBe(true);
				expect(
					await next.hasFile(
						'.next/server/app/opengraph/static/opengraph-image.png.body',
					),
				).toBe(true);
				expect(
					await next.hasFile(
						'.next/server/app/opengraph/static/opengraph-image.png/[__metadata_id__]/route.js',
					),
				).toBe(false);
			});
		});
	}

	describe('viewport', () => {
		it('should support dynamic viewport export', async () => {
			const browser = await next.browser('/viewport');
			const matchMultiDom = createMultiDomMatcher(browser);
			await matchMultiDom('meta', 'name', 'content', {
				'theme-color': '#000',
			});
		});

		it('should skip initial-scale from viewport if it is set to undefined', async () => {
			const browser = await next.browser('/viewport/skip-initial-scale');
			const matchMultiDom = createMultiDomMatcher(browser);
			await matchMultiDom('meta', 'name', 'content', {
				viewport: 'width=device-width',
			});
		});
	});

	describe('react cache', () => {
		it('should have same title and page value on initial load', async () => {
			const browser = await next.browser('/cache-deduping');
			const value = await browser.elementByCss('#value').text();
			const value2 = await browser.elementByCss('#value2').text();
			// Value in the title should match what's shown on the page component
			const title = await browser.eval(`document.title`);
			const obj = JSON.parse(title);
			// Check `cache()`
			expect(obj.val.toString()).toBe(value);
			// Check `fetch()`
			// TODO-APP: Investigate why fetch deduping doesn't apply but cache() does.
			if (!isNextDev) {
				expect(obj.val2.toString()).toBe(value2);
			}
		});

		it('should have same title and page value when navigating', async () => {
			const browser = await next.browser('/cache-deduping/navigating');
			await browser
				.elementByCss('#link-to-deduping-page')
				.click()
				.waitForElementByCss('#value');
			const value = await browser.elementByCss('#value').text();
			const value2 = await browser.elementByCss('#value2').text();
			// Value in the title should match what's shown on the page component
			const title = await browser.eval(`document.title`);
			const obj = JSON.parse(title);
			// Check `cache()`
			expect(obj.val.toString()).toBe(value);
			// Check `fetch()`
			// TODO-APP: Investigate why fetch deduping doesn't apply but cache() does.
			if (!isNextDev) {
				expect(obj.val2.toString()).toBe(value2);
			}
		});
	});

	it('should not effect metadata images convention like files under pages directory', async () => {
		const iconHtml = await next.render('/blog/icon');
		const ogHtml = await next.render('/blog/opengraph-image');
		expect(iconHtml).toContain('pages-icon-page');
		expect(ogHtml).toContain('pages-opengraph-image-page');
	});

	describe('hmr', () => {
		if (isNextDev) {
			// This test frequently causes a compilation error when run in Turbopack
			// which also causes all subsequent tests to fail. Disabled while we investigate to reduce flakes.
			(process.env.TURBOPACK ? it.skip : it)(
				'should handle updates to the file icon name and order',
				async () => {
					await next.renameFile(
						'app/icons/static/icon.png',
						'app/icons/static/icon2.png',
					);

					await check(async () => {
						const $ = await next.render$('/icons/static');
						const $icon = $('head > link[rel="icon"][type!="image/x-icon"]');
						return $icon.attr('href');
					}, /\/icons\/static\/icon2/);

					await next.renameFile(
						'app/icons/static/icon2.png',
						'app/icons/static/icon.png',
					);
				},
			);
		}
	});
});
