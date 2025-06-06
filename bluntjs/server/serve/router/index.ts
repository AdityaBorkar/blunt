import type { Server, ServerWebSocket } from 'bun';

import { botDetection } from '@/server/defaults/botDetection';
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

		const path = [...pathname.split('/').filter((s) => s.length > 0)];
		console.log({ path });
		let { nest, params, target } = router.find(method, path);

		if (!target) return new Response('Not Found', { status: 404 });
		if ('to' in target) {
			const { to, code } = target;
			if (code) return new Response(to, { status: code });
			const resolution = router.find(method, path);
			nest = resolution.nest;
			params = resolution.params;
			target = resolution.target;
			if (!target) return new Response('Not Found', { status: 404 });
			if ('to' in target)
				throw new Error('Nested Redirects/Rewrites are not supported');
		}
		if ('component' in target) {
			console.log(
				Bun.color('yellow', 'ansi-256'),
				'<< WORK IN PROGRESS >>',
				Bun.color('lightgray', 'ansi-256'),
			);
			const { component } = target;
			return new Response(component, { status: 200 });
		}
		if ('func' in target) {
			console.log(
				Bun.color('yellow', 'ansi-256'),
				'<< WORK IN PROGRESS >>',
				Bun.color('lightgray', 'ansi-256'),
			);
			const { func } = target;
			return new Response(func(request), { status: 200 });
		}

		if ('file' in target) {
			console.log(
				Bun.color('yellow', 'ansi-256'),
				'<< WORK IN PROGRESS >>',
				Bun.color('lightgray', 'ansi-256'),
			);
			const { file } = target;
			return new Response(file, { status: 200 });
		}
		// TODO: CREATE BUILD

		console.log(
			Bun.color('gray', 'ansi-256'),
			'(build in 30ms)',
			Bun.color('lightgray', 'ansi-256'),
		);

		// if (urlType === 'ssr_page') {
		// }
		// if (urlType === 'static_page') {
		// }
		if (target.type === 'page') {
			const { config } = target;
			const controller = new AbortController();
			setTimeout(() => controller.abort(), config.timeout);
			// TODO: GET Instrumentation
			const isCrawler =
				projectConfig.pages.botDetection === false
					? undefined
					: typeof projectConfig.pages.botDetection === 'function'
						? projectConfig.pages.botDetection()
						: botDetection();
			// TODO: FIGURE OUT WHAT TO RUN
			// const { stream } = await executePage({
			// 	config,
			// 	controller,
			// 	files: nest,
			// 	url: pathname,
			// });
			if (isCrawler) await stream.allReady;
			const headers = { 'Content-Type': 'text/html' };
			return new Response(stream, { headers });
		}
		// if (urlType === 'file') {
		// 	const stream = await buildFile(lastFile, controller);
		// 	const headers = { 'Content-Type': 'text/html' };
		// 	if (isCrawler) await stream.allReady;
		// 	return new Response(stream, { headers });
		// }
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
