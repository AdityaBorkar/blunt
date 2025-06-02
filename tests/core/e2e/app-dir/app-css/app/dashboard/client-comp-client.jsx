'use client';

import { useEffect, useState } from 'react';

import styles from './client-comp.module.css';

export default function ClientComp() {
	const [state, setState] = useState({});
	useEffect(() => {
		setState({ test: 'HELLOOOO' });
	}, []);
	return (
		<>
			<p className={styles.client}>Hello</p>
			{state.test}
		</>
	);
}
