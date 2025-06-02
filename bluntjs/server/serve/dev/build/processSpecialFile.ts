import type { RouteNode } from '../router/trie-based';

export async function processSpecialFile(
	fileName: string,
	triePath: string[],
	routes: Record<string, RouteNode>,
) {
	const route = triePath.join('.');
	// const trieExists = eval(`routes.${route} `);
	const exists = route in routes;
	console.log({ exists, fileName, routes, triePath });

	// TODO: BUILD AHEAD OF TIME
	// TODO: Detect ssr, rendering mode, and tell that in the fetch
	// TODO: Auto-add "use client" directive.
	// Every file has it's own distinct "index.html" file
}
