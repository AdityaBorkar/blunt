'use client';

import { redirect } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';

export default function Root({ children }: { children: React.ReactNode }) {
	const [clicked, setClicked] = useState(false);
	if (clicked) {
		redirect('/result');
	}

	return (
		<html>
			<body>
				<button id="trigger-redirect" onClick={() => setClicked(true)}>
					Click to redirect
				</button>
				{children}
			</body>
		</html>
	);
}
