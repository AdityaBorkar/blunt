'use client';

import { startTransition } from 'react';

import {
	absoluteRedirect,
	multiRelativeRedirect,
	relativeRedirect,
} from '../actions';

export default function Page() {
	return (
		<>
			<p>hello subdir page</p>
			<button
				id="relative-subdir-redirect"
				onClick={async () => {
					startTransition(async () => {
						await relativeRedirect();
					});
				}}
			>
				relative redirect
			</button>
			<button
				id="multi-relative-subdir-redirect"
				onClick={async () => {
					startTransition(async () => {
						await multiRelativeRedirect();
					});
				}}
			>
				multi-level relative redirect
			</button>
			<button
				id="absolute-subdir-redirect"
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
