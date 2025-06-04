// import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
// import { mkdir, rm, writeFile } from 'node:fs/promises';
// import { join } from 'node:path';

// import { scanDirectory } from '../../../server/serve/build/file-router/scanDirectory';

// describe('Server Integration', () => {
// 	const testDir = './test-serve-app';

// 	beforeEach(async () => {
// 		// Clean up any existing test directory
// 		try {
// 			await rm(testDir, { force: true, recursive: true });
// 		} catch {
// 			// Directory doesn't exist, ignore
// 		}
// 	});

// 	afterEach(async () => {
// 		// Clean up test directory
// 		try {
// 			await rm(testDir, { force: true, recursive: true });
// 		} catch {
// 			// Directory doesn't exist, ignore
// 		}
// 	});

// 	describe('Route matching performance', () => {
// 		test('should handle high-volume route matching efficiently', async () => {
// 			// Create a large app structure
// 			const routes = [];
// 			const numRoutes = 1000;

// 			for (let i = 0; i < numRoutes; i++) {
// 				routes.push(`api/v${Math.floor(i / 100)}/resource${i}/route.ts`);
// 				routes.push(`pages/category${Math.floor(i / 50)}/item${i}/page.tsx`);
// 			}

// 			for (const route of routes) {
// 				const filePath = join(testDir, route);
// 				await mkdir(filePath.substring(0, filePath.lastIndexOf('/')), {
// 					recursive: true,
// 				});
// 				await writeFile(filePath, `// ${route}`);
// 			}

// 			const router = await scanDirectory(testDir, '/');

// 			// Performance test
// 			const testPaths = [
// 				'/api/v1/resource100',
// 				'/api/v5/resource500',
// 				'/pages/category10/item200',
// 				'/pages/category19/item950',
// 				'/api/v9/resource999',
// 			];

// 			const startTime = performance.now();
// 			const iterations = 10000;

// 			for (let i = 0; i < iterations; i++) {
// 				for (const path of testPaths) {
// 					router.find(path, 'GET');
// 				}
// 			}

// 			const endTime = performance.now();
// 			const totalLookups = iterations * testPaths.length;
// 			const avgTimeMs = (endTime - startTime) / totalLookups;

// 			// Should be very fast - under 0.01ms per lookup on average
// 			expect(avgTimeMs).toBeLessThan(0.01);
// 			console.log(
// 				`Performance: ${totalLookups} lookups in ${endTime - startTime}ms (${avgTimeMs}ms avg)`,
// 			);
// 		});

// 		test('should handle complex dynamic route patterns efficiently', async () => {
// 			// Create routes with various dynamic patterns
// 			const dynamicRoutes = [
// 				'users/[id]/page.tsx',
// 				'posts/[...slug]/page.tsx',
// 				'shop/[[...category]]/page.tsx',
// 				'api/users/[userId]/posts/[postId]/route.ts',
// 				'blog/[year]/[month]/[day]/[slug]/page.tsx',
// 				'docs/[...path]/page.tsx',
// 			];

// 			for (const route of dynamicRoutes) {
// 				const filePath = join(testDir, route);
// 				await mkdir(filePath.substring(0, filePath.lastIndexOf('/')), {
// 					recursive: true,
// 				});
// 				await writeFile(filePath, `// ${route}`);
// 			}

// 			const router = await scanDirectory(testDir, '/');

// 			// Test various path patterns
// 			const testCases = [
// 				{ params: { id: '123' }, path: '/users/123' },
// 				{
// 					params: { slug: ['nextjs', 'routing', 'guide'] },
// 					path: '/posts/nextjs/routing/guide',
// 				},
// 				{ params: { category: [] }, path: '/shop' },
// 				{
// 					params: { category: ['electronics', 'phones'] },
// 					path: '/shop/electronics/phones',
// 				},
// 				{
// 					params: { postId: '789', userId: '456' },
// 					path: '/api/users/456/posts/789',
// 				},
// 				{
// 					params: { day: '15', month: '01', slug: 'my-post', year: '2024' },
// 					path: '/blog/2024/01/15/my-post',
// 				},
// 				{
// 					params: { path: ['api', 'reference', 'hooks'] },
// 					path: '/docs/api/reference/hooks',
// 				},
// 			];

