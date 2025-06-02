import type { PageConfig } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const config: PageConfig = {};

export default function Page() {
	// eslint-disable-next-line  @typescript-eslint/no-unused-vars
	const _router = useRouter();
	return (
		<>
			<p>hello world</p>
			<Link
				href="/another"
				onClick={(e) => {
					console.log(e.currentTarget);
				}}
			>
				to /another
			</Link>
			<Link
				href="/another"
				onClick={(e) => {
					/** @ts-expect-error - foo does not exist on React.MouseEvent */
					console.log(e.foo);
				}}
			>
				to /another
			</Link>
		</>
	);
}
