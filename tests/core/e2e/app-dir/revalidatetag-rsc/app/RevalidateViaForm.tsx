'use client';

import { revalidate } from './actions/revalidate';

export default function RevalidateViaForm({ tag }: { tag: string }) {
	const handleRevalidate = async () => {
		await revalidate(tag);
	};

	return (
		<form action={handleRevalidate}>
			<button className="underline" id="submit-form" type="submit">
				Revalidate via form
			</button>
		</form>
	);
}
