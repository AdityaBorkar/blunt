import { nextTestSetup } from 'e2e-utils';

describe('app-only-flag', () => {
	const { next } = nextTestSetup({
		buildCommand: 'pnpm next build --experimental-app-only',
		files: __dirname,
	});

	it('should serve app route', async () => {
		const $ = await next.render$('/');
		expect($('p').text()).toBe('hello world');
	});

	it('should not serve about route', async () => {
		const res = await next.fetch('/about');
		expect(res.status).toBe(404);
	});
});
