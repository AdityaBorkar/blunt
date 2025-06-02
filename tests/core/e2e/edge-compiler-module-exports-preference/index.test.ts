import { createNext, type NextInstance } from 'e2e-utils';
import { fetchViaHTTP, shouldRunTurboDevTest } from 'next-test-utils';

describe('Edge compiler module exports preference', () => {
	let next: NextInstance;

	if ((global as any).isNextDeploy) {
		// this test is skipped when deployed because it manually creates a package in the node_modules directory
		// which is unsupported
		it('should skip next deploy', () => {});
		return;
	}

	beforeAll(async () => {
		next = await createNext({
			buildCommand: 'pnpm run build',
			dependencies: {},
			files: {
				'middleware.js': `
          import { NextResponse } from 'next/server';
          import lib from 'my-lib';

          export default (req) => {
            return NextResponse.next({
              headers: {
                'x-imported': lib
              }
            })
          }
        `,
				'node_modules/my-lib/browser.js': `module.exports = "Browser"`,
				'node_modules/my-lib/index.js': `module.exports = "Node.js"`,
				'node_modules/my-lib/package.json': JSON.stringify({
					browser: 'browser.js',
					main: 'index.js',
					name: 'my-lib',
					version: '1.0.0',
				}),
				'pages/index.js': `
          export default function Page() {
            return <p>hello world</p>
          }
        `,
			},
			installCommand: 'pnpm i',
			packageJson: {
				scripts: {
					build: 'next build',
					dev: `next ${shouldRunTurboDevTest() ? 'dev --turbo' : 'dev'}`,
					start: 'next start',
				},
			},
			startCommand: (global as any).isNextDev ? 'pnpm dev' : 'pnpm start',
		});
	});
	afterAll(() => next.destroy());

	it('favors the browser export', async () => {
		const response = await fetchViaHTTP(next.url, '/');
		expect(Object.fromEntries(response.headers)).toMatchObject({
			'x-imported': 'Browser',
		});
	});
});
