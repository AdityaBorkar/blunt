import Link from 'next/link';

export default function page() {
	return (
		<Link href="/assertion/page" id="link-to-app">
			To /assertion/page
		</Link>
	);
}
