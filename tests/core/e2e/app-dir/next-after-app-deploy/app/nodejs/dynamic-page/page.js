import { after, connection } from 'next/server';

import { pathPrefix } from '../../path-prefix';
import { revalidateTimestampPage } from '../../timestamp/revalidate';

export default async function Page() {
	await connection();
	after(async () => {
		await revalidateTimestampPage(`${pathPrefix}/dynamic-page`);
	});

	return <div>Page with after()</div>;
}
