'use client';

import './global.scss';
import './global.sass';

import sass from './styles.module.sass';
import scss from './styles.module.scss';

export default function Page() {
	return (
		<>
			<div className={sass.mod} id="sass-client-page">
				sass client page
			</div>
			<div className={scss.mod} id="scss-client-page">
				scss client page
			</div>
		</>
	);
}
