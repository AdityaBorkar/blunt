import { join } from 'node:path';
import { FileRef, nextTestSetup } from 'e2e-utils';

// regression test suite for https://github.com/vercel/next.js/issues/38854
describe('Does not override tsconfig moduleResolution field during build', () => {
	const { next } = nextTestSetup({
		dependencies: {
			'@types/node': 'latest',
			'@types/react': 'latest',
			pkg: './pkg',
			typescript: 'latest',
		},
		files: {
			pages: new FileRef(join(__dirname, 'pages')),
			pkg: new FileRef(join(__dirname, 'pkg')),
			'tsconfig.json': new FileRef(join(__dirname, 'tsconfig.json')),
		},
		packageJson: { type: 'module' },
	});

	it('boots and renders without throwing an error', async () => {
		await next.render$('/');
	});
});
