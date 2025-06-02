import Link from 'next/link';

export default function Page() {
	return (
		<div>
			<div
				style={{
					color: 'red',
					height: '100vh',
				}}
			></div>
			<Link href="/parallel-scroll/nav">nav</Link>
		</div>
	);
}
