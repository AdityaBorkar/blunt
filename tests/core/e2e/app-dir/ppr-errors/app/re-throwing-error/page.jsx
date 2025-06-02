import { cookies } from 'next/headers';
import { Suspense } from 'react';

export default async function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Foobar />
		</Suspense>
	);
}

async function Foobar() {
	try {
		await cookies();
	} catch (_err) {
		throw new Error('The original error was caught and rethrown.');
	}
	return null;
}
