export function RouterPage() {
	// Mock trie router data - in real implementation, this would come from the actual trie router
	const mockTrieData = {
		root: {
			children: [
				{
					children: [
						{ method: 'GET', path: '/api/users', type: 'route' },
						{ method: 'POST', path: '/api/users', type: 'route' },
						{ method: 'GET', path: '/api/users/[id]', type: 'route' },
					],
					method: 'GET',
					path: '/api',
					type: 'route',
				},
				{
					children: [],
					method: 'GET',
					path: '/about',
					type: 'page',
				},
				{
					children: [
						{ method: 'GET', path: '/blog/[slug]', type: 'page' },
						{ method: 'GET', path: '/blog/[...slug]', type: 'page' },
					],
					method: 'GET',
					path: '/blog',
					type: 'page',
				},
			],
			method: 'GET',
			path: '/',
			type: 'page',
		},
	};

	const routeStats = {
		apiRoutes: 3,
		catchAllRoutes: 1,
		dynamicRoutes: 3,
		pageRoutes: 5,
		totalRoutes: 8,
	};

	const renderTrieNode = (node: any, level = 0) => {
		const indent = level * 20;
		const isRoot = level === 0;

		return (
			<div className="space-y-2" key={node.path}>
				<div
					className="flex items-center space-x-3 rounded-lg bg-dark-800 p-3 transition-colors hover:bg-dark-700"
					style={{ marginLeft: `${indent}px` }}
				>
					<div className="flex items-center space-x-2">
						{!isRoot && (
							<div className="flex h-6 w-6 items-center justify-center">
								<div className="h-2 w-2 rounded-full bg-blue-500"></div>
							</div>
						)}
						<div
							className={`rounded p-1 font-mono text-xs ${
								node.type === 'page'
									? 'bg-green-900 text-green-300'
									: 'bg-blue-900 text-blue-300'
							}`}
						>
							{node.method}
						</div>
						<code className="font-mono text-sm text-white">{node.path}</code>
						<span
							className={`rounded px-2 py-1 text-xs ${
								node.type === 'page'
									? 'bg-green-900 text-green-300'
									: 'bg-orange-900 text-orange-300'
							}`}
						>
							{node.type}
						</span>
					</div>

					{node.path.includes('[') && (
						<div className="flex space-x-1">
							{node.path.includes('[...') && (
								<span className="rounded bg-purple-900 px-2 py-1 text-purple-300 text-xs">
									catch-all
								</span>
							)}
							{node.path.includes('[') && !node.path.includes('[...') && (
								<span className="rounded bg-yellow-900 px-2 py-1 text-xs text-yellow-300">
									dynamic
								</span>
							)}
						</div>
					)}
				</div>

				{node.children &&
					node.children.map((child: any) => renderTrieNode(child, level + 1))}
			</div>
		);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-2xl text-white">Router</h1>
				<div className="flex space-x-4">
					<div className="rounded-lg bg-dark-900 px-3 py-2">
						<span className="text-dark-400 text-sm">Total Routes: </span>
						<span className="font-semibold text-white">
							{routeStats.totalRoutes}
						</span>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
				<div className="rounded-lg bg-dark-900 p-4">
					<div className="font-bold text-2xl text-green-400">
						{routeStats.pageRoutes}
					</div>
					<div className="text-dark-300 text-sm">Page Routes</div>
				</div>
				<div className="rounded-lg bg-dark-900 p-4">
					<div className="font-bold text-2xl text-blue-400">
						{routeStats.apiRoutes}
					</div>
					<div className="text-dark-300 text-sm">API Routes</div>
				</div>
				<div className="rounded-lg bg-dark-900 p-4">
					<div className="font-bold text-2xl text-yellow-400">
						{routeStats.dynamicRoutes}
					</div>
					<div className="text-dark-300 text-sm">Dynamic Routes</div>
				</div>
				<div className="rounded-lg bg-dark-900 p-4">
					<div className="font-bold text-2xl text-purple-400">
						{routeStats.catchAllRoutes}
					</div>
					<div className="text-dark-300 text-sm">Catch-all Routes</div>
				</div>
			</div>

			<div className="rounded-lg bg-dark-900 p-6">
				<div className="mb-6 flex items-center justify-between">
					<h2 className="font-semibold text-white text-xl">
						Trie Router Visualization
					</h2>
					<div className="flex items-center space-x-4 text-sm">
						<div className="flex items-center space-x-2">
							<div className="h-3 w-3 rounded bg-green-500"></div>
							<span className="text-dark-300">Page</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="h-3 w-3 rounded bg-orange-500"></div>
							<span className="text-dark-300">Route</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="h-3 w-3 rounded bg-yellow-500"></div>
							<span className="text-dark-300">Dynamic</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="h-3 w-3 rounded bg-purple-500"></div>
							<span className="text-dark-300">Catch-all</span>
						</div>
					</div>
				</div>

				<div className="space-y-1">{renderTrieNode(mockTrieData.root)}</div>
			</div>

			<div className="rounded-lg bg-dark-900 p-6">
				<h2 className="mb-4 font-semibold text-white text-xl">
					Route Performance
				</h2>
				<div className="space-y-4">
					<div className="flex items-center justify-between rounded bg-dark-800 p-3">
						<span className="text-dark-300">Average Route Resolution Time</span>
						<span className="font-mono text-green-400">0.12ms</span>
					</div>
					<div className="flex items-center justify-between rounded bg-dark-800 p-3">
						<span className="text-dark-300">Trie Depth</span>
						<span className="font-mono text-blue-400">3 levels</span>
					</div>
					<div className="flex items-center justify-between rounded bg-dark-800 p-3">
						<span className="text-dark-300">Memory Usage</span>
						<span className="font-mono text-yellow-400">2.1KB</span>
					</div>
				</div>
			</div>
		</div>
	);
}
