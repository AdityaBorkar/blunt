'use client';

import { usePathname } from 'next/navigation';

export default function Page() {
	const pathname = usePathname();

	return (
		<>
			<h1 data-pathname={pathname} id="pathname">
				hello from {pathname}
			</h1>
		</>
	);
}
