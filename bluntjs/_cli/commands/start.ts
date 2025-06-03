import { existsSync } from 'node:fs';

import { Logger } from '../../_logger';
import { getProjectConfig } from '../../server/config/project-config';
import { serve } from '../utils/serve';

/**
 * Production server command
 */
export async function startCommand(options: {
	port?: string;
	host?: string;
	dir?: string;
}) {
	const { config } = await getProjectConfig().catch((err) => {
		if (err === 'No Blunt project found')
			Logger.error(
				'Could not detect a Blunt project.',
				'Create a `blunt.config.ts` file OR run `bunx create-blunt-app`',
			);
		if (err === 'Invalid Blunt project config')
			Logger.error(
				'Invalid Blunt project config.',
				// TODO: Better error message
			);
		process.exit(1);
	});

	const buildDir = options.dir ?? config.build.outDir;
	if (!existsSync(buildDir)) {
		Logger.error(
			`Build directory "${buildDir}" not found. Run "blunt build" first.`,
		);
		process.exit(1);
	}

	process.env.NODE_ENV = 'production';
	const port = options.port ? parseInt(options.port) : 3000;
	const host = options.host ?? 'localhost';
	// TODO: Add buildDir
	await serve({ host, port });
}
