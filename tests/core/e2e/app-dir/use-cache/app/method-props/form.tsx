'use client';

import { useActionState } from 'react';

export function Form({
	id,
	getRandomValue,
}: {
	id: string;
	getRandomValue: () => Promise<number>;
}) {
	const [result, formAction, isPending] = useActionState(getRandomValue, -1);

	return (
		<form action={formAction} id={id}>
			<button>Submit</button>
			<p>{isPending ? 'loading...' : result}</p>
		</form>
	);
}
