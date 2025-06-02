import Link from 'next/link';

export default function Page() {
	return (
		<div>
			<div id="home-page">Home page</div>
			<br />
			<Link href="/nested" id="link-to-nested">
				To Nested
			</Link>
		</div>
	);
}
