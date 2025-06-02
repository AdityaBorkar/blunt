import { useReducer } from 'react';

import { DynamicShared } from '../../components/DynamicShared';
import { Links } from '../../components/links';

export default function About() {
	const [shouldload, load] = useReducer(() => true, false);
	return (
		<>
			<div>About</div>
			{shouldload
				? <DynamicShared />
				: <button onClick={load}>Load module</button>}
			<Links />
		</>
	);
}
