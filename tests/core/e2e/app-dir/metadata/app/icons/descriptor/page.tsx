export default function page() {
	return 'icons';
}

export const metadata = {
	icons: {
		apple: [
			{ url: '/apple-icon.png' },
			{ sizes: '180x180', type: 'image/png', url: '/apple-icon-x3.png' },
		],
		icon: [
			{ url: '/icon.png' },
			new URL('/icon.png', 'https://example.com'),
			{ rel: 'apple-touch-icon', url: '/icon2.png' }, // override icon rel
		],
		other: [
			{
				rel: 'other-touch-icon',
				url: '/other-touch-icon.png',
			},
		],
		shortcut: ['/shortcut-icon.png'],
	},
};
