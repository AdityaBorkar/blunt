'use client';

import { foo } from '../actions';

export default function Page() {
	return (
		<form action={foo}>
			<button id="submit" type="submit">
				Submit
			</button>
		</form>
	);
}
