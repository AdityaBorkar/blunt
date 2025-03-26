import { createRoot, hydrateRoot } from 'react-dom/client';

import { jsx } from './jsx';

function start() {
	const element = document.getElementById('root');
	if (!element) return;

	if (window.SSR) {
		hydrateRoot(element, jsx);
	} else {
		createRoot(element).render(jsx);
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', start);
} else {
	start();
}
