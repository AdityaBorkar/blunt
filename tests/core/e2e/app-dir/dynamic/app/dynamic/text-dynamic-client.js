'use client';

import { useState } from 'react';

import styles from './dynamic.module.css';

export default function Dynamic() {
	const [state] = useState('dynamic on client');
	return (
		<p className={styles.dynamic} id="css-text-dynamic-client">
			{`next-dynamic ${state}`}
		</p>
	);
}
