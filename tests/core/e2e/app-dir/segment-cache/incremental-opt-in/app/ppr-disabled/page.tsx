import { connection } from 'next/server';
import { Suspense } from 'react';

async function Content() {
	await connection();
	return <div id="page-content">Page content</div>;
}

export default function PPRDisabled() {
	return (
		<Suspense fallback="Loading...">
			<Content />
		</Suspense>
	);
}
