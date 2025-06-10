import {
	type RenderToReadableStreamOptions,
	renderToReadableStream,
	renderToString,
} from 'react-dom/server';
import { type PrerenderOptions, prerenderToNodeStream } from 'react-dom/static';

import { botDetectionFn } from '@/server/defaults/botDetection';
import type { PageConfig } from '@/types';

type ExecutorProps = {
	jsx: React.ReactNode;
	config: PageConfig;
	scripts: string[];
	bootstrapScriptContent: string;
	identifierPrefix: string;
};

export async function PageExecutor({
	jsx,
	config,
	scripts,
	bootstrapScriptContent,
	identifierPrefix,
}: ExecutorProps) {
	const { prerender, streaming, edge, ssr, timeout, botDetection } = config;

	const controller = new AbortController();
	setTimeout(() => controller.abort(), timeout);

	// TODO: GET Instrumentation

	const status = 200;
	const headers = {
		'Cache-Control': 'no-store',
		'Content-Type': 'text/html',
		'X-Powered-By': 'BluntJS',
	};
	// const cookies = {}

	const _botDetectionFn =
		botDetection === false
			? () => false
			: typeof botDetection === 'function'
				? botDetection
				: botDetectionFn;
	const isBot = _botDetectionFn();

	if (!prerender && !ssr) {
		const html = `
		<!DOCTYPE html>
		<html>
			<head>
				<title>BluntJS</title>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
			</meta>
			<body>
				<div id="root"></div>
				${scripts.map((script) => `<script src="${script}"></script>`).join('')}
				<script>
					${bootstrapScriptContent}
				</script>
			</body>
		</html>
		`;
		return new Response(html, { headers, status });
	}

	const options = {
		bootstrapModules: scripts,
		bootstrapScriptContent, // ! WORKAROUND - DO NOT USE IN PRODUCTION.
		identifierPrefix,
		onError: (error: unknown) => {
			console.log('SERVER SIDE ERROR');
			console.error(error);
		},
		signal: controller.signal,
	} satisfies RenderToReadableStreamOptions | PrerenderOptions; // Improve Types

	if (prerender) {
		const { prelude } = await (edge
			? prerenderToNodeStream(jsx, options) // prerender as prerenderReact
			: prerenderToNodeStream(jsx, options));
		if (!ssr) return prelude;
	}

	// TODO: Use prelude if available

	const stream = streaming
		? edge
			? await renderToReadableStream(jsx, options)
			: await renderToReadableStream(jsx, options) // ! `renderToPipeableStream` not working in Bun.
		: renderToString(jsx);

	if (typeof stream === 'object' && 'allReady' in stream && isBot) {
		await stream.allReady;
	}

	const _stream =
		typeof stream === 'string'
			? `<!DOCTYPE html> ${stream}`
			: stream.pipeThrough(
					new TransformStream({
						start(controller) {
							controller.enqueue(new TextEncoder().encode('<!DOCTYPE html>'));
						},
						transform(chunk, controller) {
							controller.enqueue(chunk);
						},
					}),
				);

	const response = new Response(_stream, { headers, status });
	return response;
}
