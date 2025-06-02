import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const contentType = 'image/png';

export default async function og() {
	const font = await fs.promises.readFile(
		path.join(process.cwd(), 'assets/typewr__.ttf'),
	);
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

export const runtime = 'nodejs';
