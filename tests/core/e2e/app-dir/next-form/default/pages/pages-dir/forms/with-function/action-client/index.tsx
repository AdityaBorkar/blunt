'use client';

import Form from 'next/form';
import { useRouter } from 'next/router';
import * as React from 'react';

const isReact18 = typeof React.useActionState !== 'function';

export default isReact18 ? DummyPage : Page;

function DummyPage() {
	return <>This test cannot run in React 18</>;
}

function Page() {
	const destination = '/pages-dir/redirected-from-action';
	const router = useRouter();
	const [, dispatch] = React.useActionState(() => {
		const to = `${destination}?${new URLSearchParams({ query })}`;
		router.push(to);
	}, undefined);

	const [query, setQuery] = React.useState('');
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
