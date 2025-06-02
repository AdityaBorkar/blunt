'use client';

import { type ReactNode, useActionState } from 'react';

export function Form({
	action,
	children,
}: {
	action: () => Promise<string>;
	children: ReactNode;
}) {
	const [result, formAction] = useActionState(action, 'initial');

	return (
		<form action={formAction}>
			<button>Submit</button>
			<p>{result}</p>
			{children}
		</form>
	);
}
