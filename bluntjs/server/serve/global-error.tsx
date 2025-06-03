import type { ErrorLike } from 'bun';

export async function handleError(error: ErrorLike) {
	// TODO: Handle Request Timeouts
	console.error('Server error:', error);
	return new Response(`BLUNTJS Internal Server Error: ${error.message}`, {
		headers: { 'Content-Type': 'text/html' },
		status: 500,
	});
}
