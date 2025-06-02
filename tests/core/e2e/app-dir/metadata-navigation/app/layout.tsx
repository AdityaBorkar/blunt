export default function Layout({ children }) {
	return (
		<html>
			<head></head>
			<body>{children}</body>
		</html>
	);
}

export const metadata = {
	description: 'this is the layout description',
	keywords: ['nextjs', 'react'],
	title: 'this is the layout title',
};
