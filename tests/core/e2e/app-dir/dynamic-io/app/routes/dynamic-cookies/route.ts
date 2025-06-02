import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

import { getSentinelValue } from '../../getSentinelValue';

export async function GET(_request: NextRequest) {
	const sentinel = (await cookies()).get('x-sentinel');
	return new Response(
		JSON.stringify({
			type: 'cookies',
			value: getSentinelValue(),
			'x-sentinel': sentinel,
		}),
	);
}
