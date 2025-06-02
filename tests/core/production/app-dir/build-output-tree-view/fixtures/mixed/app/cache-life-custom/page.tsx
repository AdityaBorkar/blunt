'use cache';

import { unstable_cacheLife } from 'next/cache';

export default async function Page() {
	unstable_cacheLife({ expire: 8940, revalidate: 412 });

	return <p>hello world</p>;
}
