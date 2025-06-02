import { useRouter } from 'next/router';

export const getServerSideProps = ({ params, resolvedUrl }) => {
	return {
		props: {
			hello: 'world',
			random: Math.random(),
			resolvedUrl,
			slug: params.slug,
		},
	};
};

export default function Page(props) {
	const router = useRouter();
	return (
		<>
			<p id="dynamic">dynamic page</p>
			<p id="slug">{props.slug}</p>
			<p id="resolved-url">{props.resolvedUrl}</p>
			<p id="router">{JSON.stringify(router)}</p>
			<p id="props">{JSON.stringify(props)}</p>
		</>
	);
}
