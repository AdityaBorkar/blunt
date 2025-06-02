import { setTimeout } from 'node:timers/promises';
import { ImageResponse } from 'next/og';

export const size = { height: 32, width: 32 };
export const contentType = 'image/png';

async function fetchIconLetter() {
	'use cache';

	// Simulate I/O
	await setTimeout(100);

	return 'N';
}

export default async function Icon() {
	const letter = await fetchIconLetter();

	return new ImageResponse(
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
			{letter}
		</div>,
		{ ...size },
	);
}
