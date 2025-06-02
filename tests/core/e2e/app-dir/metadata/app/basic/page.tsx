import type { Metadata } from 'next';
import Link from 'next/link';

import Client from './client';

export default function Page() {
	return (
		<div id="basic">
			<Link href="/" id="to-index">
				to index
			</Link>
			<br />
			<Link href="/title-template/extra/inner" id="to-nested">
				to /title-template/extra/inner
			</Link>
			<Client />
		</div>
	);
}

export const metadata: Metadata = {
	alternates: {},
	applicationName: 'test',
	authors: [{ name: 'huozhi' }, { name: 'tree', url: 'https://tree.com' }],
	creator: 'shu',
	formatDetection: {
		address: false,
		email: false,
		telephone: false,
	},
	generator: 'next.js',
	keywords: ['next.js', 'react', 'javascript'],
	manifest: '/api/manifest',
	pagination: {
		next: '/basic?page=3',
		previous: '/basic?page=1',
	},
	publisher: 'vercel',
	referrer: 'origin-when-cross-origin',
	robots: 'index, follow',
};

export const viewport = {
	// visual meta tags
	colorScheme: 'dark',
	initialScale: 1,
	interactiveWidget: 'resizes-visual',
	maximumScale: 1,
	themeColor: { color: 'cyan', media: '(prefers-color-scheme: dark)' },
	// viewport meta tag
	width: 'device-width',
};
