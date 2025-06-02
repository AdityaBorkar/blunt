import { ImageResponse } from 'next/og';

export const contentType = 'image/png';

export default async function og() {
	const font = await fetch(
		new URL('../../assets/typewr__.ttf', import.meta.url),
	).then((res) => res.arrayBuffer());
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
			Typewriter og
		</div>,
		{
			fonts: [
				{
					data: font,
					name: 'Typewriter',
					style: 'normal',
				},
			],
		},
	);
}

export const runtime = 'edge';
