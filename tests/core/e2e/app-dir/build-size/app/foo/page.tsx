'use client';

import React from 'react';

import styles from '../../styles/index.module.css';

export default function Page() {
	return (
		<>
			<p className={styles.content} id="hello">
				hello from /foo
			</p>
			<p id="react-version">{React.version}</p>
		</>
	);
}
