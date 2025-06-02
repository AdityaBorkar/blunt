import { font1 } from '../../fonts';

export default function Root({ children }) {
	return (
		<html>
			<head>
				<title>Hello World</title>
			</head>
			<body>
				<p className={font1.className} id="root-layout">
					{JSON.stringify(font1)}
				</p>
				{children}
			</body>
		</html>
	);
}
