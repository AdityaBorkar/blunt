import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

import { TrieRouter } from '@/server/serve/router/trie-router';
import type { FileType, RequestMethod, RouteConfig } from '@/types';

function parseFileName(fileName: string): {
	isValid: boolean;
	method: RequestMethod;
	type: 'page' | 'route' | null;
} {
	const parts = fileName.split('.');
	const ext = parts.pop();

	// Must be TypeScript files
	if (!['ts', 'tsx'].includes(ext || '')) {
		return { isValid: false, method: 'GET', type: null };
	}

	const name = parts.join('.');

	// page.tsx
	if (name === 'page') {
		return { isValid: true, method: 'GET', type: 'page' };
	}

	// route.tsx
	if (name === 'route') {
		return { isValid: true, method: 'GET', type: 'route' };
	}

	// route.METHOD_TYPE.tsx or route.METHOD_TYPE.ts
	if (name.startsWith('route.')) {
		const methodPart = name.slice(6); // Remove 'route.'
		const upperMethod = methodPart.toUpperCase() as RequestMethod;

		if (
			['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'].includes(
				upperMethod,
			)
		) {
			return { isValid: true, method: upperMethod, type: 'route' };
		}
	}

	return { isValid: false, method: 'GET', type: null };
}

async function loadRouteConfig(
	filePath: string,
): Promise<RouteConfig | undefined> {
	try {
		const module = await import(filePath);
		return module.config as RouteConfig;
	} catch {
		return undefined;
	}
}

export async function scanAppDir(
	relativePath: string,
	prefixUrl: string = '/',
): Promise<TrieRouter> {
	const router = new TrieRouter();

	await scanDirectoryRecursive(router, relativePath, prefixUrl);

	return router;
}

async function scanDirectoryRecursive(
	router: TrieRouter,
	relativePath: string,
	httpPath: string,
) {
	const entries = await readdir(relativePath);

	for (const name of entries) {
		const fullPath = join(relativePath, name);
		const stats = await stat(fullPath);

		if (stats.isDirectory()) {
			// Handle route groups (folders)
			if (name.startsWith('(') && name.endsWith(')')) {
				// Route groups don't affect URL structure
				await scanDirectoryRecursive(router, fullPath, httpPath);
			} else {
				// Regular directory - becomes part of URL path
				const newHttpPath =
					httpPath === '/' ? `/${name}` : `${httpPath}/${name}`;
				await scanDirectoryRecursive(router, fullPath, newHttpPath);
			}
		} else if (stats.isFile()) {
			const parsed = parseFileName(name);

			if (!parsed.isValid) continue;

			const file: FileType = {
				dirPath: relativePath,
				filePath: fullPath,
				httpPath,
				method: parsed.method,
				name,
				type: parsed.type === 'page' ? 'page' : 'route',
			};

			// Load route config if available
			const config = await loadRouteConfig(fullPath);

			// Insert into trie
			router.insert(httpPath, parsed.method, file, config);
		}
	}
}
