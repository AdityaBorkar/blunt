'use client';

import { useState } from 'react';

import styles from './dynamic.module.css';

export default function Dynamic({ name }) {
	const [state] = useState(`dynamic no ssr on client${name}`);
	return (
		<p className={styles.dynamic} id="css-text-dynamic-no-ssr-client">
			{`next-dynamic ${state}`}
		</p>
	);
}
