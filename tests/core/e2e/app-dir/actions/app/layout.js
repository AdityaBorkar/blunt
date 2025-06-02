import Link from 'next/link';

export default function RootLayout({ children }) {
	return (
		<html>
			<head />
			<body>
				<div id="random-number">{Math.random()}</div>
				<div>
					<div>
						<Link href="/client" id="navigate-client">
							Client
						</Link>
					</div>
					<div>
						<Link href="/server" id="navigate-server">
							Server
						</Link>
					</div>
					<div>
						<Link href="/revalidate" id="navigate-revalidate">
							Client and Server
						</Link>
					</div>
				</div>
				{children}
			</body>
		</html>
	);
}
