export default function Page(_props) {
	return <p>/import/[slug]</p>;
}

export function getStaticProps() {
	return {
		redirect: {
			destination: '/somewhere',
			permanent: false,
		},
	};
}

export function getStaticPaths() {
	return {
		fallback: true,
		paths: [],
	};
}
