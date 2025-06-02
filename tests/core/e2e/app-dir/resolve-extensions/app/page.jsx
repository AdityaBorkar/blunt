import Image from 'next/image';

import Component from './component';
import image from './image';

export default function Page() {
	return (
		<p>
			<Image alt="hello image 1" src={image} />
			<Component />
		</p>
	);
}
