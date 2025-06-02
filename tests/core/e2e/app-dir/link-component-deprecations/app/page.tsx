import Link from 'next/link';

export default function HomePage() {
	return (
		<Link href="/target-page" legacyBehavior>
			<a>Target page</a>
		</Link>
	);
}
