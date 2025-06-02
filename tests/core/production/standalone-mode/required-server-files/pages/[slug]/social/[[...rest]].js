export const getStaticProps = ({ params }) => {
	return {
		props: {
			params: params || null,
			random: Math.random(),
		},
		revalidate: 1,
	};
};

export const getStaticPaths = () => {
	return {
		fallback: true,
		paths: [],
	};
};

export default function Page(props) {
	return (
		<>
			<p id="page">/[slug]/social/[[...rest]]</p>
			<p id="props">{JSON.stringify(props)}</p>
		</>
	);
}
