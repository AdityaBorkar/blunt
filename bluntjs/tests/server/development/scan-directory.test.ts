import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { scanDirectory } from '../../../server/serve/router/scanDirectory';

describe('scanDirectory', () => {
	const testDir = './test-app';

	beforeEach(async () => {
		// Clean up any existing test directory
		try {
			await rm(testDir, { force: true, recursive: true });
		} catch {
			// Directory doesn't exist, ignore
		}
	});

	afterEach(async () => {
		// Clean up test directory
		try {
			await rm(testDir, { force: true, recursive: true });
		} catch {
			// Directory doesn't exist, ignore
		}
	});

	describe('File pattern matching', () => {
		test('should detect page.tsx files', async () => {
			await mkdir(testDir, { recursive: true });
			await writeFile(
				join(testDir, 'page.tsx'),
				'export default function Page() { return <div>Home</div>; }',
			);

			const router = await scanDirectory(testDir, '/');
			const result = router.find('/', 'GET');

			expect(result.data).toBeTruthy();
			expect(result.data?.file.type).toBe('page');
			expect(result.data?.file.method).toBe('GET');
			expect(result.data?.file.name).toBe('page.tsx');
		});

		test('should detect route.ts files', async () => {
			await mkdir(join(testDir, 'api'), { recursive: true });
			await writeFile(
				join(testDir, 'api', 'route.ts'),
				'export async function GET() { return new Response("Hello"); }',
			);

			const router = await scanDirectory(testDir, '/');
			const result = router.find('/api', 'GET');

			expect(result.data).toBeTruthy();
			expect(result.data?.file.type).toBe('route');
			expect(result.data?.file.method).toBe('GET');
			expect(result.data?.file.name).toBe('route.ts');
		});

		test('should detect route.METHOD.tsx files', async () => {
			await mkdir(join(testDir, 'api', 'users'), { recursive: true });

			await writeFile(
				join(testDir, 'api', 'users', 'route.get.ts'),
				'export async function GET() { return new Response("Get users"); }',
			);

			await writeFile(
				join(testDir, 'api', 'users', 'route.post.tsx'),
				'export async function POST() { return new Response("Create user"); }',
			);

			await writeFile(
				join(testDir, 'api', 'users', 'route.delete.ts'),
				'export async function DELETE() { return new Response("Delete user"); }',
			);

			const router = await scanDirectory(testDir, '/');

			const getResult = router.find('/api/users', 'GET');
			expect(getResult.data?.file.method).toBe('GET');
			expect(getResult.data?.file.name).toBe('route.get.ts');

			const postResult = router.find('/api/users', 'POST');
			expect(postResult.data?.file.method).toBe('POST');
			expect(postResult.data?.file.name).toBe('route.post.tsx');

			const deleteResult = router.find('/api/users', 'DELETE');
			expect(deleteResult.data?.file.method).toBe('DELETE');
			expect(deleteResult.data?.file.name).toBe('route.delete.ts');
		});

		test('should ignore invalid file patterns', async () => {
			await mkdir(testDir, { recursive: true });

			// Invalid files that should be ignored
			await writeFile(
				join(testDir, 'component.tsx'),
				'export default function Component() {}',
			);
			await writeFile(join(testDir, 'utils.ts'), 'export function helper() {}');
			await writeFile(join(testDir, 'styles.css'), '.class { color: red; }');
			await writeFile(
				join(testDir, 'route.invalid.ts'),
				'export function INVALID() {}',
			);

			const router = await scanDirectory(testDir, '/');
			const allRoutes = router.getAllRoutes();

			expect(allRoutes).toHaveLength(0);
		});

		test('should ignore non-TypeScript files', async () => {
			await mkdir(testDir, { recursive: true });

			await writeFile(
				join(testDir, 'page.js'),
				'export default function Page() {}',
			);
			await writeFile(
				join(testDir, 'page.jsx'),
				'export default function Page() {}',
			);
			await writeFile(join(testDir, 'route.py'), 'def route(): pass');

			const router = await scanDirectory(testDir, '/');
			const allRoutes = router.getAllRoutes();

			expect(allRoutes).toHaveLength(0);
		});
	});

	describe('Directory structure', () => {
		test('should handle nested directories', async () => {
			await mkdir(join(testDir, 'blog', 'posts'), { recursive: true });
			await writeFile(
				join(testDir, 'page.tsx'),
				'export default function Home() {}',
			);
			await writeFile(
				join(testDir, 'blog', 'page.tsx'),
				'export default function Blog() {}',
			);
			await writeFile(
				join(testDir, 'blog', 'posts', 'page.tsx'),
				'export default function Posts() {}',
			);

			const router = await scanDirectory(testDir, '/');

			const homeResult = router.find('/', 'GET');
			expect(homeResult.data?.file.httpPath).toBe('/');

			const blogResult = router.find('/blog', 'GET');
			expect(blogResult.data?.file.httpPath).toBe('/blog');

			const postsResult = router.find('/blog/posts', 'GET');
			expect(postsResult.data?.file.httpPath).toBe('/blog/posts');
		});

		test('should handle route groups', async () => {
			await mkdir(join(testDir, '(auth)', 'login'), { recursive: true });
			await mkdir(join(testDir, '(auth)', 'register'), { recursive: true });

			await writeFile(
				join(testDir, '(auth)', 'login', 'page.tsx'),
				'export default function Login() {}',
			);
			await writeFile(
				join(testDir, '(auth)', 'register', 'page.tsx'),
				'export default function Register() {}',
			);

			const router = await scanDirectory(testDir, '/');

			// Route groups don't affect URL structure
			const loginResult = router.find('/login', 'GET');
			expect(loginResult.data?.file.httpPath).toBe('/login');

			const registerResult = router.find('/register', 'GET');
			expect(registerResult.data?.file.httpPath).toBe('/register');
		});

		test('should handle dynamic routes', async () => {
			await mkdir(join(testDir, 'users', '[id]'), { recursive: true });
			await mkdir(join(testDir, 'posts', '[...slug]'), { recursive: true });
			await mkdir(join(testDir, 'shop', '[[...category]]'), {
				recursive: true,
			});

			await writeFile(
				join(testDir, 'users', '[id]', 'page.tsx'),
				'export default function User() {}',
			);
			await writeFile(
				join(testDir, 'posts', '[...slug]', 'page.tsx'),
				'export default function Post() {}',
			);
			await writeFile(
				join(testDir, 'shop', '[[...category]]', 'page.tsx'),
				'export default function Shop() {}',
			);

			const router = await scanDirectory(testDir, '/');

			const userResult = router.find('/users/123', 'GET');
			expect(userResult.data).toBeTruthy();
			expect(userResult.params).toEqual({ id: '123' });

			const postResult = router.find('/posts/next/js/routing', 'GET');
			expect(postResult.data).toBeTruthy();
			expect(postResult.params).toEqual({ slug: ['next', 'js', 'routing'] });

			const shopEmptyResult = router.find('/shop', 'GET');
			expect(shopEmptyResult.data).toBeTruthy();
			expect(shopEmptyResult.params).toEqual({ category: [] });

			const shopCategoryResult = router.find('/shop/electronics/phones', 'GET');
			expect(shopCategoryResult.data).toBeTruthy();
			expect(shopCategoryResult.params).toEqual({
				category: ['electronics', 'phones'],
			});
		});

		test('should handle complex directory structure', async () => {
			// Create a complex Next.js-style app structure
			const structure = [
				'page.tsx',
				'about/page.tsx',
				'blog/page.tsx',
				'blog/[slug]/page.tsx',
				'blog/[slug]/comments/page.tsx',
				'api/route.ts',
				'api/users/route.ts',
				'api/users/route.post.ts',
				'api/users/[id]/route.ts',
				'api/users/[id]/route.put.ts',
				'api/users/[id]/route.delete.ts',
				'dashboard/(overview)/page.tsx',
				'dashboard/(overview)/analytics/page.tsx',
				'dashboard/settings/page.tsx',
				'shop/[[...category]]/page.tsx',
				'docs/[...slug]/page.tsx',
			];

			for (const file of structure) {
				const filePath = join(testDir, file);
				await mkdir(filePath.substring(0, filePath.lastIndexOf('/')), {
					recursive: true,
				});
				await writeFile(filePath, `// ${file}`);
			}

			const router = await scanDirectory(testDir, '/');
			const allRoutes = router.getAllRoutes();

			// Should have created routes for all valid files
			expect(allRoutes.length).toBeGreaterThan(10);

			// Test specific routes
			expect(router.find('/', 'GET').data).toBeTruthy();
			expect(router.find('/about', 'GET').data).toBeTruthy();
			expect(router.find('/blog/my-post', 'GET').data).toBeTruthy();
			expect(router.find('/blog/my-post/comments', 'GET').data).toBeTruthy();
			expect(router.find('/api', 'GET').data).toBeTruthy();
			expect(router.find('/api/users', 'GET').data).toBeTruthy();
			expect(router.find('/api/users', 'POST').data).toBeTruthy();
			expect(router.find('/api/users/123', 'GET').data).toBeTruthy();
			expect(router.find('/api/users/123', 'PUT').data).toBeTruthy();
			expect(router.find('/api/users/123', 'DELETE').data).toBeTruthy();
			expect(router.find('/analytics', 'GET').data).toBeTruthy(); // Route group
			expect(router.find('/dashboard/settings', 'GET').data).toBeTruthy();
			expect(router.find('/shop', 'GET').data).toBeTruthy();
			expect(router.find('/shop/electronics', 'GET').data).toBeTruthy();
			expect(router.find('/docs/getting-started', 'GET').data).toBeTruthy();
		});
	});

	describe('Route configuration loading', () => {
		test('should load route config when available', async () => {
			await mkdir(testDir, { recursive: true });

			const pageContent = `
export const config = {
	ppr: true,
	spa: false,
	ssr: true,
	streaming: false,
	timeout: 5000
};

export default function Page() {
	return <div>Page with config</div>;
}`;

			await writeFile(join(testDir, 'page.tsx'), pageContent);

			const router = await scanDirectory(testDir, '/');
			const result = router.find('/', 'GET');

			expect(result.data?.config).toBeTruthy();
			expect(result.data?.config?.ppr).toBe(true);
			expect(result.data?.config?.ssr).toBe(true);
		});

		test('should handle missing route config gracefully', async () => {
			await mkdir(testDir, { recursive: true });

			const pageContent = `
export default function Page() {
	return <div>Page without config</div>;
}`;

			await writeFile(join(testDir, 'page.tsx'), pageContent);

			const router = await scanDirectory(testDir, '/');
			const result = router.find('/', 'GET');

			expect(result.data).toBeTruthy();
			expect(result.data?.config).toBeUndefined();
		});

		test('should handle malformed route config gracefully', async () => {
			await mkdir(testDir, { recursive: true });

			const pageContent = `
export const config = "invalid config";

export default function Page() {
	return <div>Page with invalid config</div>;
}`;

			await writeFile(join(testDir, 'page.tsx'), pageContent);

			const router = await scanDirectory(testDir, '/');
			const result = router.find('/', 'GET');

			expect(result.data).toBeTruthy();
			// Should not crash, config loading should fail gracefully
		});
	});

	describe('Empty directories', () => {
		test('should handle empty directories', async () => {
			await mkdir(join(testDir, 'empty', 'nested'), { recursive: true });

			const router = await scanDirectory(testDir, '/');
			const allRoutes = router.getAllRoutes();

			expect(allRoutes).toHaveLength(0);
		});

		test('should handle non-existent directories gracefully', async () => {
			// Don't create the directory
			await expect(scanDirectory('./non-existent', '/')).rejects.toThrow();
		});
	});

	describe('Path normalization', () => {
		test('should handle different starting paths', async () => {
			await mkdir(testDir, { recursive: true });
			await writeFile(
				join(testDir, 'page.tsx'),
				'export default function Page() {}',
			);

			// Test different httpPath values
			const router1 = await scanDirectory(testDir, '/');
			const router2 = await scanDirectory(testDir, '');
			const router3 = await scanDirectory(testDir, '/app');

			expect(router1.find('/', 'GET').data).toBeTruthy();
			expect(router2.find('/', 'GET').data).toBeTruthy();
			expect(router3.find('/app', 'GET').data).toBeTruthy();
		});
	});
});
