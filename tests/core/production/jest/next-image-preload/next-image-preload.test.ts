import path from 'node:path';
import { createNext, FileRef, type NextInstance } from 'e2e-utils';
import execa from 'execa';

const appDir = path.join(__dirname, 'app');

describe('next/jest', () => {
	let next: NextInstance;

	beforeAll(async () => {
		next = await createNext({
			dependencies: {
				'@testing-library/jest-dom': '5.17.0',
				'@testing-library/react': '15.0.2',
				jest: '29.7.0',
				'jest-environment-jsdom': '29.7.0',
			},
			files: {
				app: new FileRef(path.join(appDir, 'app')),
				'jest.config.js': new FileRef(path.join(appDir, 'jest.config.js')),
				'tests/index.test.tsx': `
        import { render, screen } from '@testing-library/react'
        import Page from '../app/page'

        it('<Page /> renders', () => {
          render(<Page />)
          const logo = screen.getByRole('img')
          expect(logo).toBeDefined()
        })
        `,
			},
			skipStart: true,
		});
	});
	afterAll(() => next.destroy());

	it('Should not throw preload is undefined error', async () => {
		const { stdout, stderr } = await execa(
			'pnpm',
			['jest', 'tests/index.test.tsx'],
			{
				cwd: next.testDir,
				reject: false,
			},
		);
		// Uncaught [TypeError: (0 , _reactdom.preload) is not a function]
		expect(stdout + stderr).not.toContain('is not a function');
	});
});
