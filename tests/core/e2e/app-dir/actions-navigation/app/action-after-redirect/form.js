'use client';

import React from 'react';

import { expensiveCalculation } from './actions';

export function Form({ randomNum }) {
	const [isPending, setIsPending] = React.useState(false);
	const [result, setResult] = React.useState(null);

	async function handleSubmit(event) {
		event.preventDefault();

		setIsPending(true);
		const result = await expensiveCalculation();
		setIsPending(false);
		setResult(result);
	}

	return (
		<form
			id="form"
			onSubmit={handleSubmit}
			style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
		>
			<section>
				<button id="submit" style={{ width: 'max-content' }} type="submit">
					Submit
				</button>
				{isPending && 'Loading...'}
			</section>
			<div>Server side rendered number: {randomNum}</div>
			{result && <div id="result">RESULT FROM SERVER ACTION: {result}</div>}
		</form>
	);
}
