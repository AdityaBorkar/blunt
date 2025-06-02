'use client';

import type { UnsafeUnwrappedParams } from 'next/server';
import { use } from 'react';

import { createWaiter } from '../../../../../../../client-utils';
import { getSentinelValue } from '../../../../../../../getSentinelValue';

const waiter = createWaiter();

export default function Page({
	params,
}: {
	params: Promise<{ lowcard: string; highcard: string }>;
}) {
	use(waiter.wait());
	waiter.cleanup();
	const syncParams = params as unknown as UnsafeUnwrappedParams<typeof params>;
	return (
		<section>
			<p>
				This Page does key checking of the params prop in a client component
				without `use`ing first
			</p>
			<div>
				page lowcard:{' '}
				<span id="param-has-lowcard">
					{`${Reflect.has(syncParams, 'lowcard')}`}
				</span>
			</div>
			<div>
				page highcard:{' '}
				<span id="param-has-highcard">
					{`${Reflect.has(syncParams, 'highcard')}`}
				</span>
			</div>
			<div>
				page foo:{' '}
				<span id="param-has-foo">{`${Reflect.has(syncParams, 'foo')}`}</span>
			</div>
			<span id="page">{getSentinelValue()}</span>
		</section>
	);
}
