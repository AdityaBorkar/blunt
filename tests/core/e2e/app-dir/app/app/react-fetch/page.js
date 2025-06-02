import Link from 'next/link';
export default function Page() {
	return (
		<>
			<p>
				<Link href="/react-fetch/server-component" id="to-server-component">
					To Server Component
				</Link>
			</p>
			<p>
				<Link href="/react-fetch/client-component" id="to-client-component">
					To Client Component
				</Link>
			</p>
		</>
	);
}
