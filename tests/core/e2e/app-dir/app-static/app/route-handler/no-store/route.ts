export const revalidate = 5;

export async function GET() {
	const data = await fetch(
		'https://next-data-api-endpoint.vercel.app/api/random',
		{ cache: 'no-store' },
	).then((res) => res.text());

	return Response.json({ data, now: Date.now() });
}
