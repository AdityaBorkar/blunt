import path from 'node:path';
import { FileRef, nextTestSetup } from 'e2e-utils';

function getPairs(all: string[]): (readonly [string, string])[] {
	const result: (readonly [string, string])[] = [];

	for (const first of all) {
		for (const second of all) {
			if (first === second || PAGES[first].group !== PAGES[second].group) {
				continue;
			}
			result.push([first, second] as const);
		}
	}

	return result;
}

const PAGES: Record<
	string,
	{
		group: string;
		url: string;
		selector: string;
		color: string;
		background?: string;
		conflict?: boolean;
		brokenLoading?: boolean;
		brokenLoadingDev?: boolean;
	}
> = {
	'big-interleaved-a': {
		// TODO fix this case
		brokenLoading: true,
		color: 'rgb(166, 255, 0)',
		group: 'big-interleaved',
		selector: '#hellobia',
		url: '/big-interleaved/a',
	},
	'big-interleaved-b': {
		// TODO fix this case
		brokenLoading: true,
		color: 'rgb(166, 0, 255)',
		group: 'big-interleaved',
		selector: '#hellobib',
		url: '/big-interleaved/b',
	},
	first: {
		color: 'rgb(0, 0, 255)',
		group: 'basic',
		selector: '#hello1',
		url: '/first',
	},
	'first-client': {
		color: 'rgb(255, 0, 255)',
		group: 'basic',
		selector: '#hello1c',
		url: '/first-client',
	},
	'global-first': {
		color: 'rgb(0, 255, 0)',
		conflict: true,
		group: 'global',
		selector: '#hello1',
		url: '/global-first',
	},
	'global-second': {
		color: 'rgb(0, 0, 255)',
		conflict: true,
		group: 'global',
		selector: '#hello2',
		url: '/global-second',
	},
	'interleaved-a': {
		color: 'rgb(0, 255, 0)',
		group: 'interleaved',
		selector: '#helloia',
		url: '/interleaved/a',
	},
	'interleaved-b': {
		color: 'rgb(255, 0, 255)',
		group: 'interleaved',
		selector: '#helloib',
		url: '/interleaved/b',
	},
	'pages-first': {
		color: 'rgb(0, 0, 255)',
		group: 'pages-basic',
		selector: '#hello1',
		url: '/pages/first',
	},

	'pages-interleaved-a': {
		brokenLoadingDev: true,
		color: 'rgb(0, 255, 0)',
		group: 'pages-interleaved',
		selector: '#helloia',
		url: '/pages/interleaved/a',
	},
	'pages-interleaved-b': {
		brokenLoadingDev: true,
		color: 'rgb(255, 0, 255)',
		group: 'pages-interleaved',
		selector: '#helloib',
		url: '/pages/interleaved/b',
	},
	'pages-partial-reversed-a': {
		background: 'rgba(0, 0, 0, 0)',
		brokenLoadingDev: true,
		color: 'rgb(255, 166, 255)',
		group: 'pages-partial-reversed',
		selector: '#hellopra',
		url: '/pages/partial-reversed/a',
	},
	'pages-partial-reversed-b': {
		background: 'rgba(0, 0, 0, 0)',
		brokenLoadingDev: true,
		color: 'rgb(255, 55, 255)',
		group: 'pages-partial-reversed',
		selector: '#helloprb',
		url: '/pages/partial-reversed/b',
	},
	'pages-reversed-a': {
		brokenLoadingDev: true,
		color: 'rgb(0, 166, 255)',
		group: 'pages-reversed',
		selector: '#hellora',
		url: '/pages/reversed/a',
	},
	'pages-reversed-b': {
		brokenLoadingDev: true,
		color: 'rgb(0, 89, 255)',
		group: 'pages-reversed',
		selector: '#hellorb',
		url: '/pages/reversed/b',
	},
	'pages-second': {
		color: 'rgb(0, 128, 0)',
		group: 'pages-basic',
		selector: '#hello2',
		url: '/pages/second',
	},
	'pages-third': {
		color: 'rgb(0, 128, 128)',
		group: 'pages-basic',
		selector: '#hello3',
		url: '/pages/third',
	},
	'partial-reversed-a': {
		background: 'rgba(0, 0, 0, 0)',
		color: 'rgb(255, 166, 255)',
		conflict: true,
		group: 'partial-reversed',
		selector: '#hellopra',
		url: '/partial-reversed/a',
	},
	'partial-reversed-b': {
		background: 'rgba(0, 0, 0, 0)',
		color: 'rgb(255, 55, 255)',
		conflict: true,
		group: 'partial-reversed',
		selector: '#helloprb',
		url: '/partial-reversed/b',
	},
	'reversed-a': {
		color: 'rgb(0, 166, 255)',
		conflict: true,
		group: 'reversed',
		selector: '#hellora',
		url: '/reversed/a',
	},
	'reversed-b': {
		color: 'rgb(0, 89, 255)',
		conflict: true,
		group: 'reversed',
		selector: '#hellorb',
		url: '/reversed/b',
	},
	second: {
		color: 'rgb(0, 128, 0)',
		group: 'basic',
		selector: '#hello2',
		url: '/second',
	},
	'second-client': {
		color: 'rgb(255, 128, 0)',
		group: 'basic',
		selector: '#hello2c',
		url: '/second-client',
	},
	third: {
		color: 'rgb(0, 128, 128)',
		group: 'basic',
		selector: '#hello3',
		url: '/third',
	},
	vendor: {
		color: 'rgb(0, 255, 0)',
		group: 'vendor',
		selector: '#vendor1',
		url: '/vendor',
	},
};

