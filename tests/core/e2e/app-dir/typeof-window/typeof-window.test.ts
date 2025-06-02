import path from 'node:path';
import { nextTestSetup } from 'e2e-utils';

describe('typeof-window', () => {
	const { next, skipped } = nextTestSetup({
		dependencies: {
			'my-differentiated-files': `file:${path.join(__dirname, 'my-differentiated-files.tar')}`,
		},
		files: __dirname,
		// This test is skipped when deployed because the local tarball appears corrupted
		// It also doesn't seem particularly useful to test when deployed
		skipDeployment: true,
	});

	if (skipped) return;

	it('should work using cheerio', async () => {
		const $ = await next.render$('/');
		expect($('h1').text()).toBe('Page loaded');
	});
});
