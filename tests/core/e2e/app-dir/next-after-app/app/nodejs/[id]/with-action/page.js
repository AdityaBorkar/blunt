import { after } from 'next/server';
import { cache } from 'react';

import { cliLog } from '../../../../utils/log';

const thing = cache(() => Symbol('cache me please'));

export default async function Index(props) {
	const params = await props.params;
	const action = async () => {
		'use server';

		const valueFromAction = thing();

		after(() => {
			const valueFromAfter = thing();

			cliLog({
				assertions: {
					'cache() works in after()': valueFromAction === valueFromAfter,
				},
				source: '[action] /[id]/with-action',
				value: params.id,
			});
		});
	};

	return (
		<div>
			<h1>Page with after() in an action</h1>
			<form action={action}>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
