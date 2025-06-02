'use client';

import { lazy, useState } from 'react';

const Lazy = lazy(() => import('../text-lazy-client'));

export function LazyClientComponent() {
	const [state] = useState('use client');
	return (
		<>
			<Lazy />
			<p className="hi">next-dynamic {state}</p>
		</>
	);
}
