import { useRouter } from 'next/router';

export const getStaticProps = ({ params }) => {
	return {
		props: {
			hello: 'world',
			random: Math.random(),
			slug: params.slug,
		},
	};
};

export const getStaticPaths = async () => {
	// make sure fetch if polyfilled
	await fetch('https://example.vercel.sh').then((res) => res.text());

	return {
		fallback: true,
		paths: ['/fallback/first'],
	};
};

export default function Page(props) {
	const router = useRouter();
	return (
		<>
			<p id="fallback">fallback page</p>
			<p id="slug">{props.slug}</p>
			<p id="router">{JSON.stringify(router)}</p>
			<p id="props">{JSON.stringify(props)}</p>
		</>
	);
}
