import type { NextRequest } from 'next/server';

import { getSentinelValue } from '../../getSentinelValue';

export function GET(_request: NextRequest) {
	const response = JSON.stringify({
		message: 'string response',
		value: getSentinelValue(),
	});
	return new Response(response);
}
