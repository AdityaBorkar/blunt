import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

import type { TrieRouter } from '@/server/serve/router/trie-router';
import type { RequestMethod } from '@/types';

export async function scanStaticDir(
	router: TrieRouter,
	publicDir: string,
	urlPrefix: string,
) {
	const dirPath = publicDir;
	const entries = await readdir(dirPath);
	for (const name of entries) {
		const fullPath = join(dirPath, name);
		const stats = await stat(fullPath);
		const urlPath = urlPrefix ? `${urlPrefix}/${name}` : `/${name}`;

		if (stats.isDirectory()) {
			await scanStaticDir(router, fullPath, urlPath);
		} else if (stats.isFile()) {
			const staticFile = {
				dirPath,
				filePath: fullPath,
				httpPath: urlPath,
				method: 'GET' as RequestMethod,
				name,
				type: 'file' as const,
			};
			router.insert(urlPath, 'GET', staticFile);
		}
	}
	return router;
}
