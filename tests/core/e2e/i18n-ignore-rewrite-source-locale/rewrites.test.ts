import path from 'node:path';
import { createNext, type NextInstance } from 'e2e-utils';
import fs from 'fs-extra';
import { fetchViaHTTP, renderViaHTTP } from 'next-test-utils';

const locales = ['', '/en', '/sv', '/nl'];

describe('i18n-ignore-rewrite-source-locale', () => {
	let next: NextInstance;

	beforeAll(async () => {
		next = await createNext({
			dependencies: {},
			files: {
				'pages/api/hello.js': `
        export default function handler(req, res) {
          res.send('hello from api')
        }`,
				'public/file.txt': 'hello from file.txt',
			},
			nextConfig: {
				i18n: {
					defaultLocale: 'en',
					locales: ['en', 'sv', 'nl'],
				},
				async rewrites() {
					return {
						afterFiles: [],
						beforeFiles: [
							{
								destination: '/:path*',
								locale: false,
								source: '/:locale/rewrite-files/:path*',
							},
							{
								destination: '/api/:path*',
								locale: false,
								source: '/:locale/rewrite-api/:path*',
							},
						],
						fallback: [],
					};
				},
			},
		});
	});
	afterAll(() => next.destroy());

	test.each(locales)(
		'get public file by skipping locale in rewrite, locale: %s',
		async (locale) => {
			const res = await renderViaHTTP(
				next.url,
				`${locale}/rewrite-files/file.txt`,
			);
			expect(res).toContain('hello from file.txt');
		},
	);

	test.each(locales)(
		'call api by skipping locale in rewrite, locale: %s',
		async (locale) => {
			const res = await renderViaHTTP(next.url, `${locale}/rewrite-api/hello`);
			expect(res).toContain('hello from api');
		},
	);

	// build artifacts aren't available on deploy
	if (!(global as any).isNextDeploy) {
		// chunks are not written to disk with TURBOPACK
		(process.env.TURBOPACK ? it.skip.each : it.each)(locales)(
			'get _next/static/ files by skipping locale in rewrite, locale: %s',
			async (locale) => {
				const chunks = (
					await fs.readdir(path.join(next.testDir, '.next', 'static', 'chunks'))
				).filter((f) => f.endsWith('.js'));

				await Promise.all(
					chunks.map(async (file) => {
						const res = await fetchViaHTTP(
							next.url,
							`${locale}/rewrite-files/_next/static/chunks/${file}`,
						);
						// eslint-disable-next-line jest/no-standalone-expect
						expect(res.status).toBe(200);
					}),
				);
			},
		);
	}
});
