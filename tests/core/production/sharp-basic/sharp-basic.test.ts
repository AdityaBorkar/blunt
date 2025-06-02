import { nextTestSetup } from 'e2e-utils';

describe('sharp support with hasNextSupport', () => {
	const { next } = nextTestSetup({
		dependencies: {
			sharp: 'latest',
		},
		env: {
			NOW_BUILDER: '1',
		},
		files: __dirname,
		packageJson: {
			pnpm: {
				onlyBuiltDependencies: ['sqlite3'],
			},
		},
	});

	// we're mainly checking if build/start were successful so
	// we have a basic assertion here
	it('should work using cheerio', async () => {
		const $ = await next.render$('/');
		expect($('p').text()).toBe('hello world');
	});
});
