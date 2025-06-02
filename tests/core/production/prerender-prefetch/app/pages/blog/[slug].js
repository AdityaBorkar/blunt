export default function Page(props) {
	return (
		<>
			<p id="page">blog/[slug]</p>
			<p id="props">{JSON.stringify(props)}</p>
		</>
	);
}

export function getStaticProps({ params }) {
	console.log('revalidating /blog', params.slug);
	return {
		props: {
			now: Date.now(),
			params,
		},
		revalidate: 2,
	};
}

export function getStaticPaths() {
	return {
		fallback: false,
		paths: ['/blog/first', '/blog/second'],
	};
}
