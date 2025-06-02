import './global.scss';
import './global.sass';

import sass from './styles.module.sass';
import scss from './styles.module.scss';

export default function Page() {
	return (
		<>
			<div className={sass.mod} id="sass-server-page">
				sass server page
			</div>
			<div className={scss.mod} id="scss-server-page">
				scss server page
			</div>
		</>
	);
}
