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
	https?: boolean;
	dir?: string;
}) {
	const { config } = await getProjectConfig().catch(() => {
		Logger.error(
			'Could not detect a Blunt project.',
			'Create a `blunt.config.ts` file OR run `bunx create-blunt-app`',
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
	await serve(options);
}
