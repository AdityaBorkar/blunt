import type { FileConfig } from '@/server/config/file-config';
import type { PageConfig, RequestMethod, RouteConfig } from '@/types';

enum PathCatchType {
	CATCH_SELF = 'CATCH-SELF',
	CATCH_CHILDREN = 'CATCH-CHILDREN',
	CATCH_ALL = 'CATCH-ALL',
}

type TrieNode = {
	nodes: Map<string, TrieNode>;
	paramName: string | undefined;
	isCatch: PathCatchType | undefined;
	routes: Map<RequestMethod, TargetType>;
	// Special properties
	layout?: TargetType;
	template?: TargetType;
	loading?: TargetType;
	error?: TargetType;
	'not-found'?: TargetType;
	middleware?: TargetType;
};

export const specialFiles = [
	'layout',
	'template',
	'loading',
	'error',
	'not-found',
	'middleware',
] as const;

type TargetType =
	| {
			type: 'page' | 'layout' | 'template' | 'loading' | 'error' | 'not-found';
			filePath: string;
			config: PageConfig;
	  }
	| {
			type: 'route' | 'middleware';
			filePath: string;
			config: RouteConfig;
	  }
	| {
			type: 'file';
			filePath: string;
			config: FileConfig;
	  }
	| { to: string; code?: number }
	| { component: string; config: PageConfig }
	| { file: string; config: FileConfig }
	// biome-ignore lint/complexity/noBannedTypes: WILL FIX LATER
	| { func: Function; config: RouteConfig };

export class TrieRouter {
	root: TrieNode;

	constructor() {
		this.root = TrieRouter.createNode();
	}

	insert(method: RequestMethod | undefined, path: string, target: TargetType) {
		const segments = path.split('/').filter((s) => s.length > 0);
		let node = this.root;

		for (const segment of segments) {
			const parsed = TrieRouter.parseDynamicSegment(segment);

			if (!parsed) {
				if (!node.nodes.has(segment)) {
					node.nodes.set(segment, TrieRouter.createNode());
				}
				node = node.nodes.get(segment) as TrieNode;
				continue;
			}

			// ---
			let newNode = null;
			const { paramName, isCatch } = parsed;
			for (const [_, child] of node.nodes) {
				if (child.paramName === paramName && child.isCatch === isCatch) {
					newNode = child;
					break;
				}
			}
			if (!newNode) {
				newNode = TrieRouter.createNode({ isCatch, paramName });
				node.nodes.set(segment, newNode);
			}
			node = newNode;
			// ---

			if (
				isCatch === PathCatchType.CATCH_ALL ||
				isCatch === PathCatchType.CATCH_CHILDREN
			)
				break;
		}

		console.log({ node, target });
		if (!method) {
			// @ts-expect-error - WORKAROUND - WRITE BETTER TYPES LATER
			node[target.type] = target;
		} else {
			node.routes.set(method, target);
		}
	}

