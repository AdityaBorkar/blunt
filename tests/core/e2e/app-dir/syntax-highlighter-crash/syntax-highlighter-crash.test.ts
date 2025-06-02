import { nextTestSetup } from 'e2e-utils';

describe('syntax-highlighter-crash', () => {
	const { next } = nextTestSetup({
		dependencies: {
			'react-syntax-highlighter': '15.5.0',
		},
		files: __dirname,
	});

	it('should render the page', async () => {
		const $ = await next.render$('/');
		expect($('p').text()).toBe('hello world');
	});
});
