import { after } from 'next/server';

import { pathPrefix } from '../../path-prefix';
import { revalidateTimestampPage } from '../../timestamp/revalidate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
	const data = { message: 'Hello, world!' };
	after(async () => {
		await revalidateTimestampPage(`${pathPrefix}/route`);
	});

	return Response.json({ data });
}
