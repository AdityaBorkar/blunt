import path from 'node:path';
import { createNext, FileRef, type NextInstance } from 'e2e-utils';
import { renderViaHTTP } from 'next-test-utils';

const appDir = path.join(__dirname, 'app');

describe('next/jest', () => {
	let next: NextInstance;

	beforeAll(async () => {
		next = await createNext({
			buildCommand: `pnpm build`,
			dependencies: {
				'@testing-library/jest-dom': '5.16.4',
				'@testing-library/react': '15.0.2',
				jest: '29.7.0',
				'jest-environment-jsdom': '29.7.0',
			},
			files: {
				'jest.config.js': new FileRef(path.join(appDir, 'jest.config.js')),
				'next.config.js': new FileRef(path.join(appDir, 'next.config.js')),
				pages: new FileRef(path.join(appDir, 'pages')),
				'tests/index.test.tsx': `
        import { render, waitFor } from '@testing-library/react'
        import '@testing-library/jest-dom/extend-expect';

        import Page from '@/pages'

        describe('testid', () => {
          it('data-testid should be available in the test', async () => {
            const { getByTestId } = render(
              <Page />
            )
            expect(getByTestId('main-text')).toHaveTextContent('Hello World')
          })
        })
        
        `,
				'tsconfig.json': new FileRef(path.join(appDir, 'tsconfig.json')),
			},
			installCommand: 'pnpm i',
			packageJson: {
				scripts: {
					// Runs jest and bails if jest fails
					build: 'jest --forceExit tests/index.test.tsx && next build',
				},
			},
		});
	});
	afterAll(() => next.destroy());

	it('data-testid should be removed in production', async () => {
		const html = await renderViaHTTP(next.url, '/');

		expect(html).not.toContain('data-testid');
	});
});
