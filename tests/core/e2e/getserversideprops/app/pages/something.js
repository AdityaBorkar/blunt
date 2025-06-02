import Link from 'next/link';
import { useRouter } from 'next/router';

export async function getServerSideProps({ params, query, resolvedUrl }) {
	return {
		props: {
			params: params || {},
			query: query || {},
			random: Math.random(),
			resolvedUrl: resolvedUrl,
			time: Date.now(),
			world: 'world',
		},
	};
}

export default ({
	world,
	time,
	params,
	random,
	query,
	appProps,
	resolvedUrl,
}) => {
	const router = useRouter();

	return (
		<>
			<p>hello: {world}</p>
			<span>time: {time}</span>
			<div id="random">{random}</div>
			<div id="params">{JSON.stringify(params)}</div>
			<div id="initial-query">{JSON.stringify(query)}</div>
			<div id="query">{JSON.stringify(router.query)}</div>
			<div id="app-query">{JSON.stringify(appProps.query)}</div>
			<div id="app-url">{appProps.url}</div>
			<div id="resolved-url">{resolvedUrl}</div>
			<div id="as-path">{router.asPath}</div>
			<Link href="/" id="home">
				to home
			</Link>
			<br />
			<Link href="/another" id="another">
				to another
			</Link>
		</>
	);
};
