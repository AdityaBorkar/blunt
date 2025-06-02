import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';

import testImage from '../public/test.jpg';

export default function Page(_props) {
	return (
		<div>
			<Image alt="test" placeholder="blur" src={testImage} />
		</div>
	);
}

export function getServerSideProps() {
	try {
		// this should be included in the trace since it's not an
		// import
		fs.readFileSync(path.join(process.cwd(), 'public/another.jpg'));
	} catch (_) {}

	return {
		props: {},
	};
}
