import { nextTestSetup } from 'e2e-utils';
(process.env.TURBOPACK ? describe.skip : describe)(
	'app dir - rsc webpack loader',
	() => {
		const { next } = nextTestSetup({
			dependencies: {
				'server-only': 'latest',
				'styled-components': 'latest',
			},
			files: __dirname,
			resolutions: {
				'@babel/core': '7.22.18',
				'@babel/parser': '7.22.16',
				'@babel/traverse': '7.22.18',
				'@babel/types': '7.22.17',
			},
		});

		// Skip as Turbopack doesn't support webpack loaders.
		it('should support webpack loader rules', async () => {
			const browser = await next.browser('/loader-rule');

			expect(
				await browser.eval(
					`window.getComputedStyle(document.querySelector('#red')).color`,
				),
			).toBe('rgb(255, 0, 0)');
		});
	},
);
