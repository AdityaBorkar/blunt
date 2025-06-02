export function typeofFile(fileName: string): FileType['type'] | 'unknown' {
	const nameParts = fileName.split('.');
	const ext = nameParts.pop() || '';
	const name = nameParts.join('.');

	if (name === 'file') return 'file';
	if (!['ts', 'tsx', 'js', 'jsx'].includes(ext)) return 'unknown';

	// React Based Files
	if (name === 'page') return 'page';
	if (name === 'layout') return 'layout';
	if (name === 'loading') return 'loading';
	if (name === 'template') return 'template';
	if (name === 'error') return 'error';

	// API Based Files
	if (name === 'route') return 'route';
	if (name === 'middleware') return 'middleware';

	// Common Files
	if (name === 'not-found') return 'not-found';
	// Special Files. Can exist only in the root directory.
	// "sitemap"
	// "robots"
	// "manifest"
	return 'unknown';
}
