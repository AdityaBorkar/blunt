import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'About Acme';
export const size = {
	height: 630,
	width: 1200,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
	return new ImageResponse(
		// ImageResponse JSX element
		<div
			style={{
				alignItems: 'center',
				background: 'white',
				display: 'flex',
				fontSize: 128,
				height: '100%',
				justifyContent: 'center',
				width: '100%',
			}}
		>
			About Acme
		</div>,
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
		},
	);
}
