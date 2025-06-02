import { nanoid } from 'nanoid';
import Link from 'next/link';

export default function Page() {
	return (
		<>
			<h1 id="render-id">{nanoid()}</h1>
			<Link href="/navigation" id="link">
				To Navigation
			</Link>
		</>
	);
}
