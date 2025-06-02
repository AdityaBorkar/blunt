import { connection } from 'next/server';
import { Suspense } from 'react';

export default function Page() {
	return (
		<div>
			inner static page
			<Suspense>
				<Inner />
			</Suspense>
		</div>
	);
}

async function Inner() {
	await new Promise((resolve) => setTimeout(resolve, 500));
	return <div>inner</div>;
}

export async function generateMetadata() {
	await new Promise((resolve) => setTimeout(resolve, 1 * 1000));
	await connection();
	return {
		description: 'partial static page description',
		title: 'partial static page',
	};
}
