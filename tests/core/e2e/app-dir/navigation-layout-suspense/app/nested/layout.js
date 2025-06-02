import Link from 'next/link';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function Layout(props) {
	return (
		<>
			<div>
				<Link className="text-blue-500" href={`/`}>
					Home Page
				</Link>
			</div>
			<Suspense fallback={<h1>Loading...</h1>}>{props.children}</Suspense>
		</>
	);
}
