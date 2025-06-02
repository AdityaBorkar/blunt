import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { Dynamic } from '../../../../components/dynamic';

const NotFound = () => {
	notFound();
};

export default function NotFoundPage() {
	return (
		<>
			<Suspense
				fallback={<Dynamic fallback pathname="/navigation/not-found/dynamic" />}
			>
				<Dynamic pathname="/navigation/not-found/dynamic" />
			</Suspense>
			<NotFound />
		</>
	);
}