	find(
		method: RequestMethod,
		path: string | string[],
		root: TrieNode = this.root,
		params: Record<string, string | string[]> = {},
		nest: any[] = [],
	): {
		nest: any[];
		params: Record<string, string | string[]>;
		target: TargetType | undefined;
	} {
		const [segment, ...restSegments] = Array.isArray(path)
			? path
			: path.split('/').filter((s) => s.length > 0);

		// Unknown Case
		if (!segment) return { nest, params, target: undefined };
		const node = root.nodes.get(segment);
		if (!node) return { nest, params, target: undefined };

		// Add Special Files
		// ! BUG: THESE FILES ARE NOT `INSERTED` IN THE TRIE IN THE `INSERT` METHOD
		for (const specialFile of specialFiles) {
			if (specialFile in node) {
				const target = node[specialFile];
				if (target) nest.push(target);
			}
		}

		// Add Exact Match
		if (restSegments.length === 0) {
			const target = node.routes.get(method);
			return { nest, params, target };
		}

		const childNodes = node.nodes;

		// Try exact match first
		const exactNode = childNodes.get(segment);
		if (exactNode) {
			const result = this.find(method, restSegments, exactNode, params, nest);
			if (result.target) return result;
		}

		// Try dynamic matches
		for (const [_, node] of childNodes) {
			// If not a dynamic segment, skip
			if (!node.isCatch) continue;

			// If a dynamic segment, try to match it
			if (node.isCatch === PathCatchType.CATCH_SELF) {
				const paramName = node.paramName;
				if (!paramName) throw new Error('Invalid dynamic segment');
				params[paramName] = segment;
				return this.find(method, restSegments, node, params, nest);
			}

			console.log('TODO - PROCESS FILE');

			// 	if (child.isCatch === PathCatchType.CATCH_CHILDREN) {
			// 		// Catch-all routes capture remaining segments
			// 		const remainingSegments = segments.slice(index);
			// 		if (child.paramName) {
			// 			if (
			// 				child.isCatch === PathCatchType.CATCH_ALL &&
			// 				remainingSegments.length === 0
			// 			) {
			// 				// Optional catch-all can match empty path
			// 				params[child.paramName] = [];
			// 			} else {
			// 				params[child.paramName] = remainingSegments;
			// 			}
			// 		}
			// 		const route = child.routes.get(method);
			// 		if (route) return route;
			// 		// If optional catch-all, also try matching with empty params
			// 		if (child.isOptionalCatchAll && remainingSegments.length === 0) {
			// 			const result = this.$find(
			// 				child,
			// 				segments,
			// 				segments.length,
			// 				params,
			// 				method,
			// 			);
			// 			if (result) return result;
			// 		}
			// 	} else {
			// 		// Single dynamic segment
			// 		if (child.paramName) {
			// 			params[child.paramName] = segment;
			// 		}
			// 		const result = this.$find(child, segments, index + 1, params, method);
			// 		if (result) return result;
			// 		// Clean up param if match failed
			// 		if (child.paramName) {
			// 			delete params[child.paramName];
			// 		}
			// 	}
		}

		return { nest, params, target: undefined };
	}

	getAllRoutes() {
		const routes: Array<{
			path: string;
			method: RequestMethod;
			target: TargetType;
		}> = [];
		this.collectRoutes(this.root, '', routes);
		return routes;
	}

	private collectRoutes(
		node: TrieNode,
		currentPath: string,
		routes: Array<{ path: string; method: RequestMethod; target: TargetType }>,
	): void {
		// Add routes at current node
		for (const [method, target] of Array.from(node.routes.entries())) {
			routes.push({ method, path: currentPath || '/', target });
		}

		// Recurse into child nodes
		for (const [segment, child] of Array.from(node.nodes.entries())) {
			let newPath: string;
			if (child.isDynamic) {
				if (child.isCatchAll) {
					newPath = `${currentPath}/[...${child.paramName}]`;
				} else if (child.isOptionalCatchAll) {
					newPath = `${currentPath}/[[...${child.paramName}]]`;
				} else {
					newPath = `${currentPath}/[${child.paramName}]`;
				}
			} else {
				newPath = `${currentPath}/${segment}`;
			}
			this.collectRoutes(child, newPath, routes);
		}
	}

	private static createNode(props?: Partial<TrieNode>): TrieNode {
		return {
			isCatch: props?.isCatch ?? undefined,
			nodes: props?.nodes ?? new Map(),
			paramName: props?.paramName ?? undefined,
			routes: props?.routes ?? new Map(),
		};
	}

	private static parseDynamicSegment(segment: string) {
		if (segment.startsWith('[') && segment.endsWith(']')) {
			const inner = segment.slice(1, -1);
			if (inner.startsWith('[') && inner.endsWith(']')) {
				const paramName = inner.slice(4, -3);
				return { isCatch: PathCatchType.CATCH_ALL, paramName };
			} else if (inner.startsWith('...')) {
				const paramName = inner.slice(3);
				return { isCatch: PathCatchType.CATCH_CHILDREN, paramName };
			} else {
				const paramName = inner;
				return { isCatch: PathCatchType.CATCH_SELF, paramName };
			}
		}
		return null;
	}

	toJSON() {
		const root = this.root;
		const nodes = Array.from(root.nodes.entries()).map(([segment, node]) => ({
			node,
			segment,
		}));
		const routes = Array.from(root.routes.entries()).map(
			([method, target]) => ({
				method,
				target,
			}),
		);
		return { nodes, routes };
	}
}
