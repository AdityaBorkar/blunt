import { createNext, type NextInstance } from 'e2e-utils';
import { fetchViaHTTP } from 'next-test-utils';

describe('dependencies can use env vars in middlewares', () => {
	let next: NextInstance;

	beforeAll(() => {
		process.env.MY_CUSTOM_PACKAGE_ENV_VAR = 'my-custom-package-env-var';
		process.env.ENV_VAR_USED_IN_MIDDLEWARE = 'env-var-used-in-middleware';
	});

	beforeAll(async () => {
		next = await createNext({
			dependencies: {},
			files: {
				'middleware.js': `
          import customPackage from 'my-custom-package';
          export default function middleware(_req) {
            return new Response(null, { 
              headers: { 
                data: JSON.stringify({
                  string: "a constant string",
                  hello: process.env.ENV_VAR_USED_IN_MIDDLEWARE,
                  customPackage: customPackage(),
                })
              }
            })
          }
        `,
				'node_modules/my-custom-package/index.js': `
          module.exports = () => process.env.MY_CUSTOM_PACKAGE_ENV_VAR;
        `,
				// A 3rd party dependency
				'node_modules/my-custom-package/package.json': JSON.stringify({
					browser: 'index.js',
					name: 'my-custom-package',
					version: '1.0.0',
				}),
				// make sure invalid package-lock doesn't error
				'package-lock.json': '{}',

				'pages/index.js': `
          export default function () { return <div>Hello, world!</div> }
        `,
			},
		});
	});
	afterAll(() => next.destroy());

	it('does not error from patching lockfile', () => {
		expect(next.cliOutput).not.toContain('patch-incorrect-lockfile');
	});

	it('uses the environment variables', async () => {
		const response = await fetchViaHTTP(next.url, '/api');
		expect(JSON.parse(response.headers.get('data'))).toEqual({
			customPackage: 'my-custom-package-env-var',
			hello: 'env-var-used-in-middleware',
			string: 'a constant string',
		});
	});
});
