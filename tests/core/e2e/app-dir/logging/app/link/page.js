import Link from 'next/link';

export default function Page() {
	return (
		<Link href="/foo" id="foo">
			Trigger RSC request
		</Link>
	);
}
