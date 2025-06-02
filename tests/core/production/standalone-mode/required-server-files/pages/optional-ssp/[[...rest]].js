export const getServerSideProps = ({ query, params }) => {
	return {
		props: {
			params: params || null,
			query: query,
			random: Math.random(),
		},
	};
};

export default function Page(props) {
	return <p id="props">{JSON.stringify(props)}</p>;
}
