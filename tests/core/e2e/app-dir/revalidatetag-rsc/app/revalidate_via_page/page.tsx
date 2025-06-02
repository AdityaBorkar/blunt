'use server';

import { unstable_expireTag } from 'next/cache';
import Link from 'next/link';

const RevalidateViaPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ tag: string }>;
}) => {
	const { tag } = await searchParams;
	unstable_expireTag(tag);

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<pre>Tag [{tag}] has been revalidated</pre>
			<Link href="/" id="home">
				To Home
			</Link>
		</div>
	);
};

export default RevalidateViaPage;
