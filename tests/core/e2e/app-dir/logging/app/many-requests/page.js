export default async function Page() {
	await Promise.all(
		new Array(12).fill(undefined).map((_, index) =>
			index > 5
				? fetch(`https://next-data-api-endpoint.vercel.app/api/random?${index}`)
				: fetch(`https://next-data-api-endpoint.vercel.app/api/random`, {
						body: index,
						method: 'POST',
					}),
		),
	);

	return <h1>Many Requests</h1>;
}
