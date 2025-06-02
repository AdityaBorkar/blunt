'use server';

import { setTimeout } from 'node:timers/promises';

export async function myAction(id: number) {
	console.log(`myAction(${id}) :: server`);
	await setTimeout(100);
}
