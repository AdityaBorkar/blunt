import type { PageConfig } from 'next';
import Link from 'next/link';

export const config: PageConfig = {
	unstable_runtimeJS: false,
};

export default function Page() {
	return (
		<>
			<p>hello world</p>
			<Link href="/another">to /another</Link>
		</>
	);
}
