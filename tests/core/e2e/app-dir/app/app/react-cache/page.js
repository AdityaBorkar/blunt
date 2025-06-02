import Link from 'next/link';
export default function Page() {
	return (
		<>
			<p>
				<Link href="/react-cache/server-component" id="to-server-component">
					To Server Component
				</Link>
			</p>
			<p>
				<Link href="/react-cache/client-component" id="to-client-component">
					To Client Component
				</Link>
			</p>
		</>
	);
}
