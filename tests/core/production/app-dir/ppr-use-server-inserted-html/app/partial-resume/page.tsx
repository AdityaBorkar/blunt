import { headers } from 'next/headers';
import { Suspense } from 'react';

import { InsertHtml } from './client';

async function Dynamic() {
	await headers();

	return (
		<div>
			<h3>dynamic</h3>
			<InsertHtml data={'dynamic-data'} id={'inserted-html'} />
		</div>
	);
}

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Dynamic />
		</Suspense>
	);
}
