import type { NextRequest } from 'next/server';

import { withRequestMeta } from '../../../../helpers';

export const runtime = 'edge';

export async function GET(request: NextRequest): Promise<Response> {
	const { searchParams } = request.nextUrl;

	return new Response('hello, world', {
		headers: withRequestMeta({
			ping: searchParams.get('ping'),
		}),
	});
}
