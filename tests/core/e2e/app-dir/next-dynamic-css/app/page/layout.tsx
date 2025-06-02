import type { ReactNode } from 'react';
import './global.css';

import Inner from './inner';
import server from './server.module.css';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<p className={`global-class ${server.class}`} id="server">
				Hello Server
			</p>
			<Inner />
			{children}
		</>
	);
}
