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
	} catch (err) {
		console.log(`User land logged error: ${err.message}`);
	}
	await cookies(); // still postpones so doesn't fail build
	return null;
}
