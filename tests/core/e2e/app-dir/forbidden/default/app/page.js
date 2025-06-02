import Link from 'next/link';

export default function Page() {
	return (
		<div>
			<p>hello world</p>
			<div>
				<Link href="/navigate-forbidden" id="navigate-forbidden">
					navigate to page calling forbidden()
				</Link>
			</div>
			<div>
				<Link href="/metadata-layout-forbidden" id="metadata-layout-forbidden">
					navigate to layout with metadata API calling forbidden()
				</Link>
			</div>
		</div>
	);
}
