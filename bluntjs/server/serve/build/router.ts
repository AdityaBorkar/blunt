import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import type { Server, ServerWebSocket } from 'bun';

import { buildPage } from '@/server/serve/build/page';
import { handleError } from '@/server/serve/global-error';
import { PAGE_FILES, PRECEDENCE, ROUTE_FILES } from '@/server/utils/constants';
import { typeofFile } from '@/server/utils/typeofFile';
import type { ProjectConfig } from '@/types';

export async function buildRouter(config: ProjectConfig) {
	const files: FileType[] = [];

	for (const prefixUrl in config.server.router) {
		const dir = config.server.router[prefixUrl];
		if (typeof dir !== 'string') {
			throw new Error('Root Directory is not set');
		}
		const _files = await scanDirectory(dir, prefixUrl);
		files.push(..._files);
	}

	// TODO: HMR SUPPORT
	async function handleFetch(this: Server, request: Request) {
		const url = new URL(request.url);
		const pathname = url.pathname;
		const method = request.method;
		console.log(`[${method}]`, pathname);

		const controller = new AbortController();
		setTimeout(() => controller.abort(), 10000); // TODO

		const isCrawler = false; // TODO

		// const ip = server.requestIP(req);
		// const isCrawler =
		// 	GLOBAL_CONFIG.botDetection === false
		// 		? undefined
		// 		: typeof GLOBAL_CONFIG.botDetection === 'function'
		// 			? GLOBAL_CONFIG.botDetection()
		// 			: botDetection();
		// const request = { ip, isCrawler, path, req };
		// // TODO: Instrumentation

		// TODO: Support editing files in the Browser's Debugger Tab & Source Maps

		const isInternal = pathname.startsWith('/.blunt');
		if (isInternal) {
			const filePath = join(process.cwd(), pathname);
			const file = Bun.file(filePath);
			const type = file.type;
			return new Response(file, { headers: { 'Content-Type': type } });
		}

		// TODO: Use "Public" directory and override pages.

		const sorted_files = files
			.filter((file) => file.httpPath === pathname && file.method === method)
			.toSorted((a, b) => {
				const diff = a.httpPath.length - b.httpPath.length;
				if (diff !== 0) return diff;
				return PRECEDENCE.indexOf(a.type) - PRECEDENCE.indexOf(b.type);
			});
		// TODO: Find Duplicate Entry Points

		const lastFile = sorted_files[sorted_files.length - 1];
		if (!lastFile) {
			console.log({ files, notFound: pathname });
			return new Response('Not Found', { status: 404 });
		}
		const lastFileType = lastFile.type;
		const filtered_files =
			lastFileType === 'file'
				? [lastFile]
				: sorted_files.filter((file) => {
						if (lastFileType === 'page') return PAGE_FILES.includes(file.type);
						if (lastFileType === 'route')
							return ROUTE_FILES.includes(file.type);
						return false;
					});

		if (lastFileType === 'page') {
			const stream = await buildPage({
				config,
				controller,
				files: filtered_files,
				url: pathname,
			});
			const headers = { 'Content-Type': 'text/html' };

			if (isCrawler) await stream.allReady;
			return new Response(stream, { headers });
		}

		// if (routeType === 'route') {
		// 	console.log({ routeType });
		// 	return new Response('Route', { status: 200 });
		// }

		// if (routeType === 'file') {
		// 	const stream = await buildFile(lastFile, controller);
		// 	const headers = { 'Content-Type': 'text/html' };
		// 	if (isCrawler) await stream.allReady;
		// 	return new Response(stream, { headers });
		// }

		// console.log({ notFound: $files });
		// return new Response('Not Found', { status: 404 });
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

async function scanDirectory(relativePath: string, httpPath = '/') {
	const files: FileType[] = [];
	try {
		const entries = await readdir(relativePath);
		for (const name of entries) {
			const fullPath = join(relativePath, name);
			const stats = await stat(fullPath);
			if (stats.isDirectory()) {
				if (name.startsWith('(') && name.endsWith(')')) {
					const subFiles = await scanDirectory(fullPath, httpPath);
					files.push(...subFiles);
				}
				// []
				// [...]
				// [[...]]
				// ~slug~ / _slug = Out of routing
				// @slug named slots
				else {
					const subFiles = await scanDirectory(
						fullPath,
						`${httpPath === '/' ? '' : httpPath}/${name}`,
					);
					files.push(...subFiles);
				}
			} else if (stats.isFile()) {
				const type = typeofFile(name);
				if (type === 'unknown') continue;
				const method = 'GET'; // only 'route' and 'middleware' can have other methods
				files.push({
					dirPath: relativePath,
					filePath: fullPath,
					httpPath,
					method,
					relativePath: name,
					type,
				});
			}
		}
	} catch (error) {
		console.warn(`Could not scan directory ${relativePath}:`, error);
	}
	return files;
}
