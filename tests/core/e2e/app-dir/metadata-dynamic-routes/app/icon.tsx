import { ImageResponse } from 'next/og';

export const contentType = 'image/png';
export const size = { height: 512, width: 512 };

export default function icon() {
	return new ImageResponse(
		<div
			style={{
				alignItems: 'center',
				background: '#fff',
				color: '#000',
				display: 'flex',
				fontSize: 88,
				height: '100%',
				justifyContent: 'center',
				width: '100%',
			}}
		>
			Icon
		</div>,
	);
}
