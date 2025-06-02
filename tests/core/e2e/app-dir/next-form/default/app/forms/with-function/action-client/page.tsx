'use client';

import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useActionState, useState } from 'react';

export default function Page() {
	const destination = '/redirected-from-action';
	const router = useRouter();
	const [, dispatch] = useActionState(() => {
		const to = `${destination}?${new URLSearchParams({ query })}`;
		router.push(to);
	}, undefined);

	const [query, setQuery] = useState('');
	return (
		<Form action={dispatch} id="search-form">
			<input
				name="query"
				onChange={(e) => setQuery(e.target.value)}
				value={query}
			/>

			<button type="submit">Submit (client action)</button>
		</Form>
	);
}
