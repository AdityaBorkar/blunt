import type { NextRequest } from 'next/server';

import { getSentinelValue } from '../../getSentinelValue';

export async function GET(_request: NextRequest) {
	await new Promise((r) => setTimeout(r, 10));
	const response = JSON.stringify({
		message: 'task',
		value: getSentinelValue(),
	});
	return new Response(response);
}
