import type {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next';

type Post = {
	author: string;
	content: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		fallback: false,
		paths: [{ params: { post: '1' } }],
	};
};

export const getStaticProps = async (
	_ctx: GetStaticPropsContext<{ post: string }>,
) => {
	const posts: Post[] = [
		{
			author: 'Vercel',
			content: 'hello world',
		},
	];

	return {
		props: {
			posts,
		},
	};
};

function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			{posts.map((post) => (
				<div key={post.author}>{post.author}</div>
			))}
		</>
	);
}

export default Blog;
