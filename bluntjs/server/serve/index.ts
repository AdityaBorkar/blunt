import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { serve as BunServe, color } from 'bun';
import ora from 'ora';

import { importEnvFiles } from '@/server/defaults/envImport';
import { buildRouter } from '@/server/serve/router';
import type { ProjectConfig } from '@/types';

export async function serve(config: ProjectConfig) {
	// Performance and Logging
	const SERVER_BUILD_START = performance.now();
	console.log(color('hotpink', 'ansi'));
	console.log('Blunt v1.2.3 | Bun v1.1.19'); // TODO: Add version
	console.log(color('gray', 'ansi'));
	const spinner = ora(' Starting Server...');
	spinner.color = 'yellow';
	spinner.start();

	// Setup Environment
	const ENVIRONMENT = process.env.NODE_ENV ?? 'development';

	// Clean Working Directory
	if (ENVIRONMENT === 'development') {
		const OUTPUT_DIR = join(
			process.cwd(),
			ENVIRONMENT === 'development'
				? (config.server.dev.outDir ?? '.blunt')
				: config.server.outDir,
		);
		await rm(OUTPUT_DIR, { force: true, recursive: true });
		const tempDir = join(OUTPUT_DIR, '.temp');
		await mkdir(tempDir, { recursive: true });
		await writeFile(
			join(tempDir, 'ErrorBoundary.tsx'),
			await readFile(join(__dirname, '../utils/ErrorBoundary.tsx')),
		);
	}

	// Expose Host
	const EXPOSE_HOST = true;
	if (EXPOSE_HOST) {
		// TODO
		config.server.host = '0.0.0.0';
	}

	// TODO: Implement HTTPS
	// if (
	// 	config.server.https === 'auto-generate' &&
	// 	config.server.certFile === 'auto-generate'
	// ) {
	// 	const { keyFile, certFile } = await generateHttps();
	// 	config.server.keyFile = keyFile;
	// 	config.server.certFile = certFile;
	// }

	// TODO: RESTART SERVER ON CHANGE OF CONFIG
	// TODO: RESTART SERVER ON CHANGE OF ENV FILES
	const ENV_FILES = importEnvFiles({ env: ENVIRONMENT });
	const router =
		ENVIRONMENT === 'development'
			? await buildRouter(config)
			: await buildRouter(config);
	const server = BunServe({
		development: ENVIRONMENT === 'development' && {
			chromeDevToolsAutomaticWorkspaceFolders: true,
			console: true,
			hmr: true,
		},
		hostname: config.server.host,
		port: config.server.port,
		...router,
	});

	// Performance and Logging
	const SERVER_BUILD_END = performance.now();
	const SERVER_BUILD_TIME = (SERVER_BUILD_END - SERVER_BUILD_START).toFixed(2);
	spinner.succeed(` Server Started in ${SERVER_BUILD_TIME}ms`);
	console.log();
	console.log(color('lightgray', 'ansi'), '--------------------------------');
	consoleLog('Environment    : ', ENVIRONMENT);
	consoleLog('Env Files      : ', ENV_FILES.join(', '));
	consoleLog('Local Network  : ', server.url.href);
	consoleLog(
		'Public Network : ',
		EXPOSE_HOST ? server.url.href : 'use --host to expose',
	);

	// TypeScript LSP
	const isTsLspActive = false;
	consoleLog(
		'TypeScript LSP : ',
		isTsLspActive ? 'Active' : 'Inactive',
		isTsLspActive ? 'lightblue' : 'red',
	);

	// TODO: Tunnel
	// const isTunnelActive = false;
	// consoleLog(
	// 	'Tunnel         : ',
	// 	isTunnelActive ? 'Active' : 'Inactive',
	// 	isTunnelActive ? 'lightblue' : 'red',
	// );

	console.log(color('lightgray', 'ansi'), '--------------------------------');
	console.log(color('white', 'ansi'));
	return server;
}

function consoleLog(
	title: string,
	value: string,
	ansiColor: string = 'lightblue',
) {
	console.log(
		color('lightgray', 'ansi'),
		title,
		color(ansiColor, 'ansi'),
		value,
	);
}
