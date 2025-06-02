import v from 'conditional-exports-optout';
import { getReactVersion } from 'conditional-exports-optout/react';
import v1 from 'conditional-exports-optout/subpath';

import Client from './client';

export default function Page() {
	return (
		<div>
			{`Server: ${v}`}
			<br />
			{`Server subpath: ${v1}`}
			<br />
			<Client />
			<p id="optout-react-version">
				{`opt-out-react-version: ${getReactVersion()}`}
			</p>
		</div>
	);
}
