'use client';

import { useTransition } from 'react';

export function RevalidateButtons({
	revalidatePath,
}: {
	revalidatePath: () => Promise<void>;
}) {
	const [isPending, startTransition] = useTransition();

	return (
		<form>
			<button formAction={revalidatePath} id="revalidate-path">
				revalidate with revalidatePath()
			</button>{' '}
			<button
				disabled={isPending}
				formAction={async () => {
					startTransition(async () => {
						await fetch('/api/revalidate?path=/on-demand-revalidate', {
							method: 'POST',
						});
					});
				}}
				id="revalidate-api-route"
			>
				revalidate with API route
			</button>
		</form>
	);
}
