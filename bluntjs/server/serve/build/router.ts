import { join } from 'node:path';
import type { Server, ServerWebSocket } from 'bun';

import { getMatchedFiles } from '@/server/serve/build/file-router/getMatchedFiles';
import { getValidFiles } from '@/server/serve/build/file-router/getValidFiles';
import { scanDirectory } from '@/server/serve/build/file-router/scanDirectory';
import { handleError } from '@/server/serve/global-error';
import type { ProjectConfig } from '@/types';

export async function buildRouter(projectConfig: ProjectConfig) {
	const ALL_FILES: FileType[] = [];

	const router = projectConfig.server.router;
	for (const prefixUrl in router) {
		const dir = router[prefixUrl];
		if (typeof dir !== 'string') {
			throw new Error('Root Directory is not set');
		}
		const files = await scanDirectory(dir, prefixUrl);
		ALL_FILES.push(...files);
	}

	// TODO: HMR SUPPORT
	async function handleFetch(this: Server, request: Request) {
		const url = new URL(request.url);
		const pathname = url.pathname;
		const method = request.method;
		console.log(`[${method}]`, pathname);

		// TODO: Support editing files in the Browser's Debugger Tab & Source Maps
		const isInternal = pathname.startsWith('/.blunt');
		if (isInternal) {
			const filePath = join(process.cwd(), pathname);
			const file = Bun.file(filePath);
			const type = file.type;
			return new Response(file, { headers: { 'Content-Type': type } });
		}

		// TODO: Use "Public" directory and override pages.

		const matched_files = getMatchedFiles(ALL_FILES, pathname);
		const { type, files, config } = getValidFiles(matched_files);
		console.log({ config, files, type });

		// TODO: GET `build` ready

		// Start Execution:

		const controller = new AbortController();
		setTimeout(() => controller.abort(), config.timeout);

		// if (type === 'route') {
		// 	// TODO: GET Instrumentation
		// 	// const isCrawler =
		// 	// 	config.routes.botDetection === false
		// 	// 		? undefined
		// 	// 		: typeof config.routes.botDetection === 'function'
		// 	// 			? config.routes.botDetection()
		// 	// 			: botDetection();
		// 	// const ip = server.requestIP(req);
		// 	// const request = { ip, isCrawler, path, req };
		// 	return new Response('Route', { status: 200 });
		// }
		// // if (urlType === 'file') {
		// // 	const stream = await buildFile(lastFile, controller);
		// // 	const headers = { 'Content-Type': 'text/html' };
		// // 	if (isCrawler) await stream.allReady;
		// // 	return new Response(stream, { headers });
		// // }
		// // if (urlType === 'ssr_page') {
		// // }
		// // if (urlType === 'static_page') {
		// // }
		// if (type === 'page') {
		// 	// TODO: GET Instrumentation
		// 	const isCrawler =
		// 		config.pages.botDetection === false
		// 			? undefined
		// 			: typeof config.pages.botDetection === 'function'
		// 				? config.pages.botDetection()
		// 				: botDetection();
		// 	const stream = await buildPage({
		// 		config,
		// 		controller,
		// 		files,
		// 		url: pathname,
		// 	});
		// 	const headers = { 'Content-Type': 'text/html' };

		// 	if (isCrawler) await stream.allReady;
		// 	return new Response(stream, { headers });
		// }

		return new Response('Not Found', { status: 404 });
	}

	// TODO: HMR SUPPORT
	const handleWebSocket = {
		message: (
			_: ServerWebSocket<unknown>, // TODO: Rename as `ws`
			message: string | Buffer<ArrayBufferLike>,
		) => {
			console.log('websocket message', message);
		},
	};

	return {
		error: handleError,
		fetch: handleFetch,
		routes: {} as const,
		websocket: handleWebSocket,
	};
}
