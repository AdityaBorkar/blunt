export default function Page() {
	return <p id="alternates">alternate</p>;
}

export async function generateMetadata(_props, parentResolvingMetadata) {
	const parentMetadata = await parentResolvingMetadata;

	return {
		...parentMetadata,
		alternates: {
			...parentMetadata.alternates,
			media: {
				'only screen and (max-width: 600px)': '/mobile',
			},
			types: {
				'application/rss+xml': [
					{ title: 'rss', url: '/blog.rss' },
					{ title: 'js title', url: '/blog/js.rss' },
				],
			},
		},
	};
}
