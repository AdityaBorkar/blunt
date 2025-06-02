import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
	height: 32,
	width: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
	return new ImageResponse(
		// ImageResponse JSX element
		<div
			style={{
				alignItems: 'center',
				background: 'black',
				color: 'white',
				display: 'flex',
				fontSize: 24,
				height: '100%',
				justifyContent: 'center',
				width: '100%',
			}}
		>
			A
		</div>,
		// ImageResponse options
		{
			// For convenience, we can re-use the exported icons size metadata
			// config to also set the ImageResponse's width and height.
			...size,
		},
	);
}
