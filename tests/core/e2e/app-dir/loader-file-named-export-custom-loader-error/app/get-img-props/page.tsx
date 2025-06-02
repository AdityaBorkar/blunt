import { getImageProps } from 'next/image';

export default function Page() {
	const { props: imageProps } = getImageProps({
		alt: 'logo',
		height: '400',
		id: 'logo',
		src: '/logo.png',
		width: '400',
	});

	return (
		<div>
			<img {...imageProps} />
		</div>
	);
}
