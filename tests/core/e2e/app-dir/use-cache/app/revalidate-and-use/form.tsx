'use client';

import { useActionState } from 'react';

export function Form({
	revalidateAction,
	initialValues,
}: {
	revalidateAction: (type: 'tag' | 'path') => Promise<[number, number, string]>;
	initialValues: [number, number, string];
}) {
	const [
		[useCacheValue1, useCacheValue2, fetchedValue],
		revalidate,
		isPending,
	] = useActionState(
		async (_state: [number, number, string], type: 'tag' | 'path') =>
			revalidateAction(type),
		initialValues,
	);

	return (
		<form>
			<p>
				before revalidate: <span id="use-cache-value-1">{useCacheValue1}</span>
			</p>
			<p>
				after revalidate: <span id="use-cache-value-2">{useCacheValue2}</span>
			</p>
			<p id="fetched-value">{fetchedValue}</p>
			<button
				disabled={isPending}
				formAction={() => revalidate('tag')}
				id="revalidate-tag"
			>
				Revalidate Tag
			</button>
			<button
				disabled={isPending}
				formAction={() => revalidate('path')}
				id="revalidate-path"
			>
				Revalidate Path
			</button>
		</form>
	);
}
