import { Suspense } from 'react';

export default function Layout({ children }) {
	return (
		<div data-date={Date.now()}>
			<h2>Suspenseful Layout</h2>
			<Suspense>{children}</Suspense>
		</div>
	);
}
