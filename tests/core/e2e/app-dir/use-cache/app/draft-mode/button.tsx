'use client';

import type React from 'react';
import { useFormStatus } from 'react-dom';

export function Button({
	children,
	id,
}: React.PropsWithChildren<{ id: string }>) {
	const { pending } = useFormStatus();

	return (
		<button disabled={pending} id={id}>
			{children}
		</button>
	);
}
