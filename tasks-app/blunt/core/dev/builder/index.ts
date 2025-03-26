import type { FileMetadata, Files, Routes } from '#/blunt/types';

import { readdir } from 'node:fs/promises';

import IndexHtml from '../../constants/index.html';
import { VALID_ROUTING_FILES } from './constants';

// Initialize HMR handlers
// if (import.meta.hot) {
// 	import.meta.hot.accept();
// Accept updates to the module itself
// import.meta.hot.dispose(() => {
// 	console.log('📦 Router module disposed');
// });
// // Listen for HMR updates
// import.meta.hot.on('bun:hmr', async ({ updatedModules }) => {
// 	if (!routerState.routesDir || updatedModules.length === 0) return;
// 	try {
// 		console.log(
// 			`🔄 HMR update detected for ${updatedModules.length} module(s)`,
// 		);
// 		// Handle each updated module
// 		for (const modulePath of updatedModules) {
// 			if (!modulePath.endsWith('.ts') && !modulePath.endsWith('.tsx'))
// 				continue;
// 			if (!modulePath.includes(routerState.routesDir)) continue;
// 			try {
// 				await updateRoute(
// 					modulePath,
// 					routerState.routesDir,
// 					routerState.routes,
// 					routerState.dynamicRoutes,
// 				);
// 			} catch (e) {
// 				console.error(
// 					`❌ Failed to update route ${modulePath}: ${e instanceof Error ? e.message : String(e)}`,
// 				);
// 			}
// 		}
// 		// Reload server if it exists
// 		if (routerState.server) {
// 			routerState.server.reload({
// 				fetch: createRequestHandler(
// 					routerState.routes,
// 					routerState.dynamicRoutes,
// 				),
// 			});
// 			console.log('🚀 Server routes reloaded successfully');
// 		}
// 	} catch (e) {
// 		console.error(
// 			`❌ HMR update failed: ${e instanceof Error ? e.message : String(e)}`,
// 		);
// 	}
// });
// }

/**
 * Creates a file system router similar to Next.js with typesafe parameters
 */
// ! WORK ON ROUTER AND TS SUPPORT. BUILD AHEAD OF TIME.
export async function Router({ dir }: { dir: string }) {
	const files: Files = {
		match(path: string) {
			const file = files[path];
			if (!file) return null;
			return file;
		},
	};
	const routes: Routes = {
		match(path: string) {
			if (!(path in routes)) return [] as FileMetadata[];
			const files = routes[path];
			if (!files) return [] as FileMetadata[];
			return files;
		},
	};

	// TODO: Generate Files and Types based on the files being read.

	const source_files = await readdir(dir, { recursive: true });
	for (const file of source_files) {
		let path = '';
		let type = '';
		let route = '';
		const isValid = VALID_ROUTING_FILES.some((name) => {
			const isValid = file.endsWith(name);
			if (isValid) {
				path = file;
				type = name.split('.')[0];
				route = `/${file.replace(name, '')}`;
			}
			return isValid;
		});
		if (!isValid) continue;

		// TODO: Catch [], [...], [[...]], (), _
		// TODO: route.ts and page.tsx can not be in the same folder

		// console.log({ path, type, route });

		if (route in routes) {
			routes[route].push({ path, type });
		} else {
			routes[route] = [{ path, type }];
		}

		files[path] = { path, type };
	}

	console.log({ files, routes });

	return { files, routes };
}
