import type { Server, SocketAddress } from 'bun';
import { file } from 'bun';
import { renderToReadableStream } from 'react-dom/server';

import type { BluntPageConfig, FileMetadata } from '../../../../types/types';
import { jsx } from '../constants/jsx';

export async function CompilePage({
	request,
	server,
	files,
}: {
	request: {
		req: Request;
		ip: SocketAddress | null;
		path: string;
		isCrawler: boolean | undefined;
	};
	server: Server;
	files: FileMetadata[];
}) {
	const { isCrawler, req, path } = request;
	const { GLOBAL_CONFIG, router, outputDir } = globalThis.BLUNTJS;

	const PageFile = files.find((file) => file.type === 'page');
	if (!PageFile)
		return new Response('[BLUNTJS] Internal Server Error', { status: 500 });
	const Page = await import(`${router.dir}/${PageFile.path}`);

	// Performance and Logging
	// TODO: When building, save this details to the file.
	console.log('FETCH [Dynamic] [SSR] route', path);
	// Static, Dynamic-Edge, Dynamic-Server
	// Static generated at (build time/ on demand).
	// Cache-Device, Cache-Edge, Cache-Server
	// PPR is enabled by default.
	// If using Edge, you need to mention the cf / vercel / aws / etc environment to make sure you use the compatible functions.
	// If using Server, you need to mention the node / deno / bun to make sure you use the compatible functions.

	// Page Config
	const PAGE_CONFIG = (Page.config || {}) as BluntPageConfig; // TODO: Validate `PageConfig`
	const SSR = isCrawler ? true : (PAGE_CONFIG.ssr ?? GLOBAL_CONFIG.ssr);
	const STREAMING = isCrawler
		? false
		: (PAGE_CONFIG.streaming ?? GLOBAL_CONFIG.streaming);
	const TIMEOUT = PAGE_CONFIG.timeout ?? GLOBAL_CONFIG.timeout ?? 60;

	// Set Server Config for the Route:
	server.timeout(req, TIMEOUT);

	// TODO: Execute files sequentially and share outputs. AstroJS + NextJS
	// HTML Template:
	let output_html = await file(`${outputDir}/index.html`).text();

	// Framework Settings:
	output_html = output_html.replace(
		'<!--framework-settings-->',
		'<script>window.SSR = true;</script>',
	);
	// TODO: replace `ssr-head` `ssr-assets`

	// SSR:
	if (!SSR) {
		console.log('IMPLEMENT: SSR is disabled');
	}

	// Streaming:
	const stream = await renderToReadableStream(jsx, {
		// TODO: Use all options
		// signal: controller.signal,
		// bootstrapModules
		// bootstrapScripts
		// bootstrapScriptContent
		// nonce
		onError(error, errorInfo) {
			console.error('Error in React rendering:', error, errorInfo);
		},
	});

	// TODO: Implement how to merge streams and output data.

	if (!STREAMING) {
		await stream.allReady;
		const reader = stream.getReader();
		const { value } = await reader.read();
		let html_react = '';
		if (value) html_react += new TextDecoder().decode(value);
		output_html = output_html.replace('<!--ssr-outlet-->', html_react);
	}

	// Return Response
	return new Response(output_html, {
		headers: { 'Content-Type': 'text/html' },
		status: 200,
	});
}
