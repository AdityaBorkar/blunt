import { ImageResponse } from 'next/og';

export default function OpenGraphImage() {
	return new ImageResponse(
		<div
			style={{
				alignItems: 'center',
				backgroundColor: '#000',
				color: '#fff',
				display: 'flex',
				flexDirection: 'column',
				fontFamily: 'sans-serif',
				height: 630,
				justifyContent: 'center',
				width: 1200,
			}}
		>
			OG
		</div>,
	);
}
