import type { NextRequest } from 'next/server';

import { getSentinelValue } from '../../../getSentinelValue';

export async function generateStaticParams() {
	return [
		{
			dyn: '1',
		},
	];
}

export async function GET(
	_request: NextRequest,
	props: { params: Promise<{ dyn: string }> },
) {
	const { dyn } = await props.params;
	return new Response(
		JSON.stringify({
			param: dyn,
			type: 'dynamic params',
			value: getSentinelValue(),
		}),
	);
}
