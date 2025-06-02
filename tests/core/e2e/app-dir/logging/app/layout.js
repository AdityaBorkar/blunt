import Link from 'next/link';

export const fetchCache = 'default-cache';

export default function Layout({ children }) {
	return (
		<html>
			<body>
				<header>
					<Link href={'/link'} id="nav-link">
						/link
					</Link>
					<br />
					<Link href={'/headers'} id="nav-headers">
						/headers
					</Link>
					<br />
					<Link href={'/default-cache'} id="nav-default-cache">
						/default-cache
					</Link>
					<br />
					<Link href={'/cache-revalidate'} id="nav-cache-revalidate">
						/cache-revalidate
					</Link>
					<br />
					<Link href={'/many-requests'} id="nav-many-requests">
						/many-requests
					</Link>
					<br />
				</header>
				<div>{children}</div>
			</body>
		</html>
	);
}
