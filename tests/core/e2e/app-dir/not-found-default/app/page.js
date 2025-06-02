import Link from 'next/link';

export default function Page() {
	return (
		<div>
			<p>hello world</p>
			<div>
				<Link href="/navigate-not-found" id="navigate-not-found">
					navigate to page calling notfound()
				</Link>
			</div>
			<div>
				<Link href="/metadata-layout-not-found" id="metadata-layout-not-found">
					navigate to layout with metadata API calling notfound()
				</Link>
			</div>
		</div>
	);
}
