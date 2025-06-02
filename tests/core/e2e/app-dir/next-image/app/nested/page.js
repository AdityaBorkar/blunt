import Image from 'next/image';

import Comp from './Comp';
import testJpg from './test.jpg';

export default function NestedPage() {
	return (
		<div>
			<h2>app-nested-page</h2>
			<Image id="app-nested-page" quality={75} src={testJpg} />
			<Comp />
		</div>
	);
}
