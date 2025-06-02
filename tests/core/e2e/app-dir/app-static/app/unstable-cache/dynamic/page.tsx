import { unstable_cache, unstable_expireTag } from 'next/cache';
import { draftMode } from 'next/headers';

import { RevalidateButton } from '../revalidate-button';

export const dynamic = 'force-dynamic';

export default async function Page() {
	async function revalidate() {
		'use server';
		await unstable_expireTag('random-value-data');
	}

	const cachedData = await unstable_cache(
		async () => {
			return {
				draftModeEnabled: (await draftMode()).isEnabled,
				random: Math.random(),
			};
		},
		['random-value'],
		{
			tags: ['random-value-data'],
		},
	)();

	return (
		<div>
			<p>random: {Math.random()}</p>
			<p id="cached-data">cachedData: {cachedData.random}</p>
			<p id="draft-mode-enabled">
				draft mode enabled: {cachedData.draftModeEnabled.toString()}
			</p>
			<RevalidateButton onClick={revalidate} />
		</div>
	);
}
