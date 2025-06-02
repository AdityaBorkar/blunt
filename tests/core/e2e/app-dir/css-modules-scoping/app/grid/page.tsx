import styles from './grid.module.css';
export default function Page() {
	return (
		<div className={styles['grid-container']}>
			<div className={`${styles['grid-item']} ${styles.header}`} id="header">
				Header
			</div>
			<div className={`${styles['grid-item']} ${styles.sidebar}`} id="sidebar">
				Sidebar
			</div>
			<div className={`${styles['grid-item']} ${styles.main}`} id="main">
				Main
			</div>
			<div className={`${styles['grid-item']} ${styles.footer}`} id="footer">
				Footer
			</div>
		</div>
	);
}
