// @ts-ignore
import { ImageResponse as ImageResponse2 } from '@vercel/og';
import { ImageResponse } from 'next/og';

// Edge: Using @vercel/og external package, and should be aliased to "next/server" ImageResponse
// @ts-ignore
if (ImageResponse2.displayName !== ImageResponse.displayName)
	// @ts-ignore
	throw new Error(`ImageResponse2 mismatch: ${ImageResponse2.displayName}`);

export const alt = 'Twitter';
export const size = { height: 900, width: 1600 };

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
			Twitter Image
		</div>,
		size,
	);
}

export const runtime = 'edge';
