import type { NextRequest } from 'next/server';

import { getSentinelValue } from '../../getSentinelValue';

export async function GET(_request: NextRequest) {
	const response = JSON.stringify({
		message: 'stream response',
		value: getSentinelValue(),
	});
	const part1 = response.slice(0, Math.floor(response.length / 2));
	const part2 = response.slice(Math.floor(response.length / 2));

	const encoder = new TextEncoder();
	const chunks = [encoder.encode(part1), encoder.encode(part2)];

	let sent = 0;
	const stream = new ReadableStream({
		pull(controller) {
			controller.enqueue(chunks[sent++]);
			if (sent === chunks.length) {
				controller.close();
			}
		},
	});
	return new Response(stream);
}
