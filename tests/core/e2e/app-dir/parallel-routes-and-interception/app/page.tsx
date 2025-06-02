import Link from 'next/link';

export default function Page() {
	return (
		<>
			<p>hello world</p>
			<Link href="/nested">to nested</Link>
		</>
	);
}
