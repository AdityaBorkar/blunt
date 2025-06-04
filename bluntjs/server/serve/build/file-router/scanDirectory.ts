import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

import { typeofFile } from '@/server/utils/typeofFile';
import type { RouteConfig } from '@/types';

type MethodType =
	| 'GET'
	| 'POST'
	| 'PUT'
	| 'DELETE'
	| 'PATCH'
	| 'OPTIONS'
	| 'HEAD';

export async function scanDirectory(relativePath: string, httpPath: string) {
	// TODO: Switch to TrieRouter
	const files: FileType[] = [];

	// TODO: Build URLs
	const URL_STORE: Record<
		string,
		Record<
			MethodType,
			{
				targetFile: FileType;
				config: RouteConfig;
				files: FileType[];
			}
		>
	> = {};

	// TODO: Export URL Strings

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
			// TODO: FIGURE OUT FILE HANDLING AND MATCHING and then go for lunch
			files.push({
				dirPath: relativePath,
				filePath: fullPath,
				httpPath,
				method,
				name,
				type,
			});
		}
	}

	return files;
}
