import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

import type { TrieRouter } from '@/server/serve/router/trie-router';

export async function scanStaticDir(
	router: TrieRouter,
	publicDir: string,
	urlPrefix: string,
) {
	const dirPath = publicDir;
	const entries = await readdir(dirPath);
	for (const name of entries) {
		const filePath = join(dirPath, name);
		const urlPath = urlPrefix ? `${urlPrefix}/${name}` : `/${name}`;

		const stats = await stat(filePath);
		if (stats.isDirectory()) {
			await scanStaticDir(router, filePath, urlPath);
		} else if (stats.isFile()) {
			const staticFile = { filePath, type: 'file' as const };
			router.insert('GET', urlPath, staticFile);
		}
	}
	return router;
}
