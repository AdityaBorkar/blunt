import { useRouter } from 'next/router';

export const getStaticProps = () => {
	return {
		props: {
			hello: 'world',
		},
	};
};

export const getStaticPaths = () => {
	return {
		fallback: true,
		paths: [],
	};
};

export default function Page(_props) {
	const router = useRouter();
	return (
		<>
			<p id="slug-page">[slug] page</p>
			<p id="router">{JSON.stringify(router)}</p>
		</>
	);
}
