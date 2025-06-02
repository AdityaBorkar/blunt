'use client';

import { useEffect, useState } from 'react';

export default function Page() {
	const [data, setData] = useState(null);
	const [updated, setUpdated] = useState(false);
	useEffect(() => {
		setData(window.history.state.myData);
	}, []);
	return (
		<>
			<h1 id="replacestate-data">ReplaceState Data</h1>
			{updated ? <div id="state-updated"></div> : null}
			<pre id="my-data">{JSON.stringify(data)}</pre>
			<button
				id="get-latest"
				onClick={() => {
					setData(window.history.state.myData);
				}}
			>
				Get latest data
			</button>
			<button
				id="replace-state"
				onClick={() => {
					window.history.replaceState({ myData: { foo: 'bar' } }, '');
					setUpdated(true);
				}}
			>
				Replace state
			</button>
		</>
	);
}
