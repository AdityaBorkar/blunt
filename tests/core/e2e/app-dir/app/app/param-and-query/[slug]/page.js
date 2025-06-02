'use client';

import { use } from 'react';

export default function Page(props) {
	const searchParams = use(props.searchParams);
	const params = use(props.params);
	return (
		<h1
			data-params={params.slug}
			data-query={searchParams.slug}
			id="params-and-query"
		>
			hello from /param-and-query/{params.slug}?slug={searchParams.slug}
		</h1>
	);
}
