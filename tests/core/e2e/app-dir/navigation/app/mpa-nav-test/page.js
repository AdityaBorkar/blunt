'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Page() {
	const prefetchRef = useRef();
	const slowPageRef = useRef();

	useEffect(() => {
		function triggerPrefetch() {
			const event = new MouseEvent('mouseover', {
				bubbles: true,
				cancelable: true,
				view: window,
			});

			prefetchRef.current.dispatchEvent(event);
			console.log('dispatched');
		}

		slowPageRef.current.click();

		setInterval(() => {
			triggerPrefetch();
		}, 1000);
	}, []);

	return (
		<>
			<Link href="/slow-page" id="link-to-slow-page" ref={slowPageRef}>
				To /slow-page
			</Link>
			<Link href="/hash" id="prefetch-link" ref={prefetchRef}>
				Prefetch link
			</Link>
		</>
	);
}
