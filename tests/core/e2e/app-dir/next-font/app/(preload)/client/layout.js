'use client';

import { font4 } from '../../../fonts';

export default function Root({ children }) {
	return (
		<>
			<p className={font4.className} id="client-layout">
				{JSON.stringify(font4)}
			</p>
			{children}
		</>
	);
}
