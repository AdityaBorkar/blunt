'use client';

import { redirectAction } from './actions';

export default function Form() {
	return (
		<form>
			<input defaultValue="hi" hidden name="hidden-info" type="text" />
			<input id="client-name" name="name" required type="text" />
			<button formAction={redirectAction} id="there" type="submit">
				Go there
			</button>
		</form>
	);
}
