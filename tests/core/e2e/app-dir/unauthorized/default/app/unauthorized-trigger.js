'use client';

import { unauthorized, useSearchParams } from 'next/navigation';

export default function ForbiddenTrigger() {
	const searchParams = useSearchParams();

	if (searchParams.get('root-unauthorized')) {
		unauthorized();
	}
	return null;
}
