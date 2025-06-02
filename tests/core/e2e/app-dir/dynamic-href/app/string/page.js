import Link from 'next/link';

export default function HomePage() {
	return (
		<Link href="/object/[slug]" id="link">
			to slug
		</Link>
	);
}
