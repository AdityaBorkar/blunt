export async function getStaticPaths() {
	return {
		fallback: false,
		paths: ['/gssp/foo/'],
	};
}

export async function getStaticProps({ params }) {
	return { props: params };
}

export default function Page({ slug }) {
	return `Hello ${slug}`;
}
