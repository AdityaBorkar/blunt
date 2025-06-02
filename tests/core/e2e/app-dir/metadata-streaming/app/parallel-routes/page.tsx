import Link from 'next/link';

export default function Page() {
	return (
		<div>
			Hello from Nested <br />
			<Link href="/parallel-routes/test-page">
				To /parallel-routes/test-page
			</Link>
			<br />
			<Link href="/parallel-routes/no-bar">To /parallel-routes/no-bar</Link>
		</div>
	);
}

export const metadata = {
	description: 'parallel description',
	title: 'parallel title',
};
