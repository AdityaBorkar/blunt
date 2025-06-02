'use client';

import { usePathname } from 'next/navigation';
import { Suspense, useCallback } from 'react';

function Pathname() {
	const pathname = usePathname();
	return <pre id="pathname">{pathname}</pre>;
}

export function Login({ signedIn = false, fallback }) {
	const onClick = useCallback(async () => {
		if (signedIn) {
			await fetch('/api/cookie?name=session', {
				credentials: 'same-origin',
				method: 'DELETE',
			});
		} else {
			await fetch('/api/cookie?name=session', {
				credentials: 'same-origin',
				method: 'POST',
			});
		}

		window.location.reload();
	}, [signedIn]);

	return (
		<>
			<Suspense>
				<Pathname />
			</Suspense>
			<button
				className="rounded-md bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
				id="login"
				onClick={onClick}
			>
				{fallback ? 'Sign ..' : signedIn ? 'Sign Out' : 'Sign In'}
			</button>
		</>
	);
}

export function Delay({ active = false, fallback }) {
	const onClick = useCallback(async () => {
		if (active) {
			await fetch('/api/cookie?name=delay', {
				credentials: 'same-origin',
				method: 'DELETE',
			});
		} else {
			await fetch('/api/cookie?name=delay', {
				credentials: 'same-origin',
				method: 'POST',
			});
		}

		window.location.reload();
	}, [active]);

	return (
		<>
			<pre>
				delay: {fallback ? 'loading...' : active ? 'enabled' : 'disabled'}
			</pre>
			<button
				className="rounded-md bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
				id="login"
				onClick={onClick}
			>
				{fallback ? 'Loading...' : active ? 'Disable Delay' : 'Enable Delay'}
			</button>
		</>
	);
}
