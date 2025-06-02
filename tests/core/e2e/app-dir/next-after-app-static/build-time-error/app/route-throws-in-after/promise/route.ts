import { setTimeout } from 'node:timers/promises';
import { after } from 'next/server';

export const dynamic = 'error';

export async function GET() {
	const promise = (async () => {
		await setTimeout(500);
		throw new Error(
			'My cool error thrown inside after on route "/route-throws-in-after/promise"',
		);
	})();
	after(promise);
	return new Response();
}
