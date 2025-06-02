import type { ReactNode } from 'react';
export default function Root({ children }: { children: ReactNode }) {
	return (
		<html>
			<body
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					margin: 0,
					padding: 0,
					width: 300,
				}}
			>
				{children}
			</body>
		</html>
	);
}
