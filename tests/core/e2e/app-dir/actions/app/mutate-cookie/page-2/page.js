import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Page() {
	return (
		<>
			<Link href="/mutate-cookie" id="back">
				back
			</Link>
			<p id="value">{(await cookies()).get('test-cookie2')?.value}</p>
		</>
	);
}
