import './global.css';

import base from './base.module.css';
import styles from './component.module.css';

export default function Component() {
	return (
		<p className={`global-class ${base.class} ${styles.class}`} id="component">
			Hello Component
		</p>
	);
}