// 			for (const testCase of testCases) {
// 				const result = router.find(testCase.path, 'GET');
// 				expect(result.data).toBeTruthy();
// 				expect(result.params).toEqual(testCase.params);
// 			}
// 		});
// 	});

// 	describe('Request handling simulation', () => {
// 		test('should simulate full request cycle with router', async () => {
// 			// Create a realistic app structure
// 			const appStructure = [
// 				'api/users/route.ts',
// 				'api/users/route.get.ts',
// 				'api/users/route.post.ts',
// 				'api/users/route.put.ts',
// 				'api/users/route.delete.ts',
// 				'api/users/route.patch.ts',
// 				'api/users/route.options.ts',
// 				'api/users/route.head.ts',
// 				// 'api/users/[id]/route.ts',
// 				// 'api/users/[id]/route.tsx',
// 				// 'api/users/[id]/route.get.ts',
// 				// 'api/users/[id]/route.post.ts',
// 				// 'api/users/[id]/route.put.ts',
// 				// 'api/users/[id]/route.delete.ts',
// 				// 'api/users/[id]/route.patch.ts',
// 				// 'api/users/[id]/route.options.ts',
// 				// 'api/users/[id]/route.head.ts',
// 			];

// 			for (const file of appStructure) {
// 				const filePath = join(testDir, file);
// 				await mkdir(filePath.substring(0, filePath.lastIndexOf('/')), {
// 					recursive: true,
// 				});

// 				let content = `// ${file}`;
// 				if (file.includes('route')) {
// 					content = `
// export async function GET(request) {
// 	return new Response(JSON.stringify({ path: '${file}' }), {
// 		headers: { 'Content-Type': 'application/json' }
// 	});
// }

// export async function POST(request) {
// 	const body = await request.json();
// 	return new Response(JSON.stringify({ path: '${file}', body }), {
// 		headers: { 'Content-Type': 'application/json' }
// 	});
// }

// export async function PUT(request) {
// 	const body = await request.json();
// 	return new Response(JSON.stringify({ path: '${file}', body }), {
// 		headers: { 'Content-Type': 'application/json' }
// 	});
// }

// export async function DELETE(request) {
// 	return new Response(JSON.stringify({ path: '${file}', deleted: true }), {
// 		headers: { 'Content-Type': 'application/json' }
// 	});
// }`;
// 				} else if (file.includes('page')) {
// 					content = `
// export default function Page({ params }) {
// 	return <div>Page: ${file}, Params: {JSON.stringify(params)}</div>;
// }`;
// 				}

// 				await writeFile(filePath, content);
// 			}

// 			const router = await scanDirectory(testDir, '/');

// 			// Simulate request handling
// 			const simulateRequest = (path: string, method: string) => {
// 				const result = router.find(path, method as any);
// 				if (!result.data) {
// 					return { body: 'Not Found', status: 404 };
// 				}

// 				return {
// 					config: result.data.config,
// 					file: result.data.file,
// 					params: result.params,
// 					status: 200,
// 				};
// 			};

// 			// Test various requests
// 			const requests = [
// 				{ method: 'GET', path: '/' },
// 				{ method: 'GET', path: '/api/health' },
// 				{ method: 'GET', path: '/api/users' },
// 				{ method: 'POST', path: '/api/users' },
// 				{ method: 'GET', path: '/api/users/123' },
// 				{ method: 'PUT', path: '/api/users/123' },
// 				{ method: 'DELETE', path: '/api/users/123' },
// 				{ method: 'GET', path: '/blog/my-awesome-post' },
// 				{ method: 'GET', path: '/dashboard' },
// 				{ method: 'GET', path: '/dashboard/users' },
// 				{ method: 'GET', path: '/non-existent' },
// 			];

// 			const responses = requests.map((req) => ({
// 				request: req,
// 				response: simulateRequest(req.path, req.method),
// 			}));

// 			// Verify responses
// 			expect(responses[0].response.status).toBe(200); // Home page
// 			expect(responses[0].response.file?.type).toBe('page');

// 			expect(responses[1].response.status).toBe(200); // Health API
// 			expect(responses[1].response.file?.type).toBe('route');

// 			expect(responses[4].response.status).toBe(200); // User detail
// 			expect(responses[4].response.params).toEqual({ id: '123' });

// 			expect(responses[7].response.status).toBe(200); // Blog post
// 			expect(responses[7].response.params).toEqual({ slug: 'my-awesome-post' });

