'use client';

import { use } from 'react';

export default function Page({ searchParams }) {
	const sp = use(searchParams);
	return (
		<h1
			data-param-first={sp.first ?? 'N/A'}
			data-param-not-real={sp.notReal ?? 'N/A'}
			data-param-second={sp.second ?? 'N/A'}
			data-param-third={sp.third ?? 'N/A'}
			id="params"
		>
			hello from searchParams prop client
		</h1>
	);
}
