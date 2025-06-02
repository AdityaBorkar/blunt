import Link from 'next/link';

export default function Page() {
	return (
		<>
			<div>
				<Link href="/force-dynamic/test-page">
					/force-dynamic/test-page (prefetch: auto)
				</Link>
			</div>
			<div>
				<Link href="/force-dynamic/test-page" prefetch>
					/force-dynamic/test-page (prefetch: true)
				</Link>
			</div>
		</>
	);
}
