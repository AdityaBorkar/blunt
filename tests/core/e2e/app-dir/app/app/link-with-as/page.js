import Link from 'next/link';

export default function Page() {
	return (
		<>
			<Link
				as="/dashboard/deployments/info/123"
				href="/dashboard/deployments/info/[id]"
				id="link-to-info-123"
			>
				To info 123
			</Link>
		</>
	);
}
