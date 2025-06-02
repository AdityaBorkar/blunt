import Link from 'next/link';

export default function Page() {
	return (
		<div>
			<p>hello world</p>
			<div>
				<Link href="/navigate-unauthorized" id="navigate-unauthorized">
					navigate to page calling unauthorized()
				</Link>
			</div>
			<div>
				<Link
					href="/metadata-layout-unauthorized"
					id="metadata-layout-unauthorized"
				>
					navigate to layout with metadata API calling unauthorized()
				</Link>
			</div>
		</div>
	);
}
