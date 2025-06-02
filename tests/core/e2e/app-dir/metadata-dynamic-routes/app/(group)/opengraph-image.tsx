import { ImageResponse } from 'next/og';

export default function og() {
	return new ImageResponse(
		<div
			style={{
				alignItems: 'center',
				background: '#000',
				color: '#fff',
				display: 'flex',
				fontSize: 128,
				height: '100%',
				justifyContent: 'center',
				width: '100%',
			}}
		>
			group route og
		</div>,
	);
}
