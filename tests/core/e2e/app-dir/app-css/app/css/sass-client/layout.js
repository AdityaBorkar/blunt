'use client';

import './global.scss';
import './global.sass';

import sass from './styles.module.sass';
import scss from './styles.module.scss';

export default function Layout({ children }) {
	return (
		<>
			<div className={sass.mod} id="sass-client-layout">
				sass client layout
			</div>
			<div className={scss.mod} id="scss-client-layout">
				scss client layout
			</div>
			{children}
		</>
	);
}
