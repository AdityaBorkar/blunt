import styles from './dynamic.module.css';

export default function Dynamic() {
	return (
		<p className={styles.dynamic} id="css-text-dynamic-server">
			next-dynamic dynamic on server
		</p>
	);
}
