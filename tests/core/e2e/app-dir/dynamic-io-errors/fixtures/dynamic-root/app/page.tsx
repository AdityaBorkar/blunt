import { Suspense } from 'react';

import {
	IndirectionOne,
	IndirectionThree,
	IndirectionTwo,
} from './indirection';

export default async function Page() {
	return (
		<>
			<p>
				This page calls fetches eight times. Four are cached and Four are not.
				In each set of Four, two are wrapped in Suspense. This leaves two
				fetches that are uncached and not wrapped in Suspense which is
				considered an error when dynamicIO is enabled. We expect the build to
				fail with two component stacks that point to the offending IO
			</p>
			<IndirectionOne>
				<FetchingComponent cached={true} nonce="a" />
				<Suspense fallback="loading...">
					<FetchingComponent cached={true} nonce="b" />
				</Suspense>
			</IndirectionOne>
			<IndirectionTwo>
				<FetchingComponent nonce="c" />
				<Suspense fallback="loading...">
					<FetchingComponent nonce="d" />
				</Suspense>
			</IndirectionTwo>
			<IndirectionThree>
				<FetchingComponent nonce="e" />
				<Suspense fallback="loading...">
					<FetchingComponent nonce="f" />
				</Suspense>
			</IndirectionThree>
		</>
	);
}

async function FetchingComponent({
	nonce,
	cached,
}: {
	nonce: string;
	cached?: boolean;
}) {
	return (
		<div>
			message 1:{' '}
			{cached ? await fetchRandomCached(nonce) : await fetchRandom(nonce)}
		</div>
	);
}

const fetchRandomCached = async (entropy: string) => {
	const response = await fetch(
		`https://next-data-api-endpoint.vercel.app/api/random?b=${entropy}`,
		{ cache: 'force-cache' },
	);
	return response.text();
};

const fetchRandom = async (entropy: string) => {
	const response = await fetch(
		`https://next-data-api-endpoint.vercel.app/api/random?b=${entropy}`,
	);
	return response.text();
};
