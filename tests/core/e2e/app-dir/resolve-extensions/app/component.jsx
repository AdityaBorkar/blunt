'use client';

import Image from 'next/image';

import image from './image';

export default function Component() {
	return (
		<p>
			<Image alt="hello image 2" src={image} />
			hello world
			{typeof window !== 'undefined' ? 'hello client' : 'hello server'}
		</p>
	);
}
