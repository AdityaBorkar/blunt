import { useState } from 'react';

export function SettingsPage() {
	const [activeTab, setActiveTab] = useState<'config' | 'account' | 'toolbar'>(
		'config',
	);

	const tabs = [
		{ icon: '⚙️', id: 'config' as const, label: 'Config' },
		{ icon: '👤', id: 'account' as const, label: 'Account' },
		{ icon: '🧰', id: 'toolbar' as const, label: 'Toolbar' },
	];

	// Mock project config data - in real implementation, this would come from project-config.ts
	const projectConfig = {
		build: {
			analyze: true,
			bundler: 'bun',
			cloud: 'vercel',
			compress: 'gzip',
			linter: 'biome',
			minify: true,
			sourcemap: false,
		},
		pages: {
			botDetection: false,
			edge: true,
			ppr: false,
			spa: false,
			ssr: false,
			streaming: false,
			timeout: 60,
		},
		react: {
			compiler: false,
			profiler: false,
			strictMode: true,
		},
		server: {
			host: 'localhost',
			outDir: 'dist',
			port: 3000,
		},
	};

	const envVars = {
		BUN_VERSION: '1.0.0',
		HOST: 'localhost',
		NODE_ENV: 'development',
		PORT: '3000',
	};

	const renderConfigTab = () => (
		<div className="space-y-6">
			<div className="rounded-lg bg-dark-900 p-6">
				<h3 className="mb-4 font-semibold text-lg text-white">
					Project Configuration
				</h3>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{Object.entries(projectConfig).map(([key, value]) => (
						<div className="space-y-2" key={key}>
							<h4 className="font-medium text-blue-400 text-sm uppercase tracking-wide">
								{key}
							</h4>
							<div className="rounded bg-dark-800 p-3">
								<pre className="whitespace-pre-wrap text-dark-200 text-sm">
									{JSON.stringify(value, null, 2)}
								</pre>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="rounded-lg bg-dark-900 p-6">
				<h3 className="mb-4 font-semibold text-lg text-white">
					Environment Variables
				</h3>
				<div className="space-y-3">
					{Object.entries(envVars).map(([key, value]) => (
						<div
							className="flex items-center justify-between rounded bg-dark-800 p-3"
							key={key}
						>
							<span className="font-mono text-green-400 text-sm">{key}</span>
							<span className="font-mono text-dark-200 text-sm">{value}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);

	const renderAccountTab = () => (
		<div className="rounded-lg bg-dark-900 p-6">
			<h3 className="mb-4 font-semibold text-lg text-white">
				Account Settings
			</h3>
			<div className="space-y-4">
				<div className="flex items-center space-x-4">
					<div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
						<span className="font-bold text-white text-xl">U</span>
					</div>
					<div>
						<h4 className="font-medium text-white">Developer</h4>
						<p className="text-dark-400 text-sm">Local Development Account</p>
					</div>
				</div>

				<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<label
							className="font-medium text-dark-300 text-sm"
							htmlFor="username"
						>
							Username
						</label>
						<input
							className="w-full rounded border border-dark-700 bg-dark-800 p-3 text-white"
							disabled
							id="username"
							type="text"
							value="developer"
						/>
					</div>
					<div className="space-y-2">
						<label className="font-medium text-dark-300 text-sm" htmlFor="role">
							Role
						</label>
						<input
							className="w-full rounded border border-dark-700 bg-dark-800 p-3 text-white"
							disabled
							id="role"
							type="text"
							value="Local Developer"
						/>
					</div>
				</div>
			</div>
		</div>
	);

	const renderToolbarTab = () => (
		<div className="rounded-lg bg-dark-900 p-6">
			<h3 className="mb-4 font-semibold text-lg text-white">
				Toolbar Settings
			</h3>
			<div className="space-y-6">
				<div className="space-y-3">
					<label
						className="font-medium text-dark-300 text-sm"
						htmlFor="toolbar-position"
					>
						Position
					</label>
					<select
						className="w-full rounded border border-dark-700 bg-dark-800 p-3 text-white"
						id="toolbar-position"
					>
						<option value="bottom-center">Bottom Center</option>
						<option value="bottom-left">Bottom Left</option>
						<option value="bottom-right">Bottom Right</option>
						<option value="top-center">Top Center</option>
					</select>
				</div>

				<div className="space-y-3">
					<label className="flex items-center space-x-2">
						<input className="rounded" defaultChecked type="checkbox" />
						<span className="text-dark-300">Show performance metrics</span>
					</label>
					<label className="flex items-center space-x-2">
						<input className="rounded" defaultChecked type="checkbox" />
						<span className="text-dark-300">Show route information</span>
					</label>
					<label className="flex items-center space-x-2">
						<input className="rounded" type="checkbox" />
						<span className="text-dark-300">Auto-hide toolbar</span>
					</label>
				</div>
			</div>
		</div>
	);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-2xl text-white">Settings</h1>
			</div>

			<div className="border-dark-700 border-b">
				<div className="flex space-x-8">
					{tabs.map((tab) => (
						<button
							className={`border-b-2 px-1 py-4 font-medium text-sm transition-colors ${
								activeTab === tab.id
									? 'border-blue-500 text-blue-400'
									: 'border-transparent text-dark-400 hover:text-dark-300'
							}`}
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							type="button"
						>
							<span className="mr-2">{tab.icon}</span>
							{tab.label}
						</button>
					))}
				</div>
			</div>

			<div className="mt-6">
				{activeTab === 'config' && renderConfigTab()}
				{activeTab === 'account' && renderAccountTab()}
				{activeTab === 'toolbar' && renderToolbarTab()}
			</div>
		</div>
	);
}
