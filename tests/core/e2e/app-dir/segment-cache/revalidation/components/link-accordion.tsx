'use client';

import Form from 'next/form';
import Link from 'next/link';
import { useState } from 'react';

export function LinkAccordion({
	href,
	children,
	prefetch,
}: {
	href: string;
	children: React.ReactNode;
	prefetch?: boolean;
}) {
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
				<Link href={href} prefetch={prefetch}>
					{children}
				</Link>
			) : (
				<>{children} (link is hidden)</>
			)}
		</>
	);
}

export function FormAccordion({
	action,
	children,
	prefetch,
}: {
	action: string;
	children: React.ReactNode;
	prefetch?: null | false;
}) {
	const [isVisible, setIsVisible] = useState(false);
	return (
		<>
			<input
				checked={isVisible}
				data-form-accordion={action}
				onChange={() => setIsVisible(!isVisible)}
				type="checkbox"
			/>
			{isVisible ? (
				<Form action={action} prefetch={prefetch}>
					<button>{children}</button>
				</Form>
			) : (
				<>{children} (form is hidden)</>
			)}
		</>
	);
}
