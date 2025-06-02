export default function Layout({ children }) {
	return (
		<html>
			<head></head>
			<body>{children}</body>
		</html>
	);
}

export const metadata = {
	alternates: {
		canonical: './',
	},
	description: 'This is a Next.js App',
	metadataBase: new URL('https://mydomain.com'),
	title: 'Next.js App',
	twitter: {
		cardType: 'summary_large_image',
		description: 'Twitter - This is a Next.js App',
		title: 'Twitter - Next.js App',
	},
};
