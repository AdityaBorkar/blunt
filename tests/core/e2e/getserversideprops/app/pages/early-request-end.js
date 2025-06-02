export function getServerSideProps({ res }) {
	res.statusCode = 200;
	res.end('hello from gssp');

	return {
		props: {},
	};
}

export default function Page(_props) {
	return <p>early request end</p>;
}
