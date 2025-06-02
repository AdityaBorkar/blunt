import { nextTestSetup } from 'e2e-utils';

describe('app-catch-all-optional', () => {
	const { next } = nextTestSetup({
		files: __dirname,
	});

	it('should handle optional catchall', async () => {
		const $ = await next.render$('/en/flags/the/rest');
		expect($('body [data-lang]').text()).toBe('en');
		expect($('body [data-flags]').text()).toBe('flags');
		expect($('body [data-rest]').text()).toBe('the/rest');
	});

	it('should handle optional catchall with no params', async () => {
		const $ = await next.render$('/en/flags');
		expect($('body [data-lang]').text()).toBe('en');
		expect($('body [data-flags]').text()).toBe('flags');
		expect($('body [data-rest]').text()).toBe('');
	});
});
