'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function Page({
	params,
}: {
	params: Promise<{ dynamic: string }>;
}) {
	const router = useRouter();
	return (
		<div>
			<h2 id="detail-title">Detail Page (Intercepted)</h2>
			<p id="params">{use(params).dynamic}</p>
			<span id="random-number" suppressHydrationWarning>
				{Math.random()}
			</span>
			<button onClick={() => router.refresh()}>Refresh</button>
		</div>
	);
}
