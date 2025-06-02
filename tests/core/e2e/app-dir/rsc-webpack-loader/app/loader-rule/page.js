'use client';

import styles from './a.module.css!=!./a.txt';

export default function Home() {
	return (
		<div className={styles.red} id="red">
			Red
		</div>
	);
}
