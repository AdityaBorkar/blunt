import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return {
			...initialProps,
			styles: <></>,
		};
	}

	render() {
		return (
			<Html>
				<Head>
					<meta content="https://nextjs.org/docs" property="og:url" />
					<meta content="#ffffff" name="theme-color" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
