import Image from 'next/image';

import testPng from '../images/test.png';

export default function Layout({ children }) {
	return (
		<html>
			<head>
				<title>Hello World</title>
			</head>
			<body>
				<h2>app-layout</h2>
				<Image id="app-layout" quality={85} src={testPng} />
				{children}
			</body>
		</html>
	);
}
