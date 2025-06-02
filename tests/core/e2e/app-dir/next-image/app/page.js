import Image from 'next/image';

import testPng from '../images/test.png';
import Comp from './Comp';

export default function Page() {
	return (
		<>
			<h2>app-page</h2>
			<Image id="app-page" quality={90} src={testPng} />
			<Image
				height="200"
				id="remote-app-page"
				quality={90}
				src="https://image-optimization-test.vercel.app/test.jpg"
				width="200"
			/>
			<Comp />
		</>
	);
}

export const runtime = 'edge';
