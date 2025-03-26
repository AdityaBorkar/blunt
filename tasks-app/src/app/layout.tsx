import './index.css';

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	// {/*
	// <head>
	// 	<meta charSet="UTF-8" />
	// 	<meta name="theme-color" content="#000000" />
	// 	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	// 	<link rel="shortcut icon" type="image/ico" href="/src/assets/favicon.ico" />
	// 	<title>Tasks App</title>
	// </head>
	// */}
	console.log('RootLayout');
	return <div>{children}</div>;
}
