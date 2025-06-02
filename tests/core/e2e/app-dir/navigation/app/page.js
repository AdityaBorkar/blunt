'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Page() {
	const params = useSearchParams();
	return (
		<>
			<Link href="/?a=b&c=d" id="set-query">
				set Query
			</Link>
			<div id="query">{params.toString()}</div>
		</>
	);
}
