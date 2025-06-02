import { strict as assert } from 'node:assert';
import { NEXT_RSC_UNION_QUERY } from 'next/dist/client/components/app-router-headers';
import Link from 'next/link';

export default async function Page({ searchParams }) {
	const rscUnionQuery = (await searchParams)[NEXT_RSC_UNION_QUERY];
	assert(rscUnionQuery === undefined);

	return (
		<>
			<p>no rsc query page</p>
			return{' '}
			<Link href="/some" id="link-to-pages">
				To /some
			</Link>
		</>
	);
}
