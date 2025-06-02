'use client';

import { font6 } from '../../../fonts';

export default function Component() {
	return (
		<p className={font6.className} id="client-comp">
			{JSON.stringify(font6)}
		</p>
	);
}
