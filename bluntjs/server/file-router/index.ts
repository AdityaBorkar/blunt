import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { type } from 'arktype';
import type { Server } from 'bun';

import { buildPage } from '../serve/dev-DEPRECATED/build';
import {
	PAGE_FILES,
	PRECEDENCE,
	ROUTE_FILES,
} from '../serve/dev-DEPRECATED/constants';
import { typeofFile } from '../utils/typeofFile';

const PropsSchema = type({
	'caseInsensitive?': 'boolean',
	'dir?': 'string',
	'publicDir?': 'string',
	'spa?': 'boolean',
	'ssr?': 'boolean',
});

export async function FileRouter(props?: typeof PropsSchema.infer) {
	const {
		// spa = false,
		// ssr = false,
		dir = 'src/app',
		// publicDir = 'public',
		// caseInsensitive = true,
	} = PropsSchema(props);
	console.log('Root Directory:', dir);

	const files: FileType[] = [];
	const routes: Record<string, RouteRecord> = {}; // TODO: Store Regex as key

	await scanDirectory(dir); // TODO: HMR
	async function scanDirectory(dirPath: string, httpPath = '/') {
		try {
			const entries = await readdir(dirPath);
			for (const relativePath of entries) {
				const filePath = join(dirPath, relativePath);
				const stats = await stat(filePath);
				if (stats.isDirectory()) {
					// console.log({ path, type: 'Directory' });
					// // Handle route groups - ignore (folder) syntax
					// if (path.startsWith('(') && path.endsWith(')')) {
					// 	// Route groups don't affect URL structure
					// 	await scanDirectory(fullPath, routePath);
					// } else {
					// 	// Regular directory - add to route path
					// 	const newRoutePath =
					// 		routePath === '' ? path : `${routePath}/${path}`;
					// 	await scanDirectory(fullPath, newRoutePath);
					// }
				} else if (stats.isFile()) {
					const type = typeofFile(relativePath);
					if (type === 'unknown') continue;
					const method = 'GET'; // only 'route' and 'middleware' can have other methods
					files.push({
						dirPath,
						filePath,
						httpPath,
						method,
						relativePath,
						type,
					});
				}
			}
		} catch (error) {
			console.warn(`Could not scan directory ${dirPath}:`, error);
		}
	}

	async function fetch(this: Server, request: Request) {
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

		const url = new URL(request.url);
		const pathname = url.pathname;
		const method = request.method;

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
			console.log({ notFound: pathname });
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

	return { fetch, routes };
}
