import { Logger } from 'blunt/_logger';

import { serve as BluntServe } from '../../server';
import {
	getProjectConfig,
	type ProjectConfig,
} from '../../server/config/project-config';

export async function serve(options: ProjectConfig) {
	const environment = process.env.NODE_ENV ?? 'development';
	Logger.info('Starting server...');

	const { config, path } = await getProjectConfig().catch(() => {
		Logger.error(
			'Could not detect a Blunt project.',
			'Create a `blunt.config.ts` file OR run `bunx create-blunt-app`',
		);
		process.exit(1);
	});

	Logger.info(`Using environment: ${environment}`);
	Logger.info(`Using config: ${path}`);

	try {
		const _config = { ...config, ...options }; // TODO: DEEP MERGE
		const server = await BluntServe(_config);
		Logger.success(`Server started at ${server.url.href}`);

		process.on('SIGINT', () => {
			Logger.info('Shutting down server...');
			server.stop();
			process.exit(0);
		});
	} catch (error) {
		Logger.error('Failed to start server:', error);
		process.exit(1);
	}
}
