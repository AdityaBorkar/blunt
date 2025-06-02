import Head from 'next/head';
import Link from 'next/link';

export default (_props) => (
	<div id="head-1">
		<Head>
			<meta content="Head One" name="description" />
			<title>this is head-1</title>
		</Head>
		<Link href="/nav/head-2" id="to-head-2">
			to head 2
		</Link>
		<Link href="/nav/head-3" id="to-head-3">
			to head 3
		</Link>
	</div>
);
