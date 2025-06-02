import { ImageResponse } from 'next/og';

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
