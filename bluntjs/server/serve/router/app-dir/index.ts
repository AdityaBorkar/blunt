import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

import {
	specialFiles,
	type TrieRouter,
} from '@/server/serve/router/trie-router';
import type { RequestMethod, RouteConfig } from '@/types';

function parseComponents(fileName: string) {
	const parts = fileName.split('.');
	const ext = parts.pop();

	if (!['ts', 'tsx'].includes(ext || '')) return [];

	const name = parts.join('.');

	// page.ts(x)
	if (name === 'page') {
		// TODO: Read page config
		return [{ method: 'GET', type: 'page' }];
	}

	// route.ts(x)
	if (name === 'route') {
		// TODO: Read page config
		// TODO: Detect more methods
		return [{ method: 'GET', type: 'route' }];
	}

	// route.METHOD_TYPE.ts(x)
	if (name.startsWith('route.')) {
		const method = name.slice(6).toUpperCase() as RequestMethod;
		if (
			['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'].includes(
				method,
			)
		) {
			// TODO: Read page config
			return [{ method, type: 'route' }];
		}
	}

	if (specialFiles.includes(name)) {
		return [{ method: undefined, type: name }];
	}

	return [];
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
	router: TrieRouter,
	relativePath: string,
	httpPath: string = '/',
) {
	const entries = await readdir(relativePath);

	for (const name of entries) {
		const filePath = join(relativePath, name);
		const stats = await stat(filePath);

		if (stats.isDirectory()) {
			// Handle route groups (folders)
			if (name.startsWith('(') && name.endsWith(')')) {
				// Route groups don't affect URL structure
				await scanAppDir(router, filePath, httpPath);
			} else {
				// Regular directory - becomes part of URL path
				const newHttpPath =
					httpPath === '/' ? `/${name}` : `${httpPath}/${name}`;
				await scanAppDir(router, filePath, newHttpPath);
			}
		} else if (stats.isFile()) {
			const components = parseComponents(name);
			for (const component of components) {
				const { method, type } = component;
				// console.log({ filePath, httpPath, method, type });
				router.insert(method, httpPath, { filePath, type });
			}
		}
	}
}
