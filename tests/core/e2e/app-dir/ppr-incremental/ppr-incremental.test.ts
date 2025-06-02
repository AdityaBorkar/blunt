import { isNextDev, nextTestSetup } from 'e2e-utils';
import type { Page, Route as PlaywrightRoute } from 'playwright';

type Route = {
	route: string;
	enabled: boolean;
	pathnames: string[];
};

const routes: ReadonlyArray<Route> = [
	{
		enabled: false,
		pathnames: ['/'],
		route: '/',
	},
	{
		enabled: false,
		pathnames: ['/disabled'],
		route: '/disabled',
	},
	{
		enabled: true,
		pathnames: ['/enabled'],
		route: '/enabled',
	},
	{
		enabled: false,
		pathnames: ['/omitted/a', '/omitted/b', '/omitted/c'],
		route: '/omitted/[slug]',
	},
	{
		enabled: false,
		pathnames: [
			'/omitted/disabled/a',
			'/omitted/disabled/b',
			'/omitted/disabled/c',
		],
		route: '/omitted/disabled/[slug]',
	},
	{
		enabled: true,
		pathnames: [
			'/omitted/enabled/a',
			'/omitted/enabled/b',
			'/omitted/enabled/c',
		],
		route: '/omitted/enabled/[slug]',
	},
	{
		enabled: false,
		pathnames: ['/dynamic/a', '/dynamic/b', '/dynamic/c'],
		route: '/dynamic/[slug]',
	},
	{
		enabled: false,
		pathnames: [
			'/dynamic/disabled/a',
			'/dynamic/disabled/b',
			'/dynamic/disabled/c',
		],
		route: '/dynamic/disabled/[slug]',
	},
	{
		enabled: true,
		pathnames: [
			'/dynamic/enabled/a',
			'/dynamic/enabled/b',
			'/dynamic/enabled/c',
		],
		route: '/dynamic/enabled/[slug]',
	},
	{
		enabled: true,
		pathnames: ['/nested/enabled/a', '/nested/enabled/b', '/nested/enabled/c'],
		route: '/nested/enabled/[slug]',
	},
	{
		enabled: false,
		pathnames: [
			'/nested/enabled/disabled/a',
			'/nested/enabled/disabled/b',
			'/nested/enabled/disabled/c',
		],
		route: '/nested/enabled/disabled/[slug]',
	},
	{
		enabled: true,
		pathnames: [
			'/nested/enabled/enabled/a',
			'/nested/enabled/enabled/b',
			'/nested/enabled/enabled/c',
		],
		route: '/nested/enabled/enabled/[slug]',
	},
	{
		enabled: false,
		pathnames: [
			'/nested/disabled/a',
			'/nested/disabled/b',
			'/nested/disabled/c',
		],
		route: '/nested/disabled/[slug]',
	},
	{
		enabled: false,
		pathnames: [
			'/nested/disabled/disabled/a',
			'/nested/disabled/disabled/b',
			'/nested/disabled/disabled/c',
		],
		route: '/nested/disabled/disabled/[slug]',
	},
	{
		enabled: true,
		pathnames: [
			'/nested/disabled/enabled/a',
			'/nested/disabled/enabled/b',
			'/nested/disabled/enabled/c',
		],
		route: '/nested/disabled/enabled/[slug]',
	},
];

describe('ppr-incremental', () => {
	// We don't perform static builds and partial prerendering in development
	// mode.
	if (isNextDev) return it.skip('should skip next dev', () => {});

	const { next } = nextTestSetup({ files: __dirname });

	describe('ppr disabled', () => {
		describe.each(routes.filter(({ enabled }) => !enabled))(
			'$route',
			({ pathnames }) => {
				// When PPR is disabled, we won't include the fallback in the initial
				// load because the dynamic render will not suspend.
				describe('should render without the fallback in the initial load', () => {
					it.each(pathnames)('%s', async (pathname) => {
						const $ = await next.render$(pathname);
						expect($('#fallback')).toHaveLength(0);
					});
				});

				describe('should not have the dynamic content hidden', () => {
					it.each(pathnames)('%s', async (pathname) => {
						const $ = await next.render$(pathname);
						expect($('#dynamic')).toHaveLength(1);
						expect($('#dynamic').closest('[hidden]')).toHaveLength(0);
					});
				});
			},
		);

		it('should not trigger a dynamic request for static pages', async () => {
			let rscRequests = [];
			const browser = await next.browser('/', {
				beforePageLoad(page: Page) {
					page.route('**/static*', async (route: PlaywrightRoute) => {
						const request = route.request();
						const headers = await request.allHeaders();
						const url = new URL(request.url());

						if (headers.rsc === '1') {
							rscRequests.push(url.pathname);
							await route.continue();
						}
					});
				},
			});

			await browser.waitForIdleNetwork();
			// we should see an RSC request for the initial prefetch to the static page
			expect(rscRequests).toEqual(expect.arrayContaining(['/static']));

			rscRequests = [];

			await browser.elementByCss('[href="/static"]').click();
			await browser.waitForElementByCss('#static-page');
			expect(rscRequests.length).toBe(0);
		});
	});

	describe('ppr enabled', () => {
		describe.each(routes.filter(({ enabled }) => enabled))(
			'$route',
			({ pathnames }) => {
				// When PPR is enabled, we will always include the fallback in the
				// initial load because the dynamic component uses `unstable_noStore()`.
				describe('should render with the fallback in the initial load', () => {
					it.each(pathnames)('%s', async (pathname) => {
						const $ = await next.render$(pathname);
						expect($('#fallback')).toHaveLength(1);
					});
				});

				describe('should have the dynamic content hidden', () => {
					it.each(pathnames)('%s', async (pathname) => {
						const $ = await next.render$(pathname);
						expect($('#dynamic')).toHaveLength(1);
						expect($('#dynamic').closest('[hidden]')).toHaveLength(1);
					});
				});
			},
		);
	});
});
