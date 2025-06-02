import Image, { type ImageProps } from 'next/image';

export default () => {
	const props: ImageProps = {
		alt: 'test-width-height',
		height: 100,
		src: '/noop.jpg',
		width: 100,
	};

	const filledProps: ImageProps = {
		alt: 'test-fill-true',
		fill: true,
		src: '/noop.jpg',
	};

	return (
		<>
			<Image {...props} />
			<Image {...filledProps} />
		</>
	);
};
