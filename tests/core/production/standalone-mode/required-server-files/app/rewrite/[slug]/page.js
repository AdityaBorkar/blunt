import { unstable_noStore } from 'next/cache';
import { Suspense } from 'react';

export function generateStaticParams() {
	return [{ slug: 'first-cookie' }];
}

function Postpone({ children }) {
	unstable_noStore();
	return children;
}

export default async function Page({ params }) {
	return (
		<>
			<Suspense>
				<Postpone>
					<p id="page">/rewrite/[slug]</p>
					<p id="params">{JSON.stringify(params)}</p>
					<p id="now">{Date.now()}</p>
				</Postpone>
			</Suspense>
		</>
	);
}
