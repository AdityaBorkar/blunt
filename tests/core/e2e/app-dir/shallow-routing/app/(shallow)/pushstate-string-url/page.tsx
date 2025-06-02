'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function InnerPage() {
	const searchParams = useSearchParams();
	return (
		<>
			<h1 id="pushstate-string-url">PushState String Url</h1>
			<pre id="my-data">{searchParams.get('query')}</pre>
			<button
				id="push-string-url"
				onClick={() => {
					const previousQuery = new URL(window.location.href).searchParams.get(
						'query',
					);
					const url = `?query=${
						previousQuery ? `${previousQuery}-added` : 'foo'
					}`;

					window.history.pushState({}, '', url);
				}}
			>
				Push searchParam using string url
			</button>

			<button
				id="push-string-url-null"
				onClick={() => {
					const previousQuery = new URL(window.location.href).searchParams.get(
						'query',
					);
					const url = `?query=${
						previousQuery ? `${previousQuery}-added` : 'foo'
					}`;

					window.history.pushState(null, '', url);
				}}
			>
				Push searchParam with null data param
			</button>

			<button
				id="push-string-url-undefined"
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
				Push searchParam with undefined data param
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
