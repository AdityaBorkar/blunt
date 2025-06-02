import Link from 'next/link';

import RenderValues from './render-values';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<head />
			<body>
				<RenderValues prefix="root" />
				<Link href="/segment-name/param1/different-segment" id="change-static">
					Change static
				</Link>
				<Link
					href="/segment-name/param1/segment-name2/different-value/value3/value4"
					id="change-param"
				>
					Change param
				</Link>
				<Link
					href="/segment-name/param1/segment-name2/value2/different/random/paths"
					id="change-catchall"
				>
					Change param
				</Link>
				{children}
			</body>
		</html>
	);
}
