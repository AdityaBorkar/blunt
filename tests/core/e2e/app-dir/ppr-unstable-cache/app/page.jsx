import { unstable_cache } from 'next/cache';

const getData = unstable_cache(
	async () => {
		const noStore = await fetch(
			`${process.env.TEST_DATA_SERVER}?cache=no-store`,
			{ cache: 'no-store', method: 'GET' },
		).then((res) => res.text());

		const forceCache = await fetch(
			`${process.env.TEST_DATA_SERVER}?cache=force-cache`,
			{ cache: 'force-cache', method: 'GET' },
		).then((res) => res.text());

		return JSON.stringify(
			{
				data: {
					forceCache,
					noStore,
				},
				random: Math.floor(Math.random() * 1000).toString(),
			},
			null,
			2,
		);
	},
	undefined,
	{
		tags: ['unstable-cache-fetch'],
	},
);

export default async function Page() {
	const data = await getData();

	return <pre id="data">{data}</pre>;
}
