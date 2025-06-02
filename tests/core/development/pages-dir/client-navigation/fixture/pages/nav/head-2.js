import Head from 'next/head';
import Link from 'next/link';

export default (_props) => (
	<div id="head-2">
		<Head>
			<meta content="Head Two" name="description" />
			<title>this is head-2</title>
		</Head>
		<Link href="/nav/head-1" id="to-head-1">
			to head 1
		</Link>
	</div>
);
