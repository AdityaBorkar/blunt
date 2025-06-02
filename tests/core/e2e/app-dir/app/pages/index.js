import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

import styles from '../styles/shared.module.css';

const Button = dynamic(() =>
	import('../components/button/button').then((mod) => mod.Button),
);

export default function Page() {
	return (
		<>
			<p className={styles.content} id="hello">
				hello from pages/index
			</p>
			<Link href="/dashboard">Dashboard</Link>
			<p id="react-version">{React.version}</p>
			<Button>Click me!</Button>
			<span id="my-env">{process.env.NEXT_PUBLIC_TEST_ID}</span>
			<span id="my-other-env">{`${process.env.NEXT_PUBLIC_TEST_ID}-suffix`}</span>
		</>
	);
}
