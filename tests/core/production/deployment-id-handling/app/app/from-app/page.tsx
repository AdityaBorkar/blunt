'use client';

import Image from 'next/image';
import Link from 'next/link';

import testImage from '../../public/test.jpg';

export default function Page() {
	return (
		<>
			<p>hello app</p>
			<Image alt="test" src={testImage} />
			<p id="deploymentId">{process.env.NEXT_DEPLOYMENT_ID}</p>

			<button
				id="dynamic-import"
				onClick={() => {
					import('../../data').then((mod) => {
						console.log('loaded data', mod);
					});
				}}
			>
				click me
			</button>
			<Link href="/other-app" id="other-app">
				other app
			</Link>
		</>
	);
}
