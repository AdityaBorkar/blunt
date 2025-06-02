import Link from 'next/link';
import { useRouter } from 'next/router';

export async function getServerSideProps({ params, query }) {
	return {
		params: params || {},
		query: query || {},
		random: Math.random(),
		time: Date.now(),
		world: 'world',
	};
}

export default ({ world, time, params, random, query }) => {
	return (
		<>
			<p>hello: {world}</p>
			<span>time: {time}</span>
			<div id="random">{random}</div>
			<div id="params">{JSON.stringify(params)}</div>
			<div id="initial-query">{JSON.stringify(query)}</div>
			<div id="query">{JSON.stringify(useRouter().query)}</div>
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
