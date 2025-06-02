import { ImageResponse } from 'next/og';

export const alt = 'About Acme';
export const size = { height: 630, width: 1200 };
export const contentType = 'image/png';

async function fetchPostData() {
	'use cache';

	return { created: Date.now(), title: 'Test' };
}

export default async function Image() {
	const post = await fetchPostData();

	return new ImageResponse(
		<div
			style={{
				alignItems: 'center',
				background: 'white',
				display: 'flex',
				flexDirection: 'column',
				fontSize: 48,
				height: '100%',
				justifyContent: 'center',
				width: '100%',
			}}
		>
			<h1>{post.title}</h1>
			<p style={{ fontSize: 32 }}>
				{new Date(post.created).toLocaleTimeString()}
			</p>
		</div>,
		size,
	);
}
