import { after } from 'next/server';
import { cache } from 'react';

import { cliLog } from '../../../../utils/log';

const thing = cache(() => Symbol('cache me please'));

export default async function Index(props) {
	const params = await props.params;
	const valueFromRender = thing();

	after(() => {
		const valueFromAfter = thing();

		cliLog({
			assertions: {
				'cache() works in after()': valueFromRender === valueFromAfter,
			},
			source: '[page] /[id]/dynamic',
			value: params.id,
		});
	});

	return <div>Page with after()</div>;
}
