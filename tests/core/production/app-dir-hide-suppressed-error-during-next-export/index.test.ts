import { join } from 'node:path';
import { createNext, FileRef, type NextInstance } from 'e2e-utils';

describe('app-dir-hide-suppressed-error-during-next-export', () => {
	let next: NextInstance;

	beforeAll(async () => {
		next = await createNext({
			files: {
				app: new FileRef(join(__dirname, 'app')),
				'next.config.js': new FileRef(join(__dirname, 'next.config.js')),
			},
			skipStart: true,
		});
	});
	afterAll(() => next.destroy());

	it('should not log suppressed error when exporting static page', async () => {
		await expect(next.start()).rejects.toThrow('next build failed');
		expect(next.cliOutput).toInclude('Page build time error');
		expect(next.cliOutput).toInclude('occurred prerendering page "/"');
		expect(next.cliOutput).toInclude(
			'Export encountered errors on following paths',
		);
		expect(next.cliOutput).not.toInclude(
			'The specific message is omitted in production builds to avoid leaking sensitive details.',
		);
	});
});
