import { isNextDev, nextTestSetup } from 'e2e-utils';
import { retry } from 'next-test-utils';

describe('after during server shutdown - custom server', () => {
	const { next, skipped } = nextTestSetup({
		env: {
			DEBUG: '1',
			NODE_ENV: isNextDev ? 'development' : 'production',
		},
		files: __dirname,
		forcedPort: 'random',
		serverReadyPattern: /Custom server started/,
		skipDeployment: true,
		skipStart: true, // the tests use cli logs and a custom server
		startCommand: 'node server.mjs',
	});
	if (skipped) {
		return;
	}

	beforeEach(async () => {
		await next.start();
	});

	afterEach(async () => {
		// if the test didn't manage to kill next, we should do it ourselves
		await next.stop();
	}, 10_000);

	// unlike the above test for `next dev`, NextCustomServer has no logic that'd cause it to skip cleanups in dev mode,
	// so this is the same in both modes
	it.each(['SIGINT', 'SIGTERM'] as const)(
		'waits for after callbacks when the server receives %s',
		async (signal) => {
			await next.render('/');
			await retry(async () => {
				expect(next.cliOutput).toInclude('[after] starting sleep');
			});
			await next.stop(signal);
			expect(next.cliOutput).toInclude('[after] finished sleep');
		},
	);
});
