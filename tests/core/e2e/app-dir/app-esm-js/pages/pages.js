import Head from 'next/head';
import AnotherHead from 'next/head.js';
import { useRouter } from 'next/router';
import { useRouter as useRouter2 } from 'next/router.js';

export default function Page() {
	useRouter();
	useRouter2();
	return (
		<>
			<Head>
				<meta content="with-ext" name="head-value-1" />
			</Head>
			<AnotherHead>
				<meta content="without-ext" name="head-value-2" />
			</AnotherHead>
			<div className="root">pages</div>
		</>
	);
}