// 			expect(responses[10].response.status).toBe(404); // Non-existent route
// 		});
// 	});

// 	describe('Route precedence and conflicts', () => {
// 		test('should handle route precedence correctly', async () => {
// 			// Create routes that could conflict
// 			const routes = [
// 				'api/users/settings/route.ts', // Static route
// 				'api/users/[id]/route.ts', // Dynamic route
// 				'api/[...catch]/route.ts', // Catch-all route
// 				'docs/api/route.ts', // Specific static
// 				'docs/[...slug]/page.tsx', // Catch-all page
// 			];

// 			for (const route of routes) {
// 				const filePath = join(testDir, route);
// 				await mkdir(filePath.substring(0, filePath.lastIndexOf('/')), {
// 					recursive: true,
// 				});
// 				await writeFile(filePath, `// ${route}`);
// 			}

// 			const router = await scanDirectory(testDir, '/');

// 			// Test precedence: static > dynamic > catch-all
// 			const settingsResult = router.find('/api/users/settings', 'GET');
// 			expect(settingsResult.data?.file.name).toBe('route.ts');
// 			expect(settingsResult.data?.file.dirPath).toContain('users/settings');

// 			const userResult = router.find('/api/users/123', 'GET');
// 			expect(userResult.data?.file.name).toBe('route.ts');
// 			expect(userResult.data?.file.dirPath).toContain('users/[id]');
// 			expect(userResult.params).toEqual({ id: '123' });

// 			const catchAllResult = router.find('/api/random/path', 'GET');
// 			expect(catchAllResult.data?.file.name).toBe('route.ts');
// 			expect(catchAllResult.data?.file.dirPath).toContain('[...catch]');
// 			expect(catchAllResult.params).toEqual({ catch: ['random', 'path'] });

// 			const docsApiResult = router.find('/docs/api', 'GET');
// 			expect(docsApiResult.data?.file.name).toBe('route.ts');
// 			expect(docsApiResult.data?.file.dirPath).toContain('docs/api');

// 			const docsSlugResult = router.find('/docs/getting-started', 'GET');
// 			expect(docsSlugResult.data?.file.name).toBe('page.tsx');
// 			expect(docsSlugResult.data?.file.dirPath).toContain('[...slug]');
// 			expect(docsSlugResult.params).toEqual({ slug: ['getting-started'] });
// 		});
// 	});

// 	describe('Memory and resource usage', () => {
// 		test('should handle large number of routes without excessive memory usage', async () => {
// 			const startMemory = process.memoryUsage();

// 			// Create a large number of routes
// 			const numRoutes = 5000;
// 			const routes = [];

// 			for (let i = 0; i < numRoutes; i++) {
// 				const category = Math.floor(i / 100);
// 				const subcategory = Math.floor(i / 10) % 10;
// 				routes.push(
// 					`api/v1/category${category}/sub${subcategory}/item${i}/route.ts`,
// 				);
// 			}

// 			for (const route of routes) {
// 				const filePath = join(testDir, route);
// 				await mkdir(filePath.substring(0, filePath.lastIndexOf('/')), {
// 					recursive: true,
// 				});
// 				await writeFile(filePath, `// ${route}`);
// 			}

// 			const router = await scanDirectory(testDir, '/');
// 			const endMemory = process.memoryUsage();

// 			const allRoutes = router.getAllRoutes();
// 			expect(allRoutes).toHaveLength(numRoutes);

// 			// Memory usage should be reasonable (less than 50MB increase)
// 			const memoryIncrease =
// 				(endMemory.heapUsed - startMemory.heapUsed) / 1024 / 1024;
// 			expect(memoryIncrease).toBeLessThan(50);

// 			console.log(
// 				`Memory usage: +${memoryIncrease.toFixed(2)}MB for ${numRoutes} routes`,
// 			);
// 		});
// 	});

// 	describe('Error handling', () => {
// 		test('should handle malformed file structure gracefully', async () => {
// 			await mkdir(testDir, { recursive: true });

// 			// Create some problematic files
// 			await writeFile(join(testDir, 'page'), 'Invalid file without extension');
// 			await writeFile(join(testDir, '.hidden'), 'Hidden file');
// 			await writeFile(join(testDir, 'README.md'), '# Documentation');

// 			// This should not throw
// 			const router = await scanDirectory(testDir, '/');
// 			const allRoutes = router.getAllRoutes();

