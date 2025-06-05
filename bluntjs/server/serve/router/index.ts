import type { Server, ServerWebSocket } from 'bun';

import { handleError } from '@/server/serve/handler/handleError';
import { handleInternalRoute } from '@/server/serve/handler/handleInternalRoute';
import { scanAppDir } from '@/server/serve/router/app-dir';
import { scanStaticDir } from '@/server/serve/router/static-dir';
import { TrieRouter } from '@/server/serve/router/trie-router';
import type { ProjectConfig, RequestMethod } from '@/types';

// Ideas for Performance Improvement - Allow scanning of publicDir and appDir in parallel.

export async function buildRouter(projectConfig: ProjectConfig) {
	const router = new TrieRouter();

	// Add Public Directory
	const publicDir = projectConfig.server.router.public;
	if (publicDir) {
		await scanStaticDir(router, publicDir, '');
	}

	// Add Rewrites
	for (const rewrite of projectConfig.server.router.rewrites || []) {
		const { from, to } = rewrite;
		router.insert('GET', from, { to });
	}

	// Add Redirects
	for (const redirect of projectConfig.server.router.redirects || []) {
		const { from, to, code } = redirect;
		router.insert('GET', from, { code, to });
	}

	// Add Router Config
	const routes = projectConfig.server.router.routes;
	for (const prefixUrl in routes) {
		const target = routes[prefixUrl];
		if (!target) continue;

		if ('dir' in target) {
			await scanAppDir(router, target.dir, prefixUrl);
		} else if ('page' in target) {
			// ? Note - Supports only default and barrel exports
			const component =
				typeof target.page === 'string'
					? (await import(target.page)).default
					: target.page;
			router.insert('GET', prefixUrl, { component });
		} else {
			for (const key in target) {
				const func = target[key as keyof typeof target];
				router.insert(key as RequestMethod, prefixUrl, { func });
			}
		}
	}

	// console.log(JSON.stringify(router.toJSON(), null, 2));

	// TODO: Build Types

	// TODO: Build Routes

	async function handleFetch(this: Server, request: Request) {
		const url = new URL(request.url);
		const pathname = url.pathname;
		const method = request.method as RequestMethod;
		console.log(`[${method}]`, pathname);

		const isInternal = pathname.startsWith('/.blunt');
		if (isInternal) handleInternalRoute(pathname);

		// TODO: Support editing files in the Browser's Debugger Tab & Source Maps

		const matched_routes = router.find(method, pathname);
		console.log({ matched_routes });
		console.log({ nest: matched_routes.nest });
		// TODO: loading/etc. is not yet working.
		// const { lastFilePath, lastFileType, files, config };
		// const { type, files, config } = getValidFiles(matched_files);
		// console.log({ config, files, type });

		// TODO: CREATE BUILD
		console.log(Bun.color('gray', 'ansi-256'), '(build in 30ms)');

		// Setup Config:
		// const controller = new AbortController();
		// setTimeout(() => controller.abort(), config.timeout);

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

		// // Handle static files
		// if (matched_routes.target?.file.type === 'file') {
		// 	const file = Bun.file(matched_routes.target.file.filePath);
		// 	const exists = await file.exists();

		// 	if (exists) {
		// 		return new Response(file, {
		// 			headers: {
		// 				'Cache-Control': 'public, max-age=31536000',
		// 				'Content-Type': file.type || 'application/octet-stream', // 1 year cache for static assets
		// 			},
		// 		});
		// 	}
		// }

		return new Response('Not Found', { status: 404 });
	}

	const handleWebSocket = {
		message: (
			_: ServerWebSocket<unknown>,
			message: string | Buffer<ArrayBufferLike>,
		) => {
			console.log('websocket message', message);
		},
	};

	return {
		error: handleError,
		fetch: handleFetch,
		routes: {} as const, // TODO: Output TrieRouter
		websocket: handleWebSocket,
	};
}
