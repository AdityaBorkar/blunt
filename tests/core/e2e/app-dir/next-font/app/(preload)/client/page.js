'use client';

import { font5 } from '../../../fonts';
import Comp from './Comp';

export default function HomePage() {
	return (
		<>
			<p className={font5.className} id="client-page">
				{JSON.stringify(font5)}
			</p>
			<Comp />
		</>
	);
}
