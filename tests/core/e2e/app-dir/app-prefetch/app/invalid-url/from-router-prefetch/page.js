'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Delay } from '../delay';
import { INVALID_URL } from '../invalid-url';

export const dynamic = 'force-dynamic';

export default function Page() {
	const router = useRouter();
	useEffect(() => {
		router.prefetch(INVALID_URL);
	}, [router]);

	return (
		<Delay>
			<h1>Hello, world!</h1>
		</Delay>
	);
}
