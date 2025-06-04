import type { ErrorLike } from 'bun';
import { renderToString } from 'react-dom/server';

export async function handleError(error: ErrorLike) {
	console.error('Server Error:', error);

	// TODO: use `error.tsx`
	const message = renderToString(
		<div className="flex h-screen w-screen flex-col items-center justify-center bg-black text-white">
			<h1>BLUNTJS Internal Server Error</h1>
			<p>{error.message}</p>
		</div>,
	);

	return new Response(message, {
		headers: { 'Content-Type': 'text/html' },
		status: 500,
	});
}
