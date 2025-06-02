import Image from 'next/image';

import testImage from '../public/test.jpg';

export default function Page(props) {
	return (
		<div>
			<h1>{props.header}</h1>
			<Image alt="test" placeholder="blur" src={testImage} />
		</div>
	);
}

export function getServerSideProps() {
	const header = process.env.SSG_ROUTE_ENV_VAR_HEADER_TEXT
		? process.env.SSG_ROUTE_ENV_VAR_HEADER_TEXT
		: 'Hello';

	return {
		props: {
			header,
		},
	};
}
