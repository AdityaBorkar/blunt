import Nested from './Nested';
import styles from './with-css.module.css';

export default () => (
	<div className={styles.content}>
		<Nested />
	</div>
);
