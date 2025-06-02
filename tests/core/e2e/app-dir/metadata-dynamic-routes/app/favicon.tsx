// This file should be ignored
import { ImageResponse } from 'next/og';

export default function favicon() {
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
			Favicon
		</div>,
	);
}
