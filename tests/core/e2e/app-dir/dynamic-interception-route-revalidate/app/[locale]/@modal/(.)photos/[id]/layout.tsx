'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	return <>{pathname.endsWith('view') ? children : null}</>;
}
