export default async function Page(props) {
	const params = await props.params;
	return (
		<h1 data-params={params.slug?.join('/') ?? ''} id="text">
			hello from /catch-all-optional/{params.slug?.join('/')}
		</h1>
	);
}
