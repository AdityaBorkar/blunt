'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function Page(props) {
	const params = use(props.params);
	const router = useRouter();
	return (
		<>
			<h1 id={`message-${params.id}`}>Hello from {params.id}</h1>
			<Link
				href={params.id === '1' ? '/back-forward/2' : '/back-forward/1'}
				id="to-other-page"
			>
				Go to {params.id === '1' ? '2' : '1'}
			</Link>
			<button id="back-button" onClick={() => router.back()}>
				Back
			</button>
			<button id="forward-button" onClick={() => router.forward()}>
				Forward
			</button>
		</>
	);
}
