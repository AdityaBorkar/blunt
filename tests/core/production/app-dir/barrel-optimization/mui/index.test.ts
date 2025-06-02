import { nextTestSetup } from 'e2e-utils';

describe('Skipped in Turbopack', () => {
	describe('app-dir - optimizePackageImports - mui', () => {
		const { next } = nextTestSetup({
			dependencies: {
				'@emotion/react': '11.11.1',
				'@emotion/styled': '11.11.0',
				'@mui/material': '5.15.15',
			},
			files: __dirname,
		});

		it('should build successfully', async () => {
			// Ensure that MUI is working
			const $ = await next.render$('/');
			expect(await $('#typography').text()).toContain('typography');
		});
	});
});
