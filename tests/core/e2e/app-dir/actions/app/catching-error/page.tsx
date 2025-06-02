'use client';

import { useState, useTransition } from 'react';

import { badAction, getServerData } from './actions';

export default function Component() {
	const [isPending, startTransition] = useTransition();
	const [wasSubmitted, setWasSubmitted] = useState(false);
	return (
		<>
			{wasSubmitted && <div id="submitted-msg">Submitted!</div>}
			<button
				disabled={isPending}
				id="good-action"
				onClick={() => {
					startTransition(() => {
						getServerData()
							.catch(() => {
								console.log('error caught in user code');
							})
							.finally(() => {
								setWasSubmitted(true);
							});
					});
				}}
			>
				Submit Action
			</button>

			<button
				disabled={isPending}
				id="bad-action"
				onClick={() => {
					startTransition(() => {
						badAction()
							.catch(() => {
								console.log('error caught in user code');
							})
							.finally(() => {
								setWasSubmitted(true);
							});
					});
				}}
			>
				Submit Action (Throws)
			</button>
		</>
	);
}
