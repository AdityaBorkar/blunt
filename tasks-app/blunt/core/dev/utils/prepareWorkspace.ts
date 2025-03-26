import { exists, rm } from 'node:fs/promises';
import { color } from 'bun' with { type: 'macro' };

export async function prepareWorkspace() {
	const WORKSPACE_DIR = '.blunt';

	// TODO: Add ".blunt" to `.gitignore`
	// TODO: Create a `blunt.config.ts` file and validate it
	// TODO: Create a `blunt.types.d.ts` file and validate it

	if (await exists(WORKSPACE_DIR)) {
		await rm(WORKSPACE_DIR, { recursive: true, force: true });
		console.log(color('gray', 'ansi'), `Cleaned ${WORKSPACE_DIR} directory`);
	}
}
