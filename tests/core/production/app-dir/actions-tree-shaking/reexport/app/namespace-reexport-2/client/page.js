'use client';

import { action } from '../actions';
import { getFoo } from '../nested';

export default function Page() {
	return (
		<>
			<form action={action}>
				<button id="test-1" type="submit">
					Test 1 Submit
				</button>
			</form>
			<button
				id="test-2"
				onClick={async () => {
					const foo = await getFoo();
					await foo();
				}}
			>
				Test 2 Submit
			</button>
		</>
	);
}
