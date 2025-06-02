'use client';

import { useState } from 'react';

export function Counter() {
	const [count, setCount] = useState(0);
	return (
		<div>
			<p id="current-count">Count: {count}</p>
			<button id="increase-count" onClick={() => setCount(count + 1)}>
				Increment
			</button>
		</div>
	);
}
