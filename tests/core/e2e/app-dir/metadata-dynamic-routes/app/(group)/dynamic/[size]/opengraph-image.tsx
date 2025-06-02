import { ImageResponse } from 'next/og';

export const alt = 'Open Graph';

export default function og({ params }) {
	const big = params.size === 'big';
	const background = big ? 'orange' : '#000';
	return new ImageResponse(
		<div
			style={{
				alignItems: 'center',
				display: 'flex',
				fontSize: 128,
				height: '100%',
				justifyContent: 'center',
				width: '100%',
			}}
		>
			<div
				style={{
					background,
					height: 200,
					width: 200,
				}}
			/>
		</div>,
		{
			height: big === true ? 630 : 315,
			width: big === true ? 1200 : 600,
		},
	);
}
