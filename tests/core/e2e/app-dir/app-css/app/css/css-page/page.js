import './style.css';

import styles from './style.module.css';

export default function Page() {
	return (
		<>
			<h1>Page</h1>
			<div className={styles.mod} id="cssm">
				CSSM
			</div>
		</>
	);
}
