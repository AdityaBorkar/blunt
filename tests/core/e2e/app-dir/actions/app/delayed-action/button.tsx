'use client';

import { useContext } from 'react';

import { action, redirectAction } from './actions';
import { DataContext } from './context';

export function Button() {
	const { setData } = useContext(DataContext);
	const handleClick = async () => {
		await new Promise((res) => setTimeout(res, 1000));

		const result = await action();

		setData(result);
	};

	const handleRedirect = async () => {
		await new Promise((res) => setTimeout(res, 1000));

		const result = await redirectAction();

		setData(result);
	};

	return (
		<>
			<button id="run-action" onClick={handleClick}>
				Run Action
			</button>

			<button id="run-action-redirect" onClick={handleRedirect}>
				Run Redirect
			</button>
		</>
	);
}
