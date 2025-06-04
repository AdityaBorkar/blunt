import type { FileType, RequestMethod, RouteConfig } from '@/types';

type RouteData = {
	file: FileType;
	config?: RouteConfig;
	handler?: any;
};

type TrieNode = {
	children: Map<string, TrieNode>;
	routes: Map<RequestMethod, RouteData>;
	isDynamic: boolean;
	paramName: string | null;
	isCatchAll: boolean;
	isOptionalCatchAll: boolean;
};

export class TrieRouter {
	private root: TrieNode;

	constructor() {
		this.root = {
			children: new Map(),
			isCatchAll: false,
			isDynamic: false,
			isOptionalCatchAll: false,
			paramName: null,
			routes: new Map(),
		};
	}

	private createNode(): TrieNode {
		return {
			children: new Map(),
			isCatchAll: false,
			isDynamic: false,
			isOptionalCatchAll: false,
			paramName: null,
			routes: new Map(),
		};
	}

	insert(
		method: RequestMethod,
		path: string,
		target:
			| {
					file: FileType;
					config?: RouteConfig;
			  }
			| {
					to: string;
					code?: number;
			  },
	): void {
		const segments = path.split('/').filter((s) => s.length > 0);
		let current = this.root;

		for (const segment of segments) {
			const parsed = TrieRouter.parseSegment(segment);
			if (!parsed) {
				if (!current.children.has(segment)) {
					current.children.set(segment, this.createNode());
				}
				current = current.children.get(segment)!;
				continue;
			}

			// Find existing dynamic child or create new one
			let dynamicChild = null;

			const parseName = parsed.paramName;
			const isCatchAll = parsed.type === 'CATCH-ALL';
			const isOptionalCatchAll = parsed.type === 'OPTIONAL-CATCH-ALL';
			for (const [_, child] of current.children) {
				if (
					child.isDynamic &&
					child.paramName === parseName &&
					child.isCatchAll === isCatchAll &&
					child.isOptionalCatchAll === isOptionalCatchAll
				) {
					dynamicChild = child;
					break;
				}
			}

			if (!dynamicChild) {
				dynamicChild = this.createNode();
				dynamicChild.isDynamic = true;
				dynamicChild.paramName = parseName;
				dynamicChild.isCatchAll = isCatchAll;
				dynamicChild.isOptionalCatchAll = isOptionalCatchAll;
				current.children.set(segment, dynamicChild);
			}
			current = dynamicChild;

			if (isCatchAll) break;
		}

		current.routes.set(method, { config, file });
	}

	find(
		path: string,
		method: RequestMethod,
	): {
		data: RouteData | null;
		params: Record<string, string | string[]>;
	} {
		const segments = path.split('/').filter((s) => s.length > 0);
		const params: Record<string, string | string[]> = {};

		const result = this.findRecursive(this.root, segments, 0, params, method);
		return {
			data: result,
			params,
		};
	}

	private findRecursive(
		node: TrieNode,
		segments: string[],
		index: number,
		params: Record<string, string | string[]>,
		method: RequestMethod,
	): RouteData | null {
		// If we've consumed all segments, check for route
		if (index >= segments.length) {
			return node.routes.get(method) || null;
		}

		const segment = segments[index];
		if (!segment) return null;

		// Try exact match first
		const exactChild = node.children.get(segment);
		if (exactChild) {
			const result = this.findRecursive(
				exactChild,
				segments,
				index + 1,
				params,
				method,
			);
			if (result) return result;
		}

		// Try dynamic matches
		for (const [_, child] of node.children) {
			if (!child.isDynamic) continue;

			if (child.isCatchAll) {
				// Catch-all routes capture remaining segments
				const remainingSegments = segments.slice(index);
				if (child.paramName) {
					if (child.isOptionalCatchAll && remainingSegments.length === 0) {
						// Optional catch-all can match empty path
						params[child.paramName] = [];
					} else {
						params[child.paramName] = remainingSegments;
					}
				}

				const route = child.routes.get(method);
				if (route) return route;

				// If optional catch-all, also try matching with empty params
				if (child.isOptionalCatchAll && remainingSegments.length === 0) {
					const result = this.findRecursive(
						child,
						segments,
						segments.length,
						params,
						method,
					);
					if (result) return result;
				}
			} else {
				// Single dynamic segment
				if (child.paramName) {
					params[child.paramName] = segment;
				}
				const result = this.findRecursive(
					child,
					segments,
					index + 1,
					params,
					method,
				);
				if (result) return result;

				// Clean up param if match failed
				if (child.paramName) {
					delete params[child.paramName];
				}
			}
		}

		return null;
	}

	// Get all routes for debugging/introspection
	getAllRoutes(): Array<{
		path: string;
		method: RequestMethod;
		data: RouteData;
	}> {
		const routes: Array<{
			path: string;
			method: RequestMethod;
			data: RouteData;
		}> = [];
		this.collectRoutes(this.root, '', routes);
		return routes;
	}

	private collectRoutes(
		node: TrieNode,
		currentPath: string,
		routes: Array<{ path: string; method: RequestMethod; data: RouteData }>,
	): void {
		// Add routes at current node
		for (const [method, data] of Array.from(node.routes.entries())) {
			routes.push({ data, method, path: currentPath || '/' });
		}

		// Recurse into children
		for (const [segment, child] of Array.from(node.children.entries())) {
			const newPath = `${currentPath}/${segment}`;
			this.collectRoutes(child, newPath, routes);
		}
	}

	// Merge routes from another router
	merge(otherRouter: TrieRouter): void {
		const allRoutes = otherRouter.getAllRoutes();
		for (const route of allRoutes) {
			this.insert(route.path, route.method, route.data.file, route.data.config);
		}
	}

	// Static Methods

	private static parseSegment(segment: string) {
		if (segment.startsWith('[') && segment.endsWith(']')) {
			const inner = segment.slice(1, -1);
			if (inner.startsWith('[') && inner.endsWith(']')) {
				const paramName = inner.slice(4, -3);
				return { paramName, type: 'OPTIONAL-CATCH-ALL' };
			} else if (inner.startsWith('...')) {
				const paramName = inner.slice(3);
				return { paramName, type: 'CATCH-ALL' };
			} else {
				const paramName = inner;
				return { paramName, type: 'DYNAMIC' };
			}
		}
		return null;
	}
}
