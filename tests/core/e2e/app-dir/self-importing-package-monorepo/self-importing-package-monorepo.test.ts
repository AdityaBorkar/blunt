import { nextTestSetup } from 'e2e-utils';

describe('self-importing-package-monorepo', () => {
	const dependencies = (global as any).isNextDeploy
		? // `link` is incompatible with the npm version used when this test is deployed
			{
				'internal-pkg': 'file:./internal-pkg',
			}
		: {
				'internal-pkg': 'link:./internal-pkg',
			};
	const { next } = nextTestSetup({
		dependencies,
		files: __dirname,
		packageJson: {
			exports: {
				'.': {
					default: './index.js',
				},
			},
			name: 'next-app',
		},
	});

	it('should resolve self-imports inside a monorepo', async () => {
		const $ = await next.render$('/');
		expect($('h1').text()).toBe('Hello world test abc index');
	});
});
