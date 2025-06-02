import { join } from 'node:path';

export async function processDir(dirName: string, node: string[]) {
	const _dirPath = join(...node, dirName);

	// Skip directories that start with underscore (private folders)
	if (dirName.startsWith('_')) return;

	// // Handle parallel routes (@modal, @dashboard, etc.)
	// if (item.startsWith('@')) {
	// 	const childNode: RouteNode = {
	// 		metadata: {},
	// 		children: {},
	// 		dynamicSegments: {},
	// 		segment: item,
	// 		fullPath: `${node.fullPath}${node.fullPath === '/' ? '' : '/'}${item}`,
	// 	};

	// 	node.children[item] = childNode;
	// 	await scanDirectory(itemPath, childNode);
	// 	continue;
	// }

	// Handle route group (grouped routes that don't affect URL structure)
	// Route groups don't create a new URL segment, so we reuse the same node
	if (dirName.startsWith('(') && dirName.endsWith(')')) {
		return {
			dir: join(...node, dirName),
			triePath: [...node, dirName],
		};
	}

	// Handle catch-all routes ([...slug])
	if (dirName.startsWith('[...') && dirName.endsWith(']')) {
		// const paramName = dirName.slice(4, -1);
		// const catchAllNode: RouteNode & { paramName: string } = {
		// 	metadata: {},
		// 	children: {},
		// 	dynamicSegments: {},
		// 	segment: dirName,
		// 		fullPath: `${node.fullPath}${node.fullPath === '/' ? '' : '/'}${item}`,
		// 		paramName,
		// 	};
		// 	node.catchAll = catchAllNode;
		// 	await scanDirectory(itemPath, catchAllNode);
		return {
			dir: dirName,
			triePath: [...node, dirName],
		};
	}

	// // Handle optional catch-all routes ([[...slug]])
	// if (item.startsWith('[[...') && item.endsWith(']]')) {
	// 	const paramName = item.slice(5, -2);
	// 	const optionalCatchAllNode: RouteNode & { paramName: string } = {
	// 		metadata: {},
	// 		children: {},
	// 		dynamicSegments: {},
	// 		segment: item,
	// 		fullPath: `${node.fullPath}${node.fullPath === '/' ? '' : '/'}${item}`,
	// 		paramName,
	// 	};

	// 	node.optionalCatchAll = optionalCatchAllNode;
	// 	await scanDirectory(itemPath, optionalCatchAllNode);
	// 	continue;
	// }

	// // Handle dynamic segments ([id], [slug], etc.)
	// if (item.startsWith('[') && item.endsWith(']') && !item.includes('...')) {
	// 	const paramName = item.slice(1, -1);
	// 	const dynamicNode: RouteNode = {
	// 		metadata: {},
	// 		children: {},
	// 		dynamicSegments: {},
	// 		segment: item,
	// 		fullPath: `${node.fullPath}${node.fullPath === '/' ? '' : '/'}${item}`,
	// 	};

	// 	node.dynamicSegments[paramName] = dynamicNode;
	// 	await scanDirectory(itemPath, dynamicNode);
	// 	continue;
	// }

	// // Handle regular route segments
	// const childNode: RouteNode = {
	// 	metadata: {},
	// 	children: {},
	// 	dynamicSegments: {},
	// 	segment: item,
	// 	fullPath: `${node.fullPath}${node.fullPath === '/' ? '' : '/'}${item}`,
	// };

	// node.children[item] = childNode;
	// await scanDirectory(itemPath, childNode);

	// const item = file(join(...node, dirName));
	// eval(
	// 	`routes${triePath.length > 0 ? `["${triePath.join('"].["')}"]` : ''}["${fileName}"] = {}`,
	// );
	// scanDirectory(join(dir, fileName), [...triePath, fileName]);
}
