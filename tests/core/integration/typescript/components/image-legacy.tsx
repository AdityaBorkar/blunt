import Image, { type ImageProps } from 'next/legacy/image';

export default () => {
	const props: ImageProps = {
		alt: 'test-width-height',
		height: 100,
		src: '/noop.jpg',
		width: 100,
	};

	const filledProps: ImageProps = {
		alt: 'test-layout-fill',
		layout: 'fill',
		src: '/noop.jpg',
	};

	return (
		<>
			<Image {...props} />
			<Image {...filledProps} />
		</>
	);
};
