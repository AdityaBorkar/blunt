import Image from 'next/image';

import testJpg from './test.jpg';

export default function NestedLayout({ children }) {
	return (
		<>
			<h2>app-nested-layout</h2>
			<Image id="app-nested-layout" quality={70} src={testJpg} />
			{children}
		</>
	);
}