// 			// Should ignore invalid files
// 			expect(allRoutes).toHaveLength(0);
// 		});

// 		test('should handle circular route references gracefully', async () => {
// 			await mkdir(join(testDir, 'users', '[id]'), { recursive: true });

// 			// Create routes that could potentially cause issues
// 			await writeFile(
// 				join(testDir, 'users', '[id]', 'page.tsx'),
// 				'export default function UserPage() {}',
// 			);
// 			await writeFile(
// 				join(testDir, 'users', 'page.tsx'),
// 				'export default function UsersPage() {}',
// 			);

// 			const router = await scanDirectory(testDir, '/');

// 			// Should handle both routes correctly
// 			const usersResult = router.find('/users', 'GET');
// 			expect(usersResult.data?.file.dirPath).toContain('users');
// 			expect(usersResult.data?.file.name).toBe('page.tsx');

// 			const userResult = router.find('/users/123', 'GET');
// 			expect(userResult.data?.file.dirPath).toContain('users/[id]');
// 			expect(userResult.params).toEqual({ id: '123' });
// 		});
// 	});

// 	describe('Real-world scenarios', () => {
// 		test('should handle Next.js-style app directory structure', async () => {
// 			const nextjsStructure = [
// 				'layout.tsx',
// 				'page.tsx',
// 				'loading.tsx',
// 				'error.tsx',
// 				'not-found.tsx',
// 				'(auth)/login/page.tsx',
// 				'(auth)/register/page.tsx',
// 				'(auth)/layout.tsx',
// 				'dashboard/(overview)/page.tsx',
// 				'dashboard/(overview)/analytics/page.tsx',
// 				'dashboard/settings/page.tsx',
// 				'dashboard/layout.tsx',
// 				'blog/[slug]/page.tsx',
// 				'blog/[slug]/opengraph-image.tsx',
// 				'blog/page.tsx',
// 				'api/auth/route.ts',
// 				'api/auth/[...nextauth]/route.ts',
// 				'api/users/route.ts',
// 				'api/users/route.post.ts',
// 				'api/users/[id]/route.ts',
// 				'api/users/[id]/posts/route.ts',
// 				'shop/[[...slug]]/page.tsx',
// 				'docs/[...slug]/page.tsx',
// 			];

// 			for (const file of nextjsStructure) {
// 				const filePath = join(testDir, file);
// 				await mkdir(filePath.substring(0, filePath.lastIndexOf('/')), {
// 					recursive: true,
// 				});
// 				await writeFile(filePath, `// ${file}`);
// 			}

// 			const router = await scanDirectory(testDir, '/');

// 			// Test various Next.js patterns
// 			expect(router.find('/', 'GET').data).toBeTruthy();
// 			expect(router.find('/login', 'GET').data).toBeTruthy(); // Route group
// 			expect(router.find('/register', 'GET').data).toBeTruthy(); // Route group
// 			expect(router.find('/dashboard', 'GET').data).toBeTruthy(); // Overview route group
// 			expect(router.find('/analytics', 'GET').data).toBeTruthy(); // Nested route group
// 			expect(router.find('/dashboard/settings', 'GET').data).toBeTruthy();
// 			expect(router.find('/blog', 'GET').data).toBeTruthy();
// 			expect(router.find('/blog/my-post', 'GET').data).toBeTruthy();
// 			expect(router.find('/api/auth', 'GET').data).toBeTruthy();
// 			expect(router.find('/api/auth/callback/google', 'GET').data).toBeTruthy(); // Catch-all
// 			expect(router.find('/api/users', 'GET').data).toBeTruthy();
// 			expect(router.find('/api/users', 'POST').data).toBeTruthy();
// 			expect(router.find('/api/users/123', 'GET').data).toBeTruthy();
// 			expect(router.find('/api/users/123/posts', 'GET').data).toBeTruthy();
// 			expect(router.find('/shop', 'GET').data).toBeTruthy(); // Optional catch-all
// 			expect(
// 				router.find('/shop/category/electronics', 'GET').data,
// 			).toBeTruthy();
// 			expect(router.find('/docs/getting-started', 'GET').data).toBeTruthy();

// 			const allRoutes = router.getAllRoutes();
// 			console.log(`Total routes created: ${allRoutes.length}`);
// 		});
// 	});
// });
