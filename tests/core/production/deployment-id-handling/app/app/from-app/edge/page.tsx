'use client';

import Image from 'next/image';

import testImage from '../../../public/test.jpg';

export default function Page() {
	return (
		<>
			<p>hello app edge</p>
			<Image alt="test" src={testImage} />
			<p id="deploymentId">{process.env.NEXT_DEPLOYMENT_ID}</p>

			<button
				id="dynamic-import"
				onClick={() => {
					import('../../../data').then((mod) => {
						console.log('loaded data', mod);
					});
				}}
			>
				click me
			</button>
		</>
	);
}

export const runtime = 'edge';
export const preferredRegion = 'iad1';
