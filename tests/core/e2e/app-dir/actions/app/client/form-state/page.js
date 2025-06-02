'use client';

import { useActionState, useEffect, useState } from 'react';

import { appendName } from './actions';

export default function Page() {
	const [state, appendNameFormAction] = useActionState(
		appendName,
		'initial-state',
		'/client/form-state',
	);

	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		setHydrated(true);
	}, []);

	return (
		<>
			<form action={appendNameFormAction} id="form-state-form">
				<p id="form-state">{state}</p>
				<input id="name-input" name="name" />
				<button id="submit-form" type="submit">
					log
				</button>
			</form>
			{hydrated ? <p id="hydrated">hydrated</p> : null}
		</>
	);
}
