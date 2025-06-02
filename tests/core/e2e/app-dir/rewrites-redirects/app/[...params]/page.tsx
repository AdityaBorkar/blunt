export default async function Page(props: {
	params: Promise<{ params: Array<string> }>;
}) {
	const params = await props.params;
	const { params: catchAllParams } = await params;
	return (
		<div className={`page_${catchAllParams.join('_')}`} id="page">
			{catchAllParams.join('/')}
		</div>
	);
}
