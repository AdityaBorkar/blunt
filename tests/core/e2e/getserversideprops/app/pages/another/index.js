import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';

export async function getServerSideProps() {
	const text = fs
		.readFileSync(path.join(process.cwd(), 'world.txt'), 'utf8')
		.trim();

	return {
		props: {
			time: Date.now(),
			world: text,
		},
	};
}

export default ({ world, time }) => (
	<>
		<p>hello {world}</p>
		<span id="anotherTime">time: {time}</span>
		<Link href="/" id="home">
			to home
		</Link>
		<br />
		<Link href="/something" id="something">
			to something
		</Link>
	</>
);
