'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function InnerPage() {
	const searchParams = useSearchParams();
	return (
		<>
			<h1 id="replacestate-string-url">ReplaceState String Url</h1>
			<pre id="my-data">{searchParams.get('query')}</pre>
			<button
				id="replace-string-url"
				onClick={() => {
					const previousQuery = new URL(window.location.href).searchParams.get(
						'query',
					);
					const url = `?query=${
						previousQuery ? `${previousQuery}-added` : 'foo'
					}`;

					window.history.replaceState({}, '', url);
				}}
			>
				Replace searchParam using string url
			</button>

			<button
				id="replace-string-url-null"
				onClick={() => {
					const previousQuery = new URL(window.location.href).searchParams.get(
						'query',
					);
					const url = `?query=${
						previousQuery ? `${previousQuery}-added` : 'foo'
					}`;

					window.history.replaceState(null, '', url);
				}}
			>
				Replace searchParam with null data param
			</button>

			<button
				id="replace-string-url-undefined"
				onClick={() => {
					const previousQuery = new URL(window.location.href).searchParams.get(
						'query',
					);
					const url = `?query=${
						previousQuery ? `${previousQuery}-added` : 'foo'
					}`;

					window.history.replaceState(undefined, '', url);
				}}
			>
				Replace searchParam with undefined data param
			</button>
		</>
	);
}

export default function Page() {
	return (
		<Suspense>
			<InnerPage />
		</Suspense>
	);
}
