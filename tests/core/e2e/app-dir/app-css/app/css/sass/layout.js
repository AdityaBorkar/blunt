import './global.scss';
import './global.sass';

import sass from './styles.module.sass';
import scss from './styles.module.scss';

export default function Layout({ children }) {
	return (
		<>
			<div className={sass.mod} id="sass-server-layout">
				sass server layout
			</div>
			<div className={scss.mod} id="scss-server-layout">
				scss server layout
			</div>
			{children}
		</>
	);
}
