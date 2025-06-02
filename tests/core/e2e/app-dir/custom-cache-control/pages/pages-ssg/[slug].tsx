export function getStaticProps({ params }) {
	return {
		props: {
			now: Date.now(),
			params,
		},
		revalidate: 120,
	};
}

export function getStaticPaths() {
	return {
		fallback: 'blocking',
		paths: [
			{
				params: { slug: 'first' },
			},
		],
	};
}

export default function Page({ params }) {
	return (
		<>
			<p>/pages-ssg/[slug]</p>
			<p>{JSON.stringify(params)}</p>
		</>
	);
}
