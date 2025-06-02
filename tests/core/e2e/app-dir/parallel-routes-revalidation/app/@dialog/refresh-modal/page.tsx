'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();

	return (
		<dialog open>
			<h1>Modal</h1>

			<br />

			<button id="refresh-router" onClick={() => router.refresh()}>
				Refresh Router
			</button>
			<Link href="/">Close</Link>
		</dialog>
	);
}
