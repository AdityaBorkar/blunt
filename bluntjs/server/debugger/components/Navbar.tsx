interface NavbarProps {
	currentPath: string;
}

export function Navbar({ currentPath }: NavbarProps) {
	const navItems = [
		{ icon: '⚙️', label: 'Settings', path: '/settings' },
		{ icon: '🔀', label: 'Router', path: '/router' },
		{ icon: '📊', label: 'Analysis', path: '/analysis' },
		{ icon: '🗄️', label: 'Database', path: '/db' },
		{ icon: '❓', label: 'Help', path: '/help' },
	];

	return (
		<nav className="border-dark-700 border-b bg-dark-900">
			<div className="container mx-auto px-6">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center space-x-8">
						<div className="flex items-center space-x-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
								<span className="font-bold text-sm text-white">B</span>
							</div>
							<h1 className="font-semibold text-white text-xl">
								Blunt.js Debugger
							</h1>
						</div>

						<div className="flex space-x-1">
							{navItems.map((item) => (
								<a
									className={`rounded-lg px-4 py-2 font-medium text-sm transition-colors ${
										currentPath === item.path
											? 'bg-blue-600 text-white'
											: 'text-dark-300 hover:bg-dark-800 hover:text-white'
									}`}
									href={`/blunt${item.path}`}
									key={item.path}
								>
									<span className="mr-2">{item.icon}</span>
									{item.label}
								</a>
							))}
						</div>
					</div>

					<div className="flex items-center space-x-4">
						<div className="text-dark-400 text-sm">
							{new Date().toLocaleTimeString()}
						</div>
						<div className="h-2 w-2 rounded-full bg-green-500"></div>
					</div>
				</div>
			</div>
		</nav>
	);
}
