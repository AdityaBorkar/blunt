export function AnalysisPage() {
	// Mock analysis data - in real implementation, this would come from actual page analysis
	const currentPageData = {
		method: 'GET',
		renderTime: 2.4,
		renderType: 'UI Rendered',
		route: '/',
		status: 200,
		timestamp: new Date().toISOString(),
	};

	const headTags = [
		{ content: 'Blunt.js Debugger', tag: 'title' },
		{ attributes: { charset: 'UTF-8' }, tag: 'meta' },
		{
			attributes: {
				content: 'width=device-width, initial-scale=1.0',
				name: 'viewport',
			},
			tag: 'meta',
		},
		{
			attributes: {
				content: 'Performance-first React framework built on Bun',
				name: 'description',
			},
			tag: 'meta',
		},
		{
			attributes: { content: 'Blunt.js Debugger', property: 'og:title' },
			tag: 'meta',
		},
		{ attributes: { content: 'website', property: 'og:type' }, tag: 'meta' },
	];

	const metadata = {
		author: 'Blunt.js Team',
		description: 'Performance-first React framework built on Bun',
		keywords: ['blunt.js', 'react', 'bun', 'performance'],
		'og:title': 'Blunt.js Debugger',
		'og:type': 'website',
		'og:url': 'http://localhost:3000',
		robots: 'index, follow',
		title: 'Blunt.js Debugger',
	};

	const pageSettings = {
		botDetection: false,
		edge: true,
		ppr: false,
		spa: false,
		ssr: false,
		streaming: false,
		timeout: 60,
	};

	const performanceMetrics = {
		bundleSize: '24.3KB',
		cls: 0.02,
		fcp: 89.2,
		fid: 2.1,
		lcp: 156.7,
		ttfb: 12.3,
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-2xl text-white">Analysis</h1>
				<div className="flex items-center space-x-2">
					<div className="h-2 w-2 rounded-full bg-green-500"></div>
					<span className="text-dark-300 text-sm">Live Analysis</span>
				</div>
			</div>

			{/* Current Page Analysis */}
			<div className="rounded-lg bg-dark-900 p-6">
				<h2 className="mb-4 font-semibold text-white text-xl">Current Page</h2>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="space-y-4">
						<div className="flex items-center justify-between rounded bg-dark-800 p-3">
							<span className="text-dark-300">Render Type</span>
							<span
								className={`rounded px-2 py-1 font-semibold text-xs ${
									currentPageData.renderType === 'UI Rendered'
										? 'bg-green-900 text-green-300'
										: 'bg-blue-900 text-blue-300'
								}`}
							>
								{currentPageData.renderType}
							</span>
						</div>
						<div className="flex items-center justify-between rounded bg-dark-800 p-3">
							<span className="text-dark-300">Render Time</span>
							<span className="font-mono text-green-400">
								{currentPageData.renderTime}ms
							</span>
						</div>
						<div className="flex items-center justify-between rounded bg-dark-800 p-3">
							<span className="text-dark-300">Route</span>
							<code className="font-mono text-blue-400">
								{currentPageData.route}
							</code>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between rounded bg-dark-800 p-3">
							<span className="text-dark-300">Method</span>
							<span className="font-mono text-orange-400">
								{currentPageData.method}
							</span>
						</div>
						<div className="flex items-center justify-between rounded bg-dark-800 p-3">
							<span className="text-dark-300">Status</span>
							<span
								className={`font-mono ${
									currentPageData.status === 200
										? 'text-green-400'
										: 'text-red-400'
								}`}
							>
								{currentPageData.status}
							</span>
						</div>
						<div className="flex items-center justify-between rounded bg-dark-800 p-3">
							<span className="text-dark-300">Timestamp</span>
							<span className="font-mono text-dark-200 text-sm">
								{new Date(currentPageData.timestamp).toLocaleTimeString()}
							</span>
						</div>
					</div>

					<div className="space-y-4">
						<div className="rounded bg-dark-800 p-3">
							<div className="mb-2 text-dark-300 text-sm">Bundle Size</div>
							<div className="font-bold text-2xl text-blue-400">
								{performanceMetrics.bundleSize}
							</div>
						</div>
						<div className="rounded bg-dark-800 p-3">
							<div className="mb-2 text-dark-300 text-sm">LCP Score</div>
							<div className="font-bold text-2xl text-green-400">
								{performanceMetrics.lcp}ms
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Head Tags */}
			<div className="rounded-lg bg-dark-900 p-6">
				<h2 className="mb-4 font-semibold text-white text-xl">Head Tags</h2>
				<div className="space-y-3">
					{headTags.map((tag, index) => (
						<div className="rounded bg-dark-800 p-3" key={index}>
							<div className="flex items-start space-x-3">
								<span className="rounded bg-purple-900 px-2 py-1 font-mono text-purple-300 text-xs">
									{tag.tag}
								</span>
								<div className="flex-1">
									{tag.content && (
										<div className="font-mono text-sm text-white">
											{tag.content}
										</div>
									)}
									{tag.attributes && (
										<div className="mt-1 space-y-1">
											{Object.entries(tag.attributes).map(([key, value]) => (
												<div className="text-dark-300 text-sm" key={key}>
													<span className="text-yellow-400">{key}</span>
													<span className="mx-2 text-dark-400">=</span>
													<span className="text-green-400">"{value}"</span>
												</div>
											))}
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Metadata */}
			<div className="rounded-lg bg-dark-900 p-6">
				<h2 className="mb-4 font-semibold text-white text-xl">Metadata</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{Object.entries(metadata).map(([key, value]) => (
						<div
							className="flex items-center justify-between rounded bg-dark-800 p-3"
							key={key}
						>
							<span className="font-mono text-blue-400 text-sm">{key}</span>
							<span className="max-w-xs truncate text-dark-200 text-sm">
								{Array.isArray(value) ? value.join(', ') : String(value)}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Page Settings */}
			<div className="rounded-lg bg-dark-900 p-6">
				<h2 className="mb-4 font-semibold text-white text-xl">Page Settings</h2>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
					{Object.entries(pageSettings).map(([key, value]) => (
						<div className="rounded bg-dark-800 p-3 text-center" key={key}>
							<div className="mb-1 text-dark-300 text-sm capitalize">{key}</div>
							<div
								className={`font-semibold text-lg ${
									typeof value === 'boolean'
										? value
											? 'text-green-400'
											: 'text-red-400'
										: 'text-blue-400'
								}`}
							>
								{typeof value === 'boolean'
									? value
										? 'On'
										: 'Off'
									: String(value)}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Performance Metrics */}
			<div className="rounded-lg bg-dark-900 p-6">
				<h2 className="mb-4 font-semibold text-white text-xl">
					Performance Metrics
				</h2>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
					<div className="rounded bg-dark-800 p-4">
						<div className="text-dark-300 text-sm">TTFB</div>
						<div className="font-bold text-2xl text-green-400">
							{performanceMetrics.ttfb}ms
						</div>
						<div className="text-dark-400 text-xs">Time to First Byte</div>
					</div>
					<div className="rounded bg-dark-800 p-4">
						<div className="text-dark-300 text-sm">FCP</div>
						<div className="font-bold text-2xl text-blue-400">
							{performanceMetrics.fcp}ms
						</div>
						<div className="text-dark-400 text-xs">First Contentful Paint</div>
					</div>
					<div className="rounded bg-dark-800 p-4">
						<div className="text-dark-300 text-sm">LCP</div>
						<div className="font-bold text-2xl text-yellow-400">
							{performanceMetrics.lcp}ms
						</div>
						<div className="text-dark-400 text-xs">
							Largest Contentful Paint
						</div>
					</div>
					<div className="rounded bg-dark-800 p-4">
						<div className="text-dark-300 text-sm">FID</div>
						<div className="font-bold text-2xl text-green-400">
							{performanceMetrics.fid}ms
						</div>
						<div className="text-dark-400 text-xs">First Input Delay</div>
					</div>
					<div className="rounded bg-dark-800 p-4">
						<div className="text-dark-300 text-sm">CLS</div>
						<div className="font-bold text-2xl text-green-400">
							{performanceMetrics.cls}
						</div>
						<div className="text-dark-400 text-xs">Cumulative Layout Shift</div>
					</div>
				</div>
			</div>
		</div>
	);
}
