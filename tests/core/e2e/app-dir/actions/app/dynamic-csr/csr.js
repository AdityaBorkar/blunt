'use client';

import { useState } from 'react';

import { inc } from '../client/actions';

export function CSR() {
	const [count, setCount] = useState(0);
	return (
		<button onClick={async () => setCount(await inc(count))}>{count}</button>
	);
}
