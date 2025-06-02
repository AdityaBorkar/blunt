import Link from 'next/link';

export default function Page() {
	return (
		<Link href="/link-hard-replace" id="back-link" replace>
			Self Link
		</Link>
	);
}
