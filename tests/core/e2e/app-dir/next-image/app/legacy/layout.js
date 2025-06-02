import Image from 'next/legacy/image';

import testPng from '../../images/test.png';

export default function LegacyLayout({ children }) {
	return (
		<>
			<h2>app-legacy-layout</h2>
			<Image id="app-legacy-layout" loading="eager" src={testPng} />
			{children}
		</>
	);
}
