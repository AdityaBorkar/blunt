import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';

import { Logger } from '../../_logger';
import { getProjectConfigPath } from '../../server/config/project-config';

/**
 * Eject command to expose configuration
 */
export async function ejectCommand(options: { force?: boolean }) {
	Logger.warn(
		'⚠️  IRREVERSIBLE ACTION: This will expose internal configuration files.',
	);

	const configFile = getProjectConfigPath();
	if (!configFile) {
		Logger.error(
			'Not a Blunt project. Run this command in a directory with a package.json.',
		);
		process.exit(1);
	}

	const configExists =
		existsSync('blunt.config.ts') || existsSync('blunt.config.js');

	if (configExists && !options.force) {
		Logger.error('Configuration already exists. Use --force to overwrite.');
		process.exit(1);
	}

	try {
		Logger.info('Ejecting configuration files...');

		// Create blunt.config.ts
		const configContent = `import type { BluntConfig } from 'blunt/types';

export default {
	app: {
		dir: 'src/app',
		publicDir: 'public'
	},
	server: {
		port: 3000,
		hostname: 'localhost'
	},
	build: {
		outDir: '.build',
		minify: true,
		sourcemap: true
	},
	// Custom webpack configuration
	webpack(config, { dev, isServer }) {
		// Modify webpack config here
		return config;
	}
} satisfies BluntConfig;
`;
		await writeFile('blunt.server.ts', configContent);
		// TODO: delete `blunt.config.ts`

		Logger.success('Configuration ejected successfully!');
		Logger.info('You can now customize blunt.config.ts to fit your needs.');
		Logger.warn(
			'Note: Updates to Blunt may require manual configuration changes.',
		);
	} catch (error) {
		Logger.error('Failed to eject configuration:', error);
		process.exit(1);
	}
}
