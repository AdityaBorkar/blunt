import Head from 'next/head';

export default () => {
	return (
		<div>
			<Head>
				<meta charSet="iso-8859-5" />
				<meta content="width=device-width,initial-scale=1" name="viewport" />
				<meta content="head title" name="title" />
			</Head>
			<p>next/head should be placed above the document/head.</p>
		</div>
	);
};
