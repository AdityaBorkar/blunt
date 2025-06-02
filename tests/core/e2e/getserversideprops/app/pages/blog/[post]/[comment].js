import Link from 'next/link';

export async function getServerSideProps({ query }) {
	return {
		props: {
			comment: query.comment,
			post: query.post,
			time: Date.now(),
		},
	};
}

export default ({ post, comment, time }) => {
	return (
		<>
			<p>Post: {post}</p>
			<p>Comment: {comment}</p>
			<span>time: {time}</span>
			<Link href="/" id="home">
				to home
			</Link>
		</>
	);
};
