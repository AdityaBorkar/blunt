import merge from 'lodash.merge';

import { Logger } from '../../_logger';
import { serve as BluntServe } from '../../server';
import { getProjectConfig } from '../../server/config/project-config';

export async function serve(options: // ProjectConfig['server']
{
	host: string;
	port: number;
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

	try {
		const _config = { ...config, server: merge(config.server, options) };
		const server = await BluntServe(_config);
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
