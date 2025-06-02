import Link from 'next/link';

export default function Page() {
	return (
		<>
			<Link
				href="/prefetch-false/result"
				id="to-prefetch-false-result"
				prefetch={false}
			>
				To prefetch false
			</Link>
		</>
	);
}
