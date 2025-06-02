import styles from './style.module.css';

export default function NotFound() {
	return (
		<>
			<h1 className={styles.red} id="not-found-component">
				Not Found!
			</h1>
		</>
	);
}
