import { useRouter } from 'next/router';

export default function Page(props) {
	const router = useRouter();

	return (
		<>
			<p id="page">blog slug</p>
			<p id="props">{JSON.stringify(props)}</p>
			<p id="query">{JSON.stringify(router.query)}</p>
			<p id="pathname">{router.pathname}</p>
			<p id="asPath">{router.asPath}</p>
		</>
	);
}

export function getStaticProps({ params }) {
	console.log({ blogSlug: true, params });

	return {
		props: {
			blogSlug: true,
			params,
			random: Math.random() + Date.now(),
		},
		revalidate: 1,
	};
}

export function getStaticPaths() {
	return {
		fallback: false,
		paths: ['/fallback-false/first', '/fallback-false/second'],
	};
}
