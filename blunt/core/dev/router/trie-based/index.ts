import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';

export interface RouteNode {
	// Special metadata for this route node
	metadata: {
		page?: string;
		layout?: string;
		loading?: string;
		error?: string;
		notFound?: string;
		route?: string;
		middleware?: string;
		template?: string;
		forbidden?: string;
		unauthorized?: string;
	};
	// Children routes
	children: Record<string, RouteNode>;
	// Dynamic segments (e.g., [id], [...slug])
	dynamicSegments: Record<string, RouteNode>;
	// Catch-all route ([...slug])
	catchAll?: RouteNode & { paramName: string };
	// Optional catch-all route ([[...slug]])
	optionalCatchAll?: RouteNode & { paramName: string };
	// Path segment for this node
	segment: string;
	// Full path from root
	fullPath: string;
}

// Next.js special file conventions
// Custom Blunt.js additional files
const BLUNT_JS_SPECIAL_FILES = [
];

const SPECIAL_FILES = [...NEXT_JS_SPECIAL_FILES, ...BLUNT_JS_SPECIAL_FILES];

/**
 * Creates a trie-based router that is compatible with Next.js routing conventions
 */
export function trieBasedRouter(options: {
	rootDir: string;
	include?: string[];
	exclude?: string[];
}) {}

	/**
	 * Matches a URL path against the route trie
	 * @param path URL path to match (e.g., /dashboard/users/123)
	 */
	function matchRoute(path: string): {
		node: RouteNode | null;
		params: Record<string, string | string[]>;
	} {
		const segments = path.split('/').filter(Boolean);
		let currentNode = rootNode;
		const params: Record<string, string | string[]> = {};

		for (let i = 0; i < segments.length; i++) {
			const segment = segments[i];

			// Check for exact match first
			if (currentNode.children[segment]) {
				currentNode = currentNode.children[segment];
				continue;
			}

			// Check for dynamic segment match
			let foundDynamic = false;
			for (const [paramName, dynamicNode] of Object.entries(
				currentNode.dynamicSegments,
			)) {
				params[paramName] = segment;
				currentNode = dynamicNode;
				foundDynamic = true;
				break;
			}

			if (foundDynamic) continue;

			// Check for catch-all match (consumes all remaining segments)
			if (currentNode.catchAll && currentNode.catchAll.paramName) {
				params[currentNode.catchAll.paramName] = segments.slice(i);
				currentNode = currentNode.catchAll;
				break; // Exit loop as we've consumed all remaining segments
			}

			// Check for optional catch-all match
			if (
				currentNode.optionalCatchAll &&
				currentNode.optionalCatchAll.paramName
			) {
				params[currentNode.optionalCatchAll.paramName] = segments.slice(i);
				currentNode = currentNode.optionalCatchAll;
				break; // Exit loop as we've consumed all remaining segments
			}

			// No match found
			return { node: null, params };
		}

		// Handle the case where the URL exactly matches a node
		return { node: currentNode, params };
	}

	/**
	 * Locates and returns all applicable routes/layouts for a given path
	 * @param path URL path to resolve
	 */
	function resolveRouteComponents(path: string): {
		page?: string;
		layouts: string[];
		loading?: string;
		error?: string;
		notFound?: string;
		route?: string;
		middleware?: string;
		template?: string;
		forbidden?: string;
		unauthorized?: string;
		params: Record<string, string | string[]>;
	} {
		const { node, params } = matchRoute(path);

		if (!node) {
			return { layouts: [], params };
		}

		// Walk up the tree to collect layouts
		const layouts: string[] = [];
		let ancestors: RouteNode[] = [];

		// Get all ancestors by splitting the path and matching each segment
		const segments = node.fullPath.split('/').filter(Boolean);
		let currentPath = '';
		let currentNode = rootNode;

		// Add root node
		ancestors.push(rootNode);

		// Find all ancestors in the path
		for (const segment of segments) {
			currentPath += `/${segment}`;
			// Try exact match first
			if (currentNode.children[segment]) {
				currentNode = currentNode.children[segment];
				ancestors.push(currentNode);
			} else {
				// Try dynamic segments
				for (const dynamicNode of Object.values(currentNode.dynamicSegments)) {
					if (dynamicNode.segment === segment) {
						currentNode = dynamicNode;
						ancestors.push(currentNode);
						break;
					}
				}
			}
		}

		// Collect layouts and other components from ancestors (closest to farthest)
		ancestors.reverse().forEach((ancestor) => {
			if (ancestor.metadata.layout) {
				layouts.push(ancestor.metadata.layout);
			}
		});

		return {
			page: node.metadata.page,
			layouts,
			loading: findClosestMetadata(ancestors, 'loading'),
			error: findClosestMetadata(ancestors, 'error'),
			notFound: findClosestMetadata(ancestors, 'notFound'),
			route: node.metadata.route,
			middleware: findClosestMetadata(ancestors, 'middleware'),
			template: findClosestMetadata(ancestors, 'template'),
			forbidden: findClosestMetadata(ancestors, 'forbidden'),
			unauthorized: findClosestMetadata(ancestors, 'unauthorized'),
			params,
		};
	}

	/**
	 * Finds the closest metadata property in the ancestors
	 */
	function findClosestMetadata(
		ancestors: RouteNode[],
		property: keyof RouteNode['metadata'],
	): string | undefined {
		for (const ancestor of ancestors) {
			if (ancestor.metadata[property]) {
				return ancestor.metadata[property];
			}
		}
		return undefined;
	}
}
