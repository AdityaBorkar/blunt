import { after, connection } from 'next/server';
import { cache } from 'react';

import { cliLog } from '../../../utils/log';

const thing = cache(() => Symbol('cache me please'));

export default async function Index(_props) {
	await connection();
	const valueFromRender = thing();

	after(async () => {
		const valueFromAfter = thing();

		cliLog({
			assertions: {
				'cache() works in after()': valueFromRender === valueFromAfter,
			},
			source: '[page] /nested-after (after #1)',
		});

		after(() => {
			const valueFromAfter = thing();

			cliLog({
				assertions: {
					'cache() works in after()': valueFromRender === valueFromAfter,
				},
				source: '[page] /nested-after (after #2)',
			});
		});

		await new Promise((resolve) => setTimeout(resolve, 500));

		after(() => {
			const valueFromAfter = thing();

			cliLog({
				assertions: {
					'cache() works in after()': valueFromRender === valueFromAfter,
				},
				source: '[page] /nested-after (after #3)',
			});
		});
	});

	return <div>Page with nested after()</div>;
}
