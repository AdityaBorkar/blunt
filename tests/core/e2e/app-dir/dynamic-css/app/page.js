import Link from 'next/link';

export default function Page() {
	return (
		<div>
			<Link href="/ssr" id="ssr">
				SSR
			</Link>
		</div>
	);
}
