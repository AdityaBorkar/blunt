'use client';

import styles from './lazy.module.css';

export default function LazyComponent() {
	return (
		<>
			<p className={styles.lazy} id="css-text-lazy">
				next-dynamic lazy
			</p>
		</>
	);
}
