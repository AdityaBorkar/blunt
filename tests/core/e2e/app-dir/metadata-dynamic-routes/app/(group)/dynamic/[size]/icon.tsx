import { ImageResponse } from 'next/og';

export async function generateImageMetadata({ params }) {
	return [
		{
			contentType: 'image/png',
			id: 'small',
			size: { height: 48, width: 48 },
		},
		{
			contentType: 'image/png',
			id: 'medium',
			size: { height: 72, width: 72 },
		},
	];
}

export default function icon({ params, id }) {
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
			Icon {params.size} {id}
		</div>,
	);
}
