export default function Page() {
	return 'opengraph-article';
}

export async function generateMetadata(_props, parentResolvingMetadata) {
	const parentMetadata = await parentResolvingMetadata;
	return {
		openGraph: {
			...parentMetadata.openGraph,
			// merging parent images URL instance should work
			images: [...parentMetadata.openGraph.images],
			title: `My custom title | ${parentMetadata.openGraph.title.absolute}`,
		},
	};
}
