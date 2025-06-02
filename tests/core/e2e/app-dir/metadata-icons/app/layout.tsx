import type { ReactNode } from 'react';

export default function Root({ children }: { children: ReactNode }) {
	return (
		<html>
			<body>{children}</body>
		</html>
	);
}

export const metadata = {
	icons: {
		apple: '/apple-icon.png',
		other: {
			rel: 'apple-touch-icon-precomposed',
			url: '/apple-touch-icon-precomposed.png',
		},
		shortcut: '/shortcut-icon.png',
	},
};
