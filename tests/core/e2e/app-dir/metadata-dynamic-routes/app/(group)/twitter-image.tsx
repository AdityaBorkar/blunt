import { ImageResponse } from 'next/og';

export const alt = 'Twitter';
export const size = { height: 675, width: 1200 };

export default function twitter() {
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
			group route twitter
		</div>,
		size,
	);
}

export const runtime = 'edge';
