import type { NextRequest } from 'next/server';

import { getSentinelValue } from '../../getSentinelValue';

export async function GET(_request: NextRequest) {
	await Promise.resolve();
	const response = JSON.stringify({
		message: 'microtask',
		value: getSentinelValue(),
	});
	return new Response(response);
}
