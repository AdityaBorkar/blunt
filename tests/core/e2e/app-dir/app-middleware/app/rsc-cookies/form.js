'use client';

import { useActionState } from 'react';

export function Form({ action }) {
	const [state, formAction] = useActionState(action, null);

	return (
		<form action={formAction}>
			<div id="action-result">Action Result: {state}</div>
			<button id="submit-server-action" type="submit">
				server action
			</button>
		</form>
	);
}
