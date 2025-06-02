'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { addToCart } from './actions';

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button aria-disabled={pending} id="submit" type="submit">
			Add to cart
		</button>
	);
}

export default function Page() {
	const [state, formAction] = useFormState(addToCart);
	return (
		<>
			<h1>Add to cart</h1>
			{state && <div id="result">{state}</div>}
			<form action={formAction}>
				<SubmitButton />
			</form>
		</>
	);
}
