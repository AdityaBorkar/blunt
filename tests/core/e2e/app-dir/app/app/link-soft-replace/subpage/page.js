import Link from 'next/link';

export default function Page() {
	return (
		<Link href="/link-soft-replace" id="back-link" replace>
			Self Link
		</Link>
	);
}
