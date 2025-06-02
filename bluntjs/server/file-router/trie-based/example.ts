import { trieBasedRouter } from './index';

/**
 * Example usage of the trie-based router
 */
async function _demonstrateTrieRouter() {
	// Initialize the router with the app directory
	const router = trieBasedRouter({
		// Optional: exclude patterns
		exclude: ['**/*.test.*', '**/*.spec.*'],
		// Optional: include specific directories
		include: ['src/app'],
		rootDir: 'src/app',
	});

	// Build the route trie by scanning the filesystem
	const _routeTrie = await router.buildRouteTrie();
	console.log('Route trie built successfully');

	// Example paths to match
	const testPaths = [
		'/',
		'/dashboard',
		'/dashboard/settings',
		'/products/123',
		'/blog/2023/article-slug',
		'/api/users',
	];

	// Match each path
	for (const path of testPaths) {
		console.log(`\nMatching path: ${path}`);

		const match = router.matchRoute(path);
		console.log('Match result:', match.node ? 'Found' : 'Not found');
		console.log('Params:', match.params);

		// Resolve all components for this route
		const components = router.resolveRouteComponents(path);
		console.log('Page:', components.page || 'N/A');
		console.log('Layouts:', components.layouts);
		console.log('Loading:', components.loading || 'N/A');
		console.log('Error:', components.error || 'N/A');
		console.log('Not Found:', components.notFound || 'N/A');
	}
}

// Uncomment to run the demonstration
// demonstrateTrieRouter().catch(console.error);

/**
 * Example structure that this router can handle:
 *
 * src/app/
 * ├── layout.tsx             (root layout)
 * ├── page.tsx               (home page)
 * ├── dashboard/
 * │   ├── layout.tsx         (dashboard layout)
 * │   ├── page.tsx           (dashboard index)
 * │   └── settings/
 * │       └── page.tsx       (settings page)
 * ├── products/
 * │   ├── [id]/              (dynamic segment)
 * │   │   └── page.tsx       (product detail)
 * │   └── page.tsx           (products listing)
 * ├── blog/
 * │   ├── [...slug]/         (catch-all route)
 * │   │   └── page.tsx       (blog post)
 * │   └── page.tsx           (blog index)
 * ├── api/
 * │   └── users/
 * │       └── route.ts       (API route)
 * └── (auth)/                (route group)
 *     ├── login/
 *     │   └── page.tsx       (login page)
 *     └── register/
 *         └── page.tsx       (register page)
 */
