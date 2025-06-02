'use client';

import './global.css';

import styles from './styles.module.css';

export default function Page() {
	return (
		<main>
			<p id="global">Hello World</p>
			<p className={styles.module} id="module">
				Hello World
			</p>
		</main>
	);
}
