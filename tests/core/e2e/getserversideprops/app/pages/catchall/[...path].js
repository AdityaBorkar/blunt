import Link from 'next/link';
import { useRouter } from 'next/router';

export async function getServerSideProps({ params }) {
	return {
		props: {
			params: params || {},
			random: Math.random(),
			time: Date.now(),
			world: 'world',
		},
	};
}

export default ({ world, time, params, random }) => {
	return (
		<>
			<p>hello: {world}</p>
			<span>time: {time}</span>
			<div id="random">{random}</div>
			<div id="params">{JSON.stringify(params)}</div>
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