const allPairs = getPairs(Object.keys(PAGES));

const options = (mode: string) => ({
	dependencies: {
		sass: 'latest',
	},
	files: {
		app: new FileRef(path.join(__dirname, 'app')),
		'next.config.js': process.env.TURBOPACK
			? `
            module.exports = {}`
			: `
            module.exports = {
              experimental: {
                cssChunking: ${JSON.stringify(mode)}
              }
            }`,
		pages: new FileRef(path.join(__dirname, 'pages')),
	},
	skipDeployment: true,
});
describe.each(process.env.TURBOPACK ? ['turbo'] : ['strict', true])(
	'css-order %s',
	(mode: string) => {
		const { next, isNextDev, skipped } = nextTestSetup(options(mode));
		if (skipped) return;
		for (const ordering of allPairs) {
			const name = `should load correct styles navigating back again ${ordering.join(
				' -> ',
			)} -> ${ordering.join(' -> ')}`;
			if (ordering.some((page) => PAGES[page].conflict)) {
				// Conflict scenarios won't support that case
				continue;
			}
			// TODO fix this case
			const broken =
				isNextDev || ordering.some((page) => PAGES[page].brokenLoading);
			if (broken) {
				it.todo(name);
				continue;
			}
			it(name, async () => {
				const start = PAGES[ordering[0]];
				const browser = await next.browser(start.url);
				const check = async (pageInfo) => {
					expect(
						await browser
							.waitForElementByCss(pageInfo.selector)
							.getComputedCss('color'),
					).toBe(pageInfo.color);
					if (pageInfo.background) {
						expect(
							await browser
								.waitForElementByCss(pageInfo.selector)
								.getComputedCss('background-color'),
						).toBe(pageInfo.background);
					}
				};
				const navigate = async (page) => {
					await browser.waitForElementByCss(`#${page}`).click();
				};
				await check(start);
				for (const page of ordering.slice(1)) {
					await navigate(page);
					await check(PAGES[page]);
				}
				for (const page of ordering) {
					await navigate(page);
					await check(PAGES[page]);
				}
				await browser.close();
			});
		}
	},
);
describe.each(process.env.TURBOPACK ? ['turbo'] : ['strict', 'loose'])(
	'css-order %s',
	(mode: string) => {
		const { next, isNextDev } = nextTestSetup(options(mode));
		for (const ordering of allPairs) {
			const name = `should load correct styles navigating ${ordering.join(
				' -> ',
			)}`;
			if (ordering.some((page) => PAGES[page].conflict)) {
				// Conflict scenarios won't support that case
				continue;
			}
			// TODO fix this case
			const broken = ordering.some(
				(page) =>
					PAGES[page].brokenLoading ||
					(isNextDev && PAGES[page].brokenLoadingDev),
			);
			if (broken) {
				it.todo(name);
				continue;
			}
			it(name, async () => {
				const start = PAGES[ordering[0]];
				const browser = await next.browser(start.url);
				const check = async (pageInfo) => {
					expect(
						await browser
							.waitForElementByCss(pageInfo.selector)
							.getComputedCss('color'),
					).toBe(pageInfo.color);
				};
				const navigate = async (page) => {
					await browser.waitForElementByCss(`#${page}`).click();
				};
				await check(start);
				for (const page of ordering.slice(1)) {
					await navigate(page);
					await check(PAGES[page]);
				}
				await browser.close();
			});
		}
	},
);
describe.each(process.env.TURBOPACK ? ['turbo'] : ['strict', 'loose'])(
	'css-order %s',
	(mode: string) => {
		const { next } = nextTestSetup(options(mode));
		for (const [page, pageInfo] of Object.entries(PAGES)) {
			const name = `should load correct styles on ${page}`;
			if (mode !== 'strict' && pageInfo.conflict) {
				// Conflict scenarios won't support that case
				continue;
			}
			it(name, async () => {
				const browser = await next.browser(pageInfo.url);
				expect(
					await browser
						.waitForElementByCss(pageInfo.selector)
						.getComputedCss('color'),
				).toBe(pageInfo.color);
				await browser.close();
			});
		}
	},
);
