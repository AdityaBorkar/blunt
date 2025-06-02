'use client';

import { useActionState } from 'react';

export function Form({
	action,
	id,
}: {
	action: () => Promise<string>;
	id: string;
}) {
	const [result, formAction] = useActionState(action, 'initial');

	return (
		<form action={formAction} id={id}>
			<button>Submit</button>
			<p>{result}</p>
		</form>
	);
}
