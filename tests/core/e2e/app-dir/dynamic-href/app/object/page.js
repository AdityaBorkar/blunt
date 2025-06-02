import Link from 'next/link';

export default function HomePage() {
	return (
		<Link
			href={{
				pathname: '/object/[slug]',
				query: { slug: '1' },
			}}
			id="link"
		>
			to slug
		</Link>
	);
}
