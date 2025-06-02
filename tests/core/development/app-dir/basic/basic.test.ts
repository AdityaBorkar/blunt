import { createSandbox, waitForHydration } from 'development-sandbox';
import { nextTestSetup } from 'e2e-utils';
import { waitFor } from 'next-test-utils';

describe('basic app-dir tests', () => {
	const { next } = nextTestSetup({
		files: __dirname,
	});

	it('should reload app pages without error', async () => {
		await using sandbox = await createSandbox(next, undefined, '/');
		const { session, browser } = sandbox;
		await session.assertNoRedbox();

		browser.refresh();

		await waitFor(750);
		await waitForHydration(browser);

		for (let i = 0; i < 15; i++) {
			await session.assertNoRedbox();
			await waitFor(1000);
		}
	});
});
