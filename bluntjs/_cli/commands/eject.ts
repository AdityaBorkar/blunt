import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';

import { Logger } from '../../_logger';
import { getProjectConfig } from '../../server/config/project-config';

/**
 * Eject command to expose configuration
 */
export async function ejectCommand(options: { force?: boolean }) {
	Logger.warn(
		'⚠️  IRREVERSIBLE ACTION: This will expose internal configuration files.',
	);

	const { config } = await getProjectConfig().catch(() => {
		Logger.error(
			'Could not detect a Blunt project.',
			'Create a `blunt.config.ts` file OR run `bunx create-blunt-app`',
		);
		process.exit(1);
	});

	const serverExists =
		existsSync('app/blunt.server.ts') || existsSync('app/blunt.server.js');
	if (serverExists && !options.force) {
		Logger.error('Configuration already exists. Use --force to overwrite.');
		process.exit(1);
	}

	try {
		Logger.info('Ejecting configuration files...');

		const tsconfigExists = existsSync('tsconfig.json');

		const fileName = tsconfigExists ? 'blunt.server.ts' : 'blunt.server.js';
		const fileContent = `
		import { serve } from 'blunt/server';

		const config = ${JSON.stringify(config, null, 2)};

		const app = serve(config);
		console.log('Server started at', app.url.href);
		`;
		await writeFile(fileName, fileContent);
		const configFile = Bun.file('blunt.config.ts');
		await configFile.unlink();

		Logger.success('Configuration ejected successfully!');
		Logger.info('You can now customize the server to fit your needs.');
		Logger.warn('Note: Updates to Blunt may require manual changes.');
	} catch (error) {
		Logger.error('Failed to eject configuration:', error);
		process.exit(1);
	}
}
