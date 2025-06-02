'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	// We export these so that we can access them from tests
	useEffect(() => {
		// @ts-ignore
		window.router = router;
		// @ts-ignore
		window.React = React;
	}, [router]);

	return (
		<html>
			<head></head>
			<body
				style={{
					margin: 0,
				}}
			>
				<div
					style={{
						left: 0,
						position: 'fixed',
						top: 0,
					}}
				>
					<Link href="1" id="to-vertical-page" />
				</div>
				{children}
			</body>
		</html>
	);
}
