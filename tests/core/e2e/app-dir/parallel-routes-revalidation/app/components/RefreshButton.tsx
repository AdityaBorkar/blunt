'use client';

import { useRouter } from 'next/navigation';

export function RefreshButton() {
	const router = useRouter();

	return (
		<button
			id="refresh-button"
			onClick={() => router.refresh()}
			style={{ color: 'red', padding: '10px' }}
		>
			Refresh
		</button>
	);
}
