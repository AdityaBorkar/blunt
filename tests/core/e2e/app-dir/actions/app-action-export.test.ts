import { nextTestSetup } from 'e2e-utils';

describe('app-dir action handling - next export', () => {
	const { next, isNextStart, skipped } = nextTestSetup({
		dependencies: {
			nanoid: '4.0.1',
			'server-only': 'latest',
		},
		files: __dirname,
		skipDeployment: true,
		skipStart: true,
	});
	if (skipped) return;

	if (!isNextStart) {
		it('skip test for development mode', () => {});
		return;
	}

	beforeAll(async () => {
		await next.stop();
		await next.patchFile(
			'next.config.js',
			`
      module.exports = {
        output: 'export'
      }
      `,
		);
		// interception routes are also not supported with export
		await next.remove('app/interception-routes');
		try {
			await next.start();
		} catch {}
	});

	it('should error when use export output for server actions', async () => {
		expect(next.cliOutput).toContain(
			`Server Actions are not supported with static export.`,
		);
	});
});
