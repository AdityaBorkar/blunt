export default function Layout({ children, header }) {
	return (
		<html>
			<head></head>
			<body>
				{header}
				{children}
			</body>
		</html>
	);
}

export const metadata = {
	description: 'this is the layout description',
	keywords: ['nextjs', 'react'],
	title: 'Home Layout',
};
