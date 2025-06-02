'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';

export default function Page({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	if (use(params).locale !== 'en') {
		notFound();
	}

	return <div>Regular Modal Page</div>;
}
