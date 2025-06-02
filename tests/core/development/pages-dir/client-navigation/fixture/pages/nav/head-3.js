import Head from 'next/head';
import Link from 'next/link';

export default (_props) => (
	<div id="head-3">
		<Head>
			<meta content="Head Three" name="description" />
			<title></title>
		</Head>
		<Link href="/nav/head-1" id="to-head-1">
			to head 1
		</Link>
	</div>
);
