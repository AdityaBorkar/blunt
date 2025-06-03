export function getPathname() {
	if (typeof window !== 'undefined') {
		globalThis.bluntjs.pathname = window.location.pathname;
	} else {
		globalThis.bluntjs.pathname = 'WIP';
	}

	return bluntjs.pathname;
}
