import { setTimeout } from 'node:timers/promises';
import { after } from 'next/server';

export const dynamic = 'error';

export default function Index() {
	after(async () => {
		await setTimeout(500);
		throw new Error(
			'My cool error thrown inside after on route "/page-throws-in-after/callback"',
		);
	});
	return <div>Page with after()</div>;
}
