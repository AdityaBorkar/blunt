import { ImageResponse } from 'next/og';

export const alt = 'Open Graph';

export async function generateImageMetadata() {
	return [
		{
			contentType: 'image/png',
			id: 100,
			size: { height: 600, width: 1200 },
		},
		{
			contentType: 'image/png',
			id: 101,
			size: { height: 600, width: 1200 },
		},
	];
}

export default function og() {
	return new ImageResponse(
		<div
			style={{
				alignItems: 'center',
				background: 'lavender',
				display: 'flex',
				fontSize: 128,
				height: '100%',
				justifyContent: 'center',
				width: '100%',
			}}
		>
			Open Graph
		</div>,
	);
}
