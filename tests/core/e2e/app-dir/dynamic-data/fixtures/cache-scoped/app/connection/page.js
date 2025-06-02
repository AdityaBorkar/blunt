import { unstable_cache as cache } from 'next/cache';
import { connection } from 'next/server';

const cachedConnection = cache(async () => connection());

export default async function Page(_props) {
	await cachedConnection();
	return (
		<div>
			<section>
				This example uses `connection()` inside `unstable_cache` which should
				cause the build to fail
			</section>
		</div>
	);
}
