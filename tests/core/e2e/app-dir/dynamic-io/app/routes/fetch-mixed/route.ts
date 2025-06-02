import type { NextRequest } from 'next/server';

import { getSentinelValue } from '../../getSentinelValue';

export async function GET(_request: NextRequest) {
	const fetcheda = await fetchRandomCached('a');
	const fetchedb = await fetchRandomUncached('b');
	return new Response(
		JSON.stringify({
			random1: fetcheda,
			random2: fetchedb,
			value: getSentinelValue(),
		}),
	);
}

const fetchRandomCached = async (entropy: string) => {
	const response = await fetch(
		`https://next-data-api-endpoint.vercel.app/api/random?b=${entropy}`,
		{ cache: 'force-cache' },
	);
	return response.text();
};

const fetchRandomUncached = async (entropy: string) => {
	const response = await fetch(
		`https://next-data-api-endpoint.vercel.app/api/random?b=${entropy}`,
	);
	return response.text();
};
