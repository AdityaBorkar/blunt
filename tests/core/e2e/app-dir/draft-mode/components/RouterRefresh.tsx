'use client';

import { useRouter } from 'next/navigation';

export function RouteRefresher() {
	const router = useRouter();

	return (
		<button id="refresh" onClick={() => router.refresh()}>
			Refresh
		</button>
	);
}
