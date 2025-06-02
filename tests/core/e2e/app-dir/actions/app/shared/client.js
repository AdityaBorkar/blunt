'use client';

import { inc } from './action';

export function Client() {
	return (
		<form>
			<button formAction={inc} id="client-inc">
				Inc
			</button>
		</form>
	);
}
