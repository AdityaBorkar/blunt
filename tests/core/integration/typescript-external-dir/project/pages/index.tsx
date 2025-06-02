import { World } from 'components/world';
import type { JSX } from 'react';

// External
import { Counter } from '../../shared/components/counter';

export default function HelloPage(): JSX.Element {
	return (
		<div>
			Hello <World />!
			<br />
			<Counter />
		</div>
	);
}
