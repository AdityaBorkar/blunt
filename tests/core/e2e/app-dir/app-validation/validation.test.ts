import { nextTestSetup } from 'e2e-utils';

describe('app dir - validation', () => {
	const { next, skipped } = nextTestSetup({
		files: __dirname,
		skipDeployment: true,
	});

	if (skipped) {
		return;
	}

	it('should error when passing invalid router state tree', async () => {
		const res = await next.fetch('/', {
			headers: {
				'Next-Router-State-Tree': JSON.stringify(['', '']),
				RSC: '1',
			},
		});
		expect(res.status).toBe(500);

		const res2 = await next.fetch('/', {
			headers: {
				'Next-Router-State-Tree': JSON.stringify(['', {}]),
				RSC: '1',
			},
		});
		expect(res2.status).toBe(200);
	});
});
