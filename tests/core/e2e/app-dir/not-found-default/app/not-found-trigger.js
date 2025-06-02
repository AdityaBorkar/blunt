'use client';

import { notFound, useSearchParams } from 'next/navigation';

export default function NotFoundTrigger() {
	const searchParams = useSearchParams();

	if (searchParams.get('root-not-found')) {
		notFound();
	}
	return null;
}
