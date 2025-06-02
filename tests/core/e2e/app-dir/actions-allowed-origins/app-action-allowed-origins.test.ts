import { join } from 'node:path';
import { nextTestSetup } from 'e2e-utils';
import { check } from 'next-test-utils';

describe('app-dir action allowed origins', () => {
	const { next, skipped } = nextTestSetup({
		dependencies: {
			'server-only': 'latest',
		},
		files: join(__dirname, 'safe-origins'),
		// An arbitrary & random port.
		forcedPort: 'random',
		skipDeployment: true,
	});

	if (skipped) {
		return;
	}

	it('should pass if localhost is set as a safe origin', async () => {
		const browser = await next.browser('/');

		await browser.elementByCss('button').click();

		await check(async () => {
			return await browser.elementByCss('#res').text();
		}, 'hi');
	});
});
