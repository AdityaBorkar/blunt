import Link from 'next/link';

export default function Page() {
	return (
		<div>
			<span id="app-page">App Page</span>
			<Link href="/pages" id="link-to-pages">
				To Pages
			</Link>
		</div>
	);
}
