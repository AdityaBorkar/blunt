'use client';

import { useRouter } from 'next/navigation';

export function RefreshButton() {
	const { refresh } = useRouter();

	return (
		<button onClick={refresh} type="button">
			refresh
		</button>
	);
}
