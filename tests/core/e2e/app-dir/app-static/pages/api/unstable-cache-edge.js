import { unstable_cache } from 'next/cache';

export const config = {
	runtime: 'edge',
};

export default async function handler(_req) {
	const data = await unstable_cache(async () => {
		return {
			random: Math.random(),
		};
	})();

	return new Response(
		JSON.stringify({
			data,
			now: Date.now(),
		}),
		{
			headers: {
				'content-type': 'application/json',
			},
		},
	);
}
