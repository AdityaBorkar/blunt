export const runtime = 'edge';

export default async function Page() {
	const data = await fetch(
		'https://next-data-api-endpoint.vercel.app/api/echo-body',
		{
			body: JSON.stringify({ hello: 'world' }),
			duplex: 'half',
			method: 'POST',
			next: {
				revalidate: 3,
			},
		},
	).then((res) => res.json());

	return (
		<>
			<p id="page">/variable-revalidate-edge/encoding</p>
			<p id="page-data">{JSON.stringify(data)}</p>
		</>
	);
}
