'use client';

import { useState } from 'react';

import double, { dec, getHeaders, inc, redirectAction } from '../actions';

export default function Counter() {
	const [count, setCount] = useState(0);
	return (
		<div>
			<h1>{count}</h1>
			<button
				id="inc"
				onClick={async () => {
					const newCount = await inc(count);
					setCount(newCount);
				}}
			>
				+1
			</button>
			<button
				id="dec"
				onClick={async () => {
					const newCount = await dec(count);
					setCount(newCount);
				}}
			>
				-1
			</button>
			<button
				id="double"
				onClick={async () => {
					const newCount = await double(count);
					setCount(newCount);
				}}
			>
				*2
			</button>
			<form>
				<button
					formAction={() => redirectAction('/redirect-target')}
					id="redirect-relative"
				>
					redirect to a relative URL
				</button>
			</form>
			<form>
				<button
					formAction={() =>
						redirectAction(`${location.origin}/redirect-target`)
					}
					id="redirect-absolute"
				>
					redirect to a absolute URL
				</button>
			</form>
			<form>
				<button
					formAction={() =>
						redirectAction(
							'https://next-data-api-endpoint.vercel.app/api/random?page',
						)
					}
					id="redirect-external"
				>
					redirect external
				</button>
			</form>
			<form>
				<button formAction={() => getHeaders()} id="get-headers">
					get headers
				</button>
			</form>
		</div>
	);
}

export const runtime = 'edge';
