'use client';

import { useSearchParams } from 'next/navigation';
import { Fragment } from 'react';

export default function SearchLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const searchParams = useSearchParams();
	return <Fragment key={searchParams?.get('q')}>{children}</Fragment>;
}
