import type { NextRequest } from 'next/server';

import { getRequestMeta, withRequestMeta } from '../../../../helpers';

export async function GET(req: NextRequest) {
	// Put the request meta in the response directly as meta again.
	const meta = getRequestMeta(req.cookies);

	return new Response(null, {
		headers: withRequestMeta(meta),
		status: 200,
	});
}
