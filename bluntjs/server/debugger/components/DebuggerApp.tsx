import { Navbar } from './Navbar';
import { AnalysisPage } from './pages/AnalysisPage';
import { DatabasePage } from './pages/DatabasePage';
import { HelpPage } from './pages/HelpPage';
import { RouterPage } from './pages/RouterPage';
import { SettingsPage } from './pages/SettingsPage';

interface DebuggerAppProps {
	currentPath: string;
}

export function DebuggerApp({ currentPath }: DebuggerAppProps) {
	const renderPage = () => {
		switch (currentPath) {
			case '/':
			case '/settings':
				return <SettingsPage />;
			case '/router':
				return <RouterPage />;
			case '/analysis':
				return <AnalysisPage />;
			case '/db':
				return <DatabasePage />;
			case '/help':
				return <HelpPage />;
			default:
				return <SettingsPage />;
		}
	};

	return (
		<div className="min-h-screen bg-dark-950">
			<Navbar currentPath={currentPath} />
			<main className="container mx-auto px-6 py-8">{renderPage()}</main>
		</div>
	);
}
