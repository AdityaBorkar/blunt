import Link from 'next/link';

export default function Page() {
	return (
		<div>
			<span id="pages-page">Pages Page</span>
			<Link href="/app" id="link-to-app">
				To App
			</Link>
		</div>
	);
}
