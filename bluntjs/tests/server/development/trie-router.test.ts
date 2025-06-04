import { beforeEach, describe, expect, test } from 'bun:test';

import { TrieRouter } from '../../../server/serve/router/trie-router';
import type { RouteConfig } from '../../../types';

type MethodType =
	| 'GET'
	| 'POST'
	| 'PUT'
	| 'DELETE'
	| 'PATCH'
	| 'OPTIONS'
	| 'HEAD';

type FileType = {
	type:
		| 'page'
		| 'route'
		| 'layout'
		| 'template'
		| 'loading'
		| 'error'
		| 'middleware'
		| 'file'
		| 'not-found';
	method: MethodType;
	filePath: string;
	httpPath: string;
	dirPath: string;
	name: string;
};

describe('TrieRouter', () => {
	let router: TrieRouter;

	beforeEach(() => {
		router = new TrieRouter();
	});

	describe('Basic routing', () => {
		test('should handle root route', () => {
			const file: FileType = {
				dirPath: '/app',
				filePath: '/app/page.tsx',
				httpPath: '/',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			router.insert('/', 'GET', file);

			const result = router.find('/', 'GET');
			expect(result.data).toBeTruthy();
			expect(result.data?.file.filePath).toBe('/app/page.tsx');
			expect(result.params).toEqual({});
		});

		test('should handle nested routes', () => {
			const aboutFile: FileType = {
				dirPath: '/app/about',
				filePath: '/app/about/page.tsx',
				httpPath: '/about',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			router.insert('/about', 'GET', aboutFile);

			const result = router.find('/about', 'GET');
			expect(result.data).toBeTruthy();
			expect(result.data?.file.filePath).toBe('/app/about/page.tsx');
		});

		test('should handle deep nested routes', () => {
			const deepFile: FileType = {
				dirPath: '/app/blog/posts/archive',
				filePath: '/app/blog/posts/archive/page.tsx',
				httpPath: '/blog/posts/archive',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			router.insert('/blog/posts/archive', 'GET', deepFile);

			const result = router.find('/blog/posts/archive', 'GET');
			expect(result.data).toBeTruthy();
			expect(result.data?.file.filePath).toBe(
				'/app/blog/posts/archive/page.tsx',
			);
		});

		test('should return null for non-existent routes', () => {
			const result = router.find('/non-existent', 'GET');
			expect(result.data).toBeNull();
		});

		test('should handle different HTTP methods', () => {
			const getFile: FileType = {
				dirPath: '/app/api/users',
				filePath: '/app/api/users/route.ts',
				httpPath: '/api/users',
				method: 'GET',
				name: 'route.ts',
				type: 'route',
			};

			const postFile: FileType = {
				dirPath: '/app/api/users',
				filePath: '/app/api/users/route.post.ts',
				httpPath: '/api/users',
				method: 'POST',
				name: 'route.post.ts',
				type: 'route',
			};

			router.insert('/api/users', 'GET', getFile);
			router.insert('/api/users', 'POST', postFile);

			const getResult = router.find('/api/users', 'GET');
			const postResult = router.find('/api/users', 'POST');
			const deleteResult = router.find('/api/users', 'DELETE');

			expect(getResult.data?.file.name).toBe('route.ts');
			expect(postResult.data?.file.name).toBe('route.post.ts');
			expect(deleteResult.data).toBeNull();
		});
	});

	describe('Dynamic routes', () => {
		test('should handle single dynamic segment', () => {
			const userFile: FileType = {
				dirPath: '/app/users/[id]',
				filePath: '/app/users/[id]/page.tsx',
				httpPath: '/users/[id]',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			router.insert('/users/[id]', 'GET', userFile);

			const result = router.find('/users/123', 'GET');
			expect(result.data).toBeTruthy();
			expect(result.data?.file.filePath).toBe('/app/users/[id]/page.tsx');
			expect(result.params).toEqual({ id: '123' });
		});

		test('should handle multiple dynamic segments', () => {
			const postFile: FileType = {
				dirPath: '/app/users/[id]/posts/[postId]',
				filePath: '/app/users/[id]/posts/[postId]/page.tsx',
				httpPath: '/users/[id]/posts/[postId]',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			router.insert('/users/[id]/posts/[postId]', 'GET', postFile);

			const result = router.find('/users/123/posts/456', 'GET');
			expect(result.data).toBeTruthy();
			expect(result.params).toEqual({ id: '123', postId: '456' });
		});

		test('should prioritize exact matches over dynamic routes', () => {
			const exactFile: FileType = {
				dirPath: '/app/users/settings',
				filePath: '/app/users/settings/page.tsx',
				httpPath: '/users/settings',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			const dynamicFile: FileType = {
				dirPath: '/app/users/[id]',
				filePath: '/app/users/[id]/page.tsx',
				httpPath: '/users/[id]',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			router.insert('/users/settings', 'GET', exactFile);
			router.insert('/users/[id]', 'GET', dynamicFile);

			const settingsResult = router.find('/users/settings', 'GET');
			const dynamicResult = router.find('/users/123', 'GET');

			expect(settingsResult.data?.file.filePath).toBe(
				'/app/users/settings/page.tsx',
			);
			expect(settingsResult.params).toEqual({});

			expect(dynamicResult.data?.file.filePath).toBe(
				'/app/users/[id]/page.tsx',
			);
			expect(dynamicResult.params).toEqual({ id: '123' });
		});
	});

	describe('Catch-all routes', () => {
		test('should handle catch-all routes', () => {
			const catchAllFile: FileType = {
				dirPath: '/app/docs/[...slug]',
				filePath: '/app/docs/[...slug]/page.tsx',
				httpPath: '/docs/[...slug]',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			router.insert('/docs/[...slug]', 'GET', catchAllFile);

			const result1 = router.find('/docs/getting-started', 'GET');
			expect(result1.data).toBeTruthy();
			expect(result1.params).toEqual({ slug: ['getting-started'] });

			const result2 = router.find('/docs/api/authentication/oauth', 'GET');
			expect(result2.data).toBeTruthy();
			expect(result2.params).toEqual({
				slug: ['api', 'authentication', 'oauth'],
			});
		});

		test('should handle optional catch-all routes', () => {
			const optionalCatchAllFile: FileType = {
				dirPath: '/app/shop/[[...category]]',
				filePath: '/app/shop/[[...category]]/page.tsx',
				httpPath: '/shop/[[...category]]',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			router.insert('/shop/[[...category]]', 'GET', optionalCatchAllFile);

			// Should match empty path
			const emptyResult = router.find('/shop', 'GET');
			expect(emptyResult.data).toBeTruthy();
			expect(emptyResult.params).toEqual({ category: [] });

			// Should match single segment
			const singleResult = router.find('/shop/electronics', 'GET');
			expect(singleResult.data).toBeTruthy();
			expect(singleResult.params).toEqual({ category: ['electronics'] });

			// Should match multiple segments
			const multiResult = router.find('/shop/electronics/phones/apple', 'GET');
			expect(multiResult.data).toBeTruthy();
			expect(multiResult.params).toEqual({
				category: ['electronics', 'phones', 'apple'],
			});
		});

		test('should prioritize specific routes over catch-all', () => {
			const specificFile: FileType = {
				dirPath: '/app/docs/api',
				filePath: '/app/docs/api/page.tsx',
				httpPath: '/docs/api',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			const catchAllFile: FileType = {
				dirPath: '/app/docs/[...slug]',
				filePath: '/app/docs/[...slug]/page.tsx',
				httpPath: '/docs/[...slug]',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			router.insert('/docs/api', 'GET', specificFile);
			router.insert('/docs/[...slug]', 'GET', catchAllFile);

			const specificResult = router.find('/docs/api', 'GET');
			expect(specificResult.data?.file.filePath).toBe('/app/docs/api/page.tsx');
			expect(specificResult.params).toEqual({});

			const catchAllResult = router.find('/docs/getting-started', 'GET');
			expect(catchAllResult.data?.file.filePath).toBe(
				'/app/docs/[...slug]/page.tsx',
			);
			expect(catchAllResult.params).toEqual({ slug: ['getting-started'] });
		});
	});

	describe('Route configuration', () => {
		test('should store and retrieve route config', () => {
			const config: RouteConfig = {
				ppr: true,
				spa: false,
				ssr: true,
				streaming: false,
				timeout: 5000,
			};

			const file: FileType = {
				dirPath: '/app',
				filePath: '/app/page.tsx',
				httpPath: '/',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			router.insert('/', 'GET', file, config);

			const result = router.find('/', 'GET');
			expect(result.data?.config).toEqual(config);
		});

		test('should handle routes without config', () => {
			const file: FileType = {
				dirPath: '/app',
				filePath: '/app/page.tsx',
				httpPath: '/',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			router.insert('/', 'GET', file);

			const result = router.find('/', 'GET');
			expect(result.data?.config).toBeUndefined();
		});
	});

	describe('getAllRoutes', () => {
		test('should return all registered routes', () => {
			const files = [
				{
					file: {
						dirPath: '/app',
						filePath: '/app/page.tsx',
						httpPath: '/',
						method: 'GET' as MethodType,
						name: 'page.tsx',
						type: 'page' as const,
					},
					method: 'GET' as MethodType,
					path: '/',
				},
				{
					file: {
						dirPath: '/app/about',
						filePath: '/app/about/page.tsx',
						httpPath: '/about',
						method: 'GET' as MethodType,
						name: 'page.tsx',
						type: 'page' as const,
					},
					method: 'GET' as MethodType,
					path: '/about',
				},
				{
					file: {
						dirPath: '/app/api/users',
						filePath: '/app/api/users/route.ts',
						httpPath: '/api/users',
						method: 'GET' as MethodType,
						name: 'route.ts',
						type: 'route' as const,
					},
					method: 'GET' as MethodType,
					path: '/api/users',
				},
			];

			files.forEach(({ path, method, file }) => {
				router.insert(path, method, file);
			});

			const allRoutes = router.getAllRoutes();
			expect(allRoutes).toHaveLength(3);

			const paths = allRoutes.map((route) => route.path);
			expect(paths).toContain('/');
			expect(paths).toContain('/about');
			expect(paths).toContain('/api/users');
		});

		test('should handle empty router', () => {
			const allRoutes = router.getAllRoutes();
			expect(allRoutes).toHaveLength(0);
		});
	});

	describe('Edge cases', () => {
		test('should handle trailing slashes', () => {
			const file: FileType = {
				dirPath: '/app/about',
				filePath: '/app/about/page.tsx',
				httpPath: '/about',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			router.insert('/about', 'GET', file);

			// Should find route without trailing slash
			const result1 = router.find('/about', 'GET');
			expect(result1.data).toBeTruthy();

			// Should not find route with trailing slash (different path)
			const result2 = router.find('/about/', 'GET');
			expect(result2.data).toBeNull();
		});

		test('should handle empty segments in path', () => {
			const file: FileType = {
				dirPath: '/app/api/users',
				filePath: '/app/api/users/page.tsx',
				httpPath: '/api/users',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			router.insert('/api/users', 'GET', file);

			// Should handle double slashes by filtering empty segments
			const result = router.find('//api//users/', 'GET');
			expect(result.data).toBeTruthy();
		});

		test('should handle special characters in dynamic routes', () => {
			const file: FileType = {
				dirPath: '/app/posts/[slug]',
				filePath: '/app/posts/[slug]/page.tsx',
				httpPath: '/posts/[slug]',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			router.insert('/posts/[slug]', 'GET', file);

			const result = router.find('/posts/hello-world-123', 'GET');
			expect(result.data).toBeTruthy();
			expect(result.params).toEqual({ slug: 'hello-world-123' });
		});

		test('should handle URL encoded segments', () => {
			const file: FileType = {
				dirPath: '/app/search/[query]',
				filePath: '/app/search/[query]/page.tsx',
				httpPath: '/search/[query]',
				method: 'GET',
				name: 'page.tsx',
				type: 'page',
			};

			router.insert('/search/[query]', 'GET', file);

			const result = router.find('/search/hello%20world', 'GET');
			expect(result.data).toBeTruthy();
			expect(result.params).toEqual({ query: 'hello%20world' });
		});
	});
});
