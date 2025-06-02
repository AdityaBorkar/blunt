import { ImageResponse } from 'next/og';

/* without generateImageMetadata */
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

export const revalidate = 5;
