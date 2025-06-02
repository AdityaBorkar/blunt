export default function page() {
	return 'icons';
}

export const metadata = {
	icons: {
		apple: '/apple-icon.png',
		icon: '/icon.png',
		other: {
			media: '(prefers-color-scheme: dark)',
			rel: 'other-touch-icon',
			url: '/other-touch-icon.png',
		},
		shortcut: '/shortcut-icon.png',
	},
};
