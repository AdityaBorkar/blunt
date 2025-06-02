export const getStaticPaths = async () => {
	return {
		fallback: 'blocking',
		paths: [],
	};
};
export const getStaticProps = async () => {
	return {
		notFound: true,
	};
};

export default function Page() {
	return <p>slug</p>;
}
