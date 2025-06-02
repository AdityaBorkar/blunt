export default function Layout({
	children,
	slot,
}: {
	children: React.ReactNode;
	slot: React.ReactNode;
}) {
	return (
		<html className="layout" lang="en">
			<body>
				{children}
				{slot}
			</body>
		</html>
	);
}

export const metadata = {
	title: 'layout title',
};
