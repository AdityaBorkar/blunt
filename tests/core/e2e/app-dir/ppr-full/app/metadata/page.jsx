import { unstable_noStore } from 'next/cache';
import { Suspense } from 'react';

import { Dynamic } from '../../components/dynamic';

export const revalidate = 120;

export async function generateMetadata() {
	unstable_noStore();

	return { title: 'Metadata' };
}

export default function MetadataPage() {
	return (
		<Suspense fallback={<Dynamic fallback pathname="/metadata" />}>
			<Dynamic pathname="/metadata" />
		</Suspense>
	);
}
