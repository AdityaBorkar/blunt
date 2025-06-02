'use client';

import { startTransition } from 'react';

import { absoluteRedirect, relativeRedirect } from './actions';

export default function Page() {
	return (
		<>
			<p>hello root page</p>
			<button
				id="relative-redirect"
				onClick={async () => {
					startTransition(async () => {
						await relativeRedirect();
					});
				}}
			>
				relative redirect
			</button>
			<button
				id="absolute-redirect"
				onClick={async () => {
					startTransition(async () => {
						await absoluteRedirect();
					});
				}}
			>
				absolute redirect
			</button>
		</>
	);
}
