import Link from 'next/link';
import type React from 'react';

export default function Root({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<body>
				<nav>
					<div>
						<ul>
							<li>
								<Link href="/" id="go-to-index">
									Index
								</Link>
							</li>
							<li>
								<Link href="/dynamic/foo" id="go-to-dynamic">
									Dynamic page
								</Link>
							</li>
							<li>
								<Link href="/does-not-exist" id="go-to-404">
									Not found page
								</Link>
							</li>
							<li>
								<Link href="/dynamic/404" id="go-to-dynamic-404">
									Dynamic not found page
								</Link>
							</li>
						</ul>
					</div>
				</nav>
				{children}
			</body>
		</html>
	);
}
