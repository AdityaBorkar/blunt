export async function getServerSideProps() {
	return {
		props: (async () => ({
			text: 'promise',
		}))(),
	};
}

export default ({ text }) => (
	<>
		<div>hello {text}</div>
	</>
);
