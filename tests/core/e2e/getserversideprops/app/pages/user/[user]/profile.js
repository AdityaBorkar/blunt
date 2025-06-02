import Link from 'next/link';

export async function getServerSideProps({ query }) {
	return {
		props: {
			time: (await import('node:perf_hooks')).performance.now(),
			user: query.user,
		},
	};
}

export default ({ user, time }) => {
	return (
		<>
			<p>User: {user}</p>
			<span>time: {time}</span>
			<Link href="/" id="home">
				to home
			</Link>
		</>
	);
};
