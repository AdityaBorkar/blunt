'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Reload() {
	const router = useRouter();

	useEffect(() => {
		fetch(new URL('/api/set-token', location.origin), {
			credentials: 'include',
			method: 'POST',
		}).then(() => {
			router.refresh();
		});
	}, [router]);

	return null;
}
