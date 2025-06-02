import { nextTestSetup } from 'e2e-utils';

describe('custom-app-render', () => {
	const { next, skipped } = nextTestSetup({
		dependencies: {
			'get-port': '5.1.1',
		},
		files: __dirname,
		serverReadyPattern: /Next mode: (production|development)/,
		skipDeployment: true,
		startCommand: 'node server.js',
	});

	if (skipped) {
		return;
	}

	it.each(['/', '/render'])('should render %s', async (page) => {
		const $ = await next.render$(page);
		expect($('#page').data('page')).toBe(page);
	});
});
