import fs from 'node:fs';
import path from 'node:path';
import { useRouter } from 'next/router';

export async function getServerSideProps({ res }) {
	res.setHeader('cache-control', 's-maxage=1, stale-while-revalidate=31535999');

	const data = await fs.promises.readFile(
		path.join(process.cwd(), 'data.txt'),
		'utf8',
	);

	if (data.trim() === 'hide') {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			data,
			// make sure fetch if polyfilled
			example: await fetch('https://example.vercel.sh').then((res) =>
				res.text(),
			),
			hello: 'world',
			random: Math.random(),
		},
	};
}

export default function Page(props) {
	const router = useRouter();

	return (
		<>
			<p id="gssp">getServerSideProps page</p>
			<p id="router">{JSON.stringify(router)}</p>
			<p id="props">{JSON.stringify(props)}</p>
		</>
	);
}
