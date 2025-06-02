import { revalidatePath, revalidateTag, unstable_cacheTag } from 'next/cache';
import { connection } from 'next/server';

import { Form } from './form';

async function fetchCachedValue() {
	return fetch('https://next-data-api-endpoint.vercel.app/api/random', {
		next: { revalidate: false, tags: ['revalidate-and-use'] },
	}).then((res) => res.text());
}

async function getCachedValue() {
	'use cache';
	unstable_cacheTag('revalidate-and-use');
	return Math.random();
}

export default async function Page() {
	// Make the page dynamic, as we don't want to deal with ISR in this scenario.
	await connection();

	return (
		<Form
			initialValues={
				await Promise.all([
					getCachedValue(),
					getCachedValue(),
					fetchCachedValue(),
				])
			}
			revalidateAction={async (type: 'tag' | 'path') => {
				'use server';

				const initialCachedValue = await getCachedValue();

				if (type === 'tag') {
					revalidateTag('revalidate-and-use');
				} else {
					revalidatePath('/revalidate-and-use');
				}

				return Promise.all([
					initialCachedValue,
					getCachedValue(),
					fetchCachedValue(),
				]);
			}}
		/>
	);
}
