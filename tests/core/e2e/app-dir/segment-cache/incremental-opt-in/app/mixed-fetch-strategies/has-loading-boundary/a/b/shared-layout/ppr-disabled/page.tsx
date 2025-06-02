import { connection } from 'next/server';
import { Suspense } from 'react';

async function Content() {
	await connection();
	return <div id="page-content">Dynamic page content</div>;
}

export default async function Page() {
	return (
		<Suspense fallback={<div id="page-loading-boundary">Loading page...</div>}>
			<Content />
		</Suspense>
	);
}
