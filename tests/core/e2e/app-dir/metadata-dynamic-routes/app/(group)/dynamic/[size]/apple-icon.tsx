import { ImageResponse } from 'next/og';

// without id
export async function generateImageMetadata({ params }) {
	return [
		{
			contentType: 'image/png',
			size: { height: 48, width: 48 },
		},
		{
			contentType: 'image/png',
			size: { height: 64, width: 64 },
		},
	];
}

export default function icon({ params, id }) {
	return new ImageResponse(
		<div
			style={{
				alignItems: 'center',
				background: '#000',
				color: '#fafafa',
				display: 'flex',
				fontSize: 88,
				height: '100%',
				justifyContent: 'center',
				width: '100%',
			}}
		>
			Apple {params.size} {id}
		</div>,
	);
}
