import Image from 'next/image';

import testImage from '../public/test.jpg';

export default function Page({ data }: { data: string }) {
	return (
		<>
			<h1>{data}</h1>
			<Image alt="test image" src={testImage} />
			<p id="deploymentId">{process.env.NEXT_DEPLOYMENT_ID}</p>

			<button
				id="dynamic-import"
				onClick={() => {
					import('../data').then((mod) => {
						console.log('loaded data', mod);
					});
				}}
			>
				click me
			</button>
		</>
	);
}

export const config = {
	runtime: 'experimental-edge',
};

export function getServerSideProps() {
	return {
		props: {
			data: 'hello pages edge',
		},
	};
}
