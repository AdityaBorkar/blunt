export function getStaticProps() {
	return {
		props: {
			now: Date.now(),
		},
	};
}

export function getStaticPaths() {
	return {
		fallback: 'blocking',
		paths: ['/first'],
	};
}

export default function Page() {
	return <p>catch-all page</p>;
}
