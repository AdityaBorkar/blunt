import { createNext, type NextInstance } from 'e2e-utils';

describe('Edge config validations', () => {
	let next: NextInstance;

	afterAll(() => next.destroy());
	(process.env.TURBOPACK ? it.skip : it)(
		'fails to build when unstable_allowDynamic is not a string',
		async () => {
			next = await createNext({
				files: {
					'middleware.js': `
          import { NextResponse } from 'next/server'
          export default async function middleware(request) {
            return NextResponse.next()
          }

          eval('toto')

          export const config = { unstable_allowDynamic: true }
        `,
					'pages/index.js': `
          export default function Page() { 
            return <p>hello world</p>
          } 
        `,
				},
				skipStart: true,
			});
			// eslint-disable-next-line jest/no-standalone-expect
			await expect(next.start()).rejects.toThrow('next build failed');
			// eslint-disable-next-line jest/no-standalone-expect
			expect(next.cliOutput).toMatch(
				'/middleware contains invalid middleware config: Expected string, received boolean at "unstable_allowDynamic", or Expected array, received boolean at "unstable_allowDynamic"',
			);
		},
	);
});
