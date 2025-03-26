import type { ErrorLike } from 'bun';

export async function handleError(error: ErrorLike) {
	// TODO: Handle Request Timeouts
	console.error('Server error:', error);
	return new Response(`Internal Server Error: ${error.message}`, {
		status: 500,
		headers: { 'Content-Type': 'text/html' },
	});
}
