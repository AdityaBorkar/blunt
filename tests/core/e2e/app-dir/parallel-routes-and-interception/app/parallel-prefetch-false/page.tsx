import Link from 'next/link';

export default function Layout() {
	return (
		<div>
			<Link href="/parallel-prefetch-false/foo" prefetch={false}>
				link
			</Link>
		</div>
	);
}
