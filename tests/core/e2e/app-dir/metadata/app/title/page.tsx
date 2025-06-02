import type { Metadata } from 'next';
import Link from 'next/link';

export default function Page() {
	return (
		<div id="title">
			<Link href="/" id="to-index">
				to index
			</Link>
		</div>
	);
}

export const metadata: Metadata = {
	title: 'this is the page title',
};
