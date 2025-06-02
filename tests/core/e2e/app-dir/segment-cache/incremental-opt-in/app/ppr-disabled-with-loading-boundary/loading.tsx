import { connection } from 'next/server';
import { Suspense } from 'react';

async function Content() {
	await connection();
	return 'Dynamic Content';
}

export default function PPRDisabled() {
	return (
		<Suspense fallback="Loading...">
			<Content />
		</Suspense>
	);
}
