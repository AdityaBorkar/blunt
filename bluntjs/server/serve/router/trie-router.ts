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

type SpecialFiles = {
	layout?: TargetType;
	template?: TargetType;
	loading?: TargetType;
	error?: TargetType;
	'not-found'?: TargetType;
	middleware?: TargetType;
};

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

		if (!method) {
			// console.log({ filePath: target.filePath, target: target.type });
			// @ts-expect-error - WORKAROUND - WRITE BETTER TYPES LATER
			node[target.type] = target.filePath;
			console.log({ node });
		} else {
			node.routes.set(method, target);
		}
	}

	static getSpecialFile(node: TrieNode) {
		const SpecialFiles: SpecialFiles = {};
		for (const specialFile of specialFiles) {
			if (specialFile in node) {
				const target = node[specialFile];
				if (target) SpecialFiles[specialFile] = target;
			}
		}
		return SpecialFiles;
	}

	find(
		method: RequestMethod,
		path: string[],
		root: TrieNode = this.root,
		params: Record<string, string | string[]> = {},
		nest: SpecialFiles[] = [],
	): {
		nest: SpecialFiles[];
		params: Record<string, string | string[]>;
		target: TargetType | undefined;
	} {
		// Collect special files from current node
		const files = TrieRouter.getSpecialFile(root);
		nest.push(files);

		// Base case: no more segments to process
		if (path.length === 0) {
			const target = root.routes.get(method);
			return { nest, params, target };
		}

		const [segment, ...restSegments] = path;

		// Try exact match first
		if (segment !== undefined) {
			const exactNode = root.nodes.get(segment);
			if (exactNode) {
				const result = this.find(method, restSegments, exactNode, params, nest);
				if (result.target) return result;
			}
		}

		// Try dynamic matches
		for (const [_, node] of root.nodes) {
			if (!node.isCatch || !node.paramName) continue;
			const paramName = node.paramName;

			if (node.isCatch === PathCatchType.CATCH_SELF && segment !== undefined) {
				// Single dynamic segment [param]
				const newParams = { ...params };
				newParams[paramName] = segment;
				const result = this.find(method, restSegments, node, newParams, [
					...nest,
				]);
				if (result.target) return result;
			} else if (
				node.isCatch === PathCatchType.CATCH_CHILDREN &&
				segment !== undefined
			) {
				// Catch-all [...param] - captures remaining segments
				const remainingSegments = [segment, ...restSegments];
				const newParams = { ...params };
				newParams[paramName] = remainingSegments;
				const result = this.find(method, [], node, newParams, [...nest]);
				if (result.target) return result;
			} else if (node.isCatch === PathCatchType.CATCH_ALL) {
				// Optional catch-all [[...param]] - can match empty or remaining segments
				if (segment !== undefined) {
					const remainingSegments = [segment, ...restSegments];
					const newParams = { ...params };
					newParams[paramName] = remainingSegments;
					const result = this.find(method, [], node, newParams, [...nest]);
					if (result.target) return result;
				}

				// Also try matching with empty params
				const emptyParams = { ...params };
				emptyParams[paramName] = [];
				const emptyResult = this.find(method, path, node, emptyParams, [
					...nest,
				]);
				if (emptyResult.target) return emptyResult;
			}
		}

		// No match found
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
			if (child.isCatch && child.paramName) {
				if (child.isCatch === PathCatchType.CATCH_ALL) {
					newPath = `${currentPath}/[[...${child.paramName}]]`;
				} else if (child.isCatch === PathCatchType.CATCH_CHILDREN) {
					newPath = `${currentPath}/[...${child.paramName}]`;
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
			error: undefined,
			isCatch: props?.isCatch ?? undefined,
			layout: undefined,
			loading: undefined,
			middleware: undefined,
			nodes: props?.nodes ?? new Map(),
			'not-found': undefined,
			paramName: props?.paramName ?? undefined,
			routes: props?.routes ?? new Map(),
			template: undefined,
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
