import './style.css';
import './css-page/style.css';

import styles from './style.module.css';

export default function ServerLayout({ children }) {
	return (
		<>
			<div className={styles['server-css'] || 'undefined'} id="server-cssm">
				Server Layout: CSS Modules
			</div>
			<div className="server-css">Server Layout: Global CSS</div>
			{children}
		</>
	);
}
