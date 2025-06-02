'use client';

import { usePathname } from 'next/navigation';

export default function Page() {
	const pathname = usePathname();
	return (
		<>
			<h1 id="replacestate-pathname">ReplaceState Pathname</h1>
			<pre id="my-data">{pathname}</pre>
			<button
				id="replace-pathname"
				onClick={() => {
					const url = new URL(window.location.href);
					url.pathname = '/my-non-existent-path';
					window.history.replaceState({}, '', url);
				}}
			>
				Push pathname
			</button>
		</>
	);
}
