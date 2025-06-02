'use client';

import Image from 'next/image';

import testImage from '../../public/test.jpg';

export default function Page() {
	return (
		<>
			<h1>other app</h1>
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
		</>
	);
}
