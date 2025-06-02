import Link from 'next/link';
import type React from 'react';

export default function Root({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<body>
				<div>
					<Link href="/foo" prefetch={false}>
						foo
					</Link>
				</div>
				<div>
					<Link href="/foo/bar" prefetch={false}>
						foo/bar
					</Link>
				</div>
				{children}
			</body>
		</html>
	);
}
