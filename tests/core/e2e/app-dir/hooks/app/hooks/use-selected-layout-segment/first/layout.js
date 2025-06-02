'use client';

import {
	useSelectedLayoutSegment,
	useSelectedLayoutSegments,
} from 'next/navigation';

export default function Layout({ children }) {
	const selectedLayoutSegments = useSelectedLayoutSegments();
	const selectedLayoutSegment = useSelectedLayoutSegment();

	return (
		<>
			<p id="inner-layout">{JSON.stringify(selectedLayoutSegments)}</p>
			<p id="inner-layout-segment">{JSON.stringify(selectedLayoutSegment)}</p>
			{children}
		</>
	);
}
