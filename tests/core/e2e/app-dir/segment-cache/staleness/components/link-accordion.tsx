'use client';

import Link from 'next/link';
import { useState } from 'react';

export function LinkAccordion({ href, children }) {
	const [isVisible, setIsVisible] = useState(false);
	return (
		<>
			<input
				checked={isVisible}
				data-link-accordion={href}
				onChange={() => setIsVisible(!isVisible)}
				type="checkbox"
			/>
			{isVisible ? (
				<Link href={href}>{children}</Link>
			) : (
				`${children} (link is hidden)`
			)}
		</>
	);
}
