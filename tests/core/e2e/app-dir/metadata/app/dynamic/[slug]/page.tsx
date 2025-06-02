async function format({ params, searchParams }) {
	const { slug } = params;
	const { q } = await searchParams;
	return `params - ${slug}${q ? ` query - ${q}` : ''}`;
}

export default async function page(props) {
	return <p>{await format(props)}</p>;
}

export async function generateMetadata(props, parent) {
	const parentMetadata = await parent;
	/* mutating */
	return {
		...parentMetadata,
		keywords: parentMetadata.keywords.concat(['child']),
		title: await format(props),
	};
}
